/**
 * РешуМИА — клиентское SPA для подготовки к экзамену по «Математике в действии».
 * Всё хранится в localStorage. Никакого бэкенда.
 */
(function () {
  'use strict';

  // ============================================================
  // КОНСТАНТЫ
  // ============================================================

  const TOTAL_SLOTS = 20;
  const TIMER_DEFAULT_SEC = 180 * 60;
  const STORAGE_KEY = 'reshu-mia-v1';
  const DRAFT_KEY = 'reshu-mia-drafts-v1';
  const BANK_DRAFT_KEY = 'reshu-mia-bank-drafts-v1';

  // Балл за каждый номер (1, 2 или 3 звёздочки)
  const SCORE_BY_SLOT = {
    1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1,
    11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2,
    17: 3, 18: 3, 19: 3, 20: 3
  };

  function maxScoreOfSlot(s) { return SCORE_BY_SLOT[s] || 1; }
  function totalMaxScore() {
    let t = 0;
    for (let s = 1; s <= TOTAL_SLOTS; s++) t += maxScoreOfSlot(s);
    return t;
  }
  // Сетка вариантов оценки за каждый тип
  function gradingOptionsFor(maxS) {
    if (maxS === 1) return [0, 0.3, 0.5, 0.7, 1];
    if (maxS === 2) return [0, 0.5, 1, 1.5, 2];
    if (maxS === 3) return [0, 0.5, 1, 1.5, 2, 2.5, 3];
    return [0, maxS];
  }

  // Финальная формула: оценка = min(10, (баллы + 2) / 3)
  function computeGrade(totalPoints) {
    const raw = (totalPoints + 2) / 3;
    return Math.max(0, Math.min(10, raw));
  }
  function gradeLabel(g) {
    if (g >= 8) return { text: 'отлично', cls: 'ex' };
    if (g >= 6) return { text: 'хорошо', cls: 'good' };
    if (g >= 4) return { text: 'удовлетворительно', cls: 'sat' };
    return { text: 'неудовлетворительно', cls: 'fail' };
  }

  // ============================================================
  // СОСТОЯНИЕ
  // ============================================================

  let currentVariant = null; // { 1: task, 2: task, ... 20: task }
  let drafts = {};           // { slot: текст черновика }
  let solved = {};           // { slot: true/false }
  let selfGrades = {};       // { slot: число баллов }
  let timerSec = TIMER_DEFAULT_SEC;
  let timerId = null;
  let timerPaused = false;
  let activeSlot = 1;
  let phase = 'idle'; // 'idle' | 'exam' | 'results'
  let bankActiveSlot = null;
  let bankActiveTaskIdx = 0;
  let persistTimer = null;
  let timerTickCount = 0;

  // ============================================================
  // УТИЛИТЫ
  // ============================================================

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
      });
    } catch (_) { /* ignore */ }
  }

  function showScreen(name) {
    if (name !== 'bank') exitBankDetail();
    $$('.screen').forEach((s) => s.classList.remove('screen--active'));
    const el = $('#screen-' + name);
    if (el) el.classList.add('screen--active');
    $$('.nav__item').forEach((b) => b.classList.remove('active'));
    const nav = $(`.nav__item[data-screen="${name}"]`);
    if (nav && !nav.disabled) nav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    // авторендер математики на экране (для статических LaTeX-блоков)
    if (el) {
      el.querySelectorAll('.math-content').forEach(renderMath);
    }
  }

  // ============================================================
  // КАСТОМНОЕ МОДАЛЬНОЕ ОКНО (вместо confirm/alert)
  // ============================================================

  /**
   * Показывает модальное окно. Возвращает Promise<boolean>:
   *   true  — пользователь нажал «подтверждаю»
   *   false — отменил (Esc, клик по фону, кнопка отмены)
   *
   * @param {Object} opts
   * @param {string} opts.title         — заголовок
   * @param {string} opts.message       — сообщение
   * @param {string} [opts.confirmText] — текст кнопки подтверждения (по умолчанию «ОК»)
   * @param {string} [opts.cancelText]  — текст кнопки отмены (если null — кнопки не будет = alert)
   * @param {string} [opts.variant]     — 'default' | 'warn' | 'danger' | 'info' | 'success'
   * @param {string} [opts.icon]        — символ для иконки (по умолчанию выбирается по variant)
   */
  function showModal(opts) {
    const o = Object.assign({
      title: 'Подтверждение',
      message: '',
      confirmText: 'ОК',
      cancelText: 'Отмена',
      variant: 'default',
      icon: null,
    }, opts || {});

    const modal = $('#modal');
    const titleEl = $('#modal-title');
    const msgEl = $('#modal-message');
    const iconEl = $('#modal-icon');
    const actionsEl = $('#modal-actions');

    if (!modal) {
      // fallback на нативный
      const ok = window.confirm((o.title ? o.title + '\n\n' : '') + o.message);
      return Promise.resolve(o.cancelText === null ? true : ok);
    }

    titleEl.textContent = o.title;
    msgEl.textContent = o.message;

    // иконка по варианту
    const icons = { default: '?', warn: '!', danger: '!', info: 'i', success: '✓' };
    iconEl.textContent = o.icon || icons[o.variant] || '?';
    iconEl.className = 'modal__icon' + (o.variant && o.variant !== 'default' ? ` modal__icon--${o.variant}` : '');

    // кнопки
    actionsEl.innerHTML = '';
    let cleanup = null;

    return new Promise((resolve) => {
      const close = (result) => {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (cleanup) cleanup();
        resolve(result);
      };

      // primary
      const confirmBtn = document.createElement('button');
      confirmBtn.type = 'button';
      const isDanger = o.variant === 'danger';
      confirmBtn.className = 'btn ' + (isDanger ? 'btn--danger' : 'btn--primary');
      confirmBtn.textContent = o.confirmText;
      confirmBtn.addEventListener('click', () => close(true));

      // cancel (если не null)
      let cancelBtn = null;
      if (o.cancelText !== null) {
        cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn btn--ghost';
        cancelBtn.textContent = o.cancelText;
        cancelBtn.addEventListener('click', () => close(false));
        actionsEl.appendChild(cancelBtn);
      }
      actionsEl.appendChild(confirmBtn);

      // закрытие по клику по фону
      const overlayHandler = (e) => {
        if (e.target.hasAttribute('data-modal-close')) close(false);
      };
      modal.addEventListener('click', overlayHandler);

      // Esc → отмена; Enter → подтверждение
      const keyHandler = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); close(false); }
        else if (e.key === 'Enter') { e.preventDefault(); close(true); }
      };
      document.addEventListener('keydown', keyHandler);

      cleanup = () => {
        modal.removeEventListener('click', overlayHandler);
        document.removeEventListener('keydown', keyHandler);
      };

      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // фокус на основную кнопку
      setTimeout(() => confirmBtn.focus(), 50);
    });
  }

  // удобные шорткаты
  function showAlert(title, message, opts) {
    return showModal(Object.assign({
      title, message, confirmText: 'Понятно', cancelText: null, variant: 'info',
    }, opts || {}));
  }
  function showConfirm(title, message, opts) {
    return showModal(Object.assign({
      title, message, confirmText: 'Подтвердить', cancelText: 'Отмена', variant: 'warn',
    }, opts || {}));
  }

  // ============================================================
  // ПЕРСИСТЕНТНОСТЬ
  // ============================================================

  function serializeVariant(v) {
    if (!v) return null;
    const out = {};
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      if (!v[s] || !v[s].id) return null;
      out[s] = v[s].id;
    }
    return out;
  }

  function deserializeVariant(ids) {
    if (!ids || typeof ids !== 'object') return null;
    const bank = window.TASK_BANK;
    if (!bank) return null;
    const out = {};
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const id = ids[s];
      const arr = (bank[s] && bank[s].tasks) || [];
      const task = arr.find((t) => t.id === id);
      if (!task) return null;
      out[s] = task;
    }
    return out;
  }

  function persist() {
    if (phase === 'idle') {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      return;
    }
    const payload = {
      v: 1,
      phase,
      variantIds: currentVariant ? serializeVariant(currentVariant) : null,
      drafts,
      solved,
      selfGrades,
      timerSec,
      timerPaused,
      activeSlot,
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (_) {}
  }
  function schedulePersist() {
    if (phase === 'idle') return;
    clearTimeout(persistTimer);
    persistTimer = setTimeout(persist, 350);
  }

  function tryRestoreSession() {
    let raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (_) { return; }
    if (!raw) return;
    let data;
    try { data = JSON.parse(raw); } catch (_) { return; }
    if (data.v !== 1 || !data.variantIds) return;

    const variant = deserializeVariant(data.variantIds);
    if (!variant) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      return;
    }
    currentVariant = variant;
    drafts = (data.drafts && typeof data.drafts === 'object') ? data.drafts : {};
    solved = (data.solved && typeof data.solved === 'object') ? data.solved : {};
    selfGrades = (data.selfGrades && typeof data.selfGrades === 'object') ? data.selfGrades : {};
    timerSec = typeof data.timerSec === 'number' ? Math.max(0, data.timerSec) : TIMER_DEFAULT_SEC;
    timerPaused = !!data.timerPaused;
    activeSlot = (typeof data.activeSlot === 'number' && data.activeSlot >= 1 && data.activeSlot <= TOTAL_SLOTS)
      ? data.activeSlot : 1;

    if (data.phase === 'results') {
      phase = 'results';
      $('#nav-exam').disabled = false;
      $('#nav-results').disabled = false;
      goToResults({ fromRestore: true });
    } else if (data.phase === 'exam') {
      phase = 'exam';
      $('#nav-exam').disabled = false;
      $('#nav-results').disabled = true;
      showScreen('exam');
      renderExam();
      $('#btn-timer-pause').textContent = timerPaused ? 'Продолжить' : 'Пауза';
      startTimer();
      updateTopbarStatus();
    }
  }

  // ============================================================
  // ТАЙМЕР
  // ============================================================

  function startTimer() {
    if (timerId) clearInterval(timerId);
    updateTimerDisplay();
    timerId = setInterval(() => {
      if (timerPaused) return;
      timerSec = Math.max(0, timerSec - 1);
      updateTimerDisplay();
      timerTickCount++;
      if (timerTickCount % 12 === 0) persist();
      if (timerSec === 0) {
        clearInterval(timerId);
        timerId = null;
        showAlert(
          'Время вышло',
          'Прошло 180 минут. Сейчас будут показаны результаты с решениями и критериями для самооценки.',
          { variant: 'warn', icon: '⏰' }
        ).then(() => goToResults({ skipConfirm: true }));
      }
    }, 1000);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }
  function updateTimerDisplay() {
    const el = $('#timer-display');
    if (!el) return;
    const m = Math.floor(timerSec / 60);
    const s = timerSec % 60;
    el.textContent = `${m}:${String(s).padStart(2, '0')}`;
    el.classList.remove('warning', 'danger');
    if (timerSec <= 60) el.classList.add('danger');
    else if (timerSec <= 5 * 60) el.classList.add('warning');
  }

  function updateTopbarStatus() {
    const el = $('#topbar-status');
    if (!el) return;
    if (phase === 'exam') {
      const m = Math.floor(timerSec / 60);
      const s = timerSec % 60;
      el.textContent = `Идёт вариант · ${m}:${String(s).padStart(2, '0')}`;
    } else if (phase === 'results') {
      el.textContent = 'Вариант завершён';
    } else {
      el.textContent = '';
    }
  }

  // ============================================================
  // ВАРИАНТ — генерация
  // ============================================================

  function pickVariant() {
    const bank = window.TASK_BANK;
    if (!bank) throw new Error('Банк задач не загружен');
    const slots = {};
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const arr = (bank[s] && bank[s].tasks) || [];
      if (!arr.length) {
        // Слот пустой — кладём заглушку
        slots[s] = makePlaceholderTask(s);
        continue;
      }
      slots[s] = arr[Math.floor(Math.random() * arr.length)];
    }
    return slots;
  }

  function makePlaceholderTask(slot) {
    return {
      id: `placeholder-${slot}`,
      source: 'Задачи на этот тип ещё не загружены в банк',
      questionLatex: '<p class="muted">⚠ В этом типе задач пока нет загруженных задач. Добавьте их через .tex шаблоны.</p>',
      solutionHtml: '<p class="muted">Решение появится после добавления задач в этот тип.</p>',
      criteriaHtml: '',
    };
  }

  function startNewVariant() {
    currentVariant = pickVariant();
    drafts = {};
    solved = {};
    selfGrades = {};
    timerSec = TIMER_DEFAULT_SEC;
    timerPaused = false;
    activeSlot = 1;
    timerTickCount = 0;
    phase = 'exam';
    $('#nav-exam').disabled = false;
    $('#nav-results').disabled = true;
    $('#results-summary').innerHTML = '';
    $('#results-detail').innerHTML = '';
    $('#btn-timer-pause').textContent = 'Пауза';
    showScreen('exam');
    renderExam();
    startTimer();
    updateTopbarStatus();
    persist();
  }

  // ============================================================
  // EXAM — рендер
  // ============================================================

  function countSolved() {
    let n = 0;
    for (let s = 1; s <= TOTAL_SLOTS; s++) if (solved[s]) n++;
    return n;
  }
  function countDraft() {
    let n = 0;
    for (let s = 1; s <= TOTAL_SLOTS; s++) if (!solved[s] && drafts[s] && String(drafts[s]).trim()) n++;
    return n;
  }

  function updateProgress() {
    const done = countSolved();
    const pct = (done / TOTAL_SLOTS) * 100;
    const bar = $('#progress-bar');
    if (bar) bar.style.width = pct + '%';
    const txt = $('#progress-text');
    if (txt) txt.textContent = `${done} решено / ${TOTAL_SLOTS}`;
  }

  function renderQNav() {
    const nav = $('#q-nav');
    if (!nav) return;
    nav.innerHTML = '';
    for (let i = 1; i <= TOTAL_SLOTS; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'exam-nav__btn';
      btn.textContent = i;
      if (i === activeSlot) btn.classList.add('active');
      if (solved[i]) btn.classList.add('done');
      else if (drafts[i] && String(drafts[i]).trim()) btn.classList.add('draft');
      btn.addEventListener('click', () => {
        activeSlot = i;
        renderExam();
        schedulePersist();
      });
      nav.appendChild(btn);
    }
  }

  function renderExam() {
    if (!currentVariant) return;
    const task = currentVariant[activeSlot];
    if (!task) return;
    const maxS = maxScoreOfSlot(activeSlot);
    const slotMeta = (window.TASK_BANK && window.TASK_BANK[activeSlot]) || { title: '' };

    const body = $('#exam-body');
    if (!body) return;

    const isSolved = !!solved[activeSlot];
    const draft = drafts[activeSlot] || '';

    body.innerHTML = `
      <div class="task-card">
        <div class="task-card__head">
          <div class="task-card__heading">
            <span class="task-card__num">№${activeSlot}</span>
            <span class="task-card__score-badge">${maxS} ${pluralBall(maxS)}</span>
            <span class="task-card__source">${escapeHtml(task.source || '')}</span>
          </div>
          <div>
            ${isSolved
              ? '<span class="task-card__score-badge" style="background:var(--success-soft);color:var(--success);">✓ решено</span>'
              : ''}
          </div>
        </div>

        <div class="muted small" style="margin-bottom:0.85rem;">${escapeHtml(slotMeta.title || '')}</div>

        <div class="task-card__body math-content" id="task-text"></div>

        <div class="task-card__draft">
          <label for="draft-input">Черновик решения</label>
          <textarea id="draft-input" placeholder="Сюда можно записывать ход решения. Поле автоматически сохраняется в браузере.">${escapeHtml(draft)}</textarea>
        </div>

        <div class="task-card__actions">
          <button type="button" class="btn btn--ghost" id="btn-prev">← Предыдущая</button>
          <button type="button" class="btn ${isSolved ? 'btn--ghost' : 'btn--success'}" id="btn-toggle-solved">
            ${isSolved ? 'Отменить «решено»' : '✓ Отметить решённой'}
          </button>
          <span class="spacer"></span>
          <button type="button" class="btn btn--ghost" id="btn-next">Следующая →</button>
        </div>
      </div>
    `;

    const taskTextEl = $('#task-text');
    taskTextEl.innerHTML = task.questionLatex || '';
    renderMath(taskTextEl);

    const draftInput = $('#draft-input');
    draftInput.addEventListener('input', () => {
      drafts[activeSlot] = draftInput.value;
      renderQNav();
      schedulePersist();
    });

    $('#btn-prev').addEventListener('click', () => {
      activeSlot = activeSlot > 1 ? activeSlot - 1 : TOTAL_SLOTS;
      renderExam();
      schedulePersist();
    });
    $('#btn-next').addEventListener('click', () => {
      activeSlot = activeSlot < TOTAL_SLOTS ? activeSlot + 1 : 1;
      renderExam();
      schedulePersist();
    });
    $('#btn-toggle-solved').addEventListener('click', () => {
      solved[activeSlot] = !solved[activeSlot];
      renderExam();
      updateProgress();
      schedulePersist();
    });

    renderQNav();
    updateProgress();
  }

  function pluralBall(n) {
    if (n === 1) return 'балл';
    if (n >= 2 && n <= 4) return 'балла';
    return 'баллов';
  }

  // ============================================================
  // RESULTS
  // ============================================================

  async function goToResults(opts) {
    opts = opts || {};
    const fromRestore = opts.fromRestore;
    const skipConfirm = opts.skipConfirm;
    if (!fromRestore && !skipConfirm) {
      const ok = await showModal({
        title: 'Завершить вариант?',
        message: 'Таймер остановится. После завершения ты увидишь решения каждой задачи, критерии оценивания и сможешь выставить самооценку.',
        confirmText: 'Завершить',
        cancelText: 'Продолжить решать',
        variant: 'warn',
        icon: '⚑',
      });
      if (!ok) return;
    }
    stopTimer();
    timerPaused = true;
    phase = 'results';
    $('#nav-results').disabled = false;
    showScreen('results');
    renderResults();
    persist();
    updateTopbarStatus();
  }

  function renderResults() {
    const summary = $('#results-summary');
    const detail = $('#results-detail');
    if (!summary || !detail) return;

    summary.innerHTML = `
      <div id="grade-output"></div>
      <div class="results__formula math-content">
        <strong>Формула:</strong>
        <p class="formula-display" style="margin-top:0.5rem;">$$\\text{оценка} = \\min\\!\\left(10,\\ \\dfrac{\\text{твои баллы} + 2}{3}\\right)$$</p>
        <p class="muted small" style="margin-top:0.4rem;">Максимум за вариант: <strong>${totalMaxScore()}</strong> баллов.</p>
      </div>
      <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
        <button type="button" class="btn btn--primary" id="btn-recompute">Пересчитать оценку</button>
        <button type="button" class="btn btn--ghost" id="btn-new-variant">Сгенерировать новый вариант</button>
      </div>
    `;
    renderMath(summary);

    detail.innerHTML = '';

    for (let slot = 1; slot <= TOTAL_SLOTS; slot++) {
      const task = currentVariant[slot];
      const maxS = maxScoreOfSlot(slot);
      const slotMeta = (window.TASK_BANK && window.TASK_BANK[slot]) || { title: '', criteriaHtml: '' };
      const draft = drafts[slot] || '';
      const userGrade = selfGrades[slot] != null ? selfGrades[slot] : 0;

      const optsHtml = gradingOptionsFor(maxS).map((v) => {
        const isOn = (Math.abs(userGrade - v) < 1e-9);
        return `
          <label class="self-grade__opt ${isOn ? 'checked' : ''}">
            <input type="radio" name="grade-${slot}" value="${v}" ${isOn ? 'checked' : ''} />
            <span>${formatScore(v)}</span>
          </label>
        `;
      }).join('');

      const card = document.createElement('div');
      card.className = 'task-card';
      card.innerHTML = `
        <div class="task-card__head">
          <div class="task-card__heading">
            <span class="task-card__num">№${slot}</span>
            <span class="task-card__score-badge">макс. ${maxS} ${pluralBall(maxS)}</span>
            <span class="task-card__source">${escapeHtml(task.source || '')}</span>
          </div>
        </div>
        <div class="muted small" style="margin-bottom:0.85rem;">${escapeHtml(slotMeta.title || '')}</div>

        <div class="math-content"></div>

        ${draft ? `
          <div class="task-card__draft" style="opacity:0.85;">
            <label>Твой черновик</label>
            <textarea readonly>${escapeHtml(draft)}</textarea>
          </div>
        ` : ''}

        <div class="solution-block math-content">
          <h4>Решение</h4>
          <div class="sol-content"></div>
        </div>

        ${slotMeta.criteriaHtml ? `
          <div class="criteria-block math-content">
            <h4>Критерии оценивания</h4>
            <div class="crit-content">${slotMeta.criteriaHtml}</div>
          </div>
        ` : ''}

        <div class="self-grade">
          <div class="self-grade__title">Поставь себе балл (макс. ${maxS}):</div>
          <div class="self-grade__options">${optsHtml}</div>
        </div>
      `;

      const condEl = card.querySelector('.task-card__head + .muted + .math-content');
      if (condEl) {
        condEl.innerHTML = task.questionLatex || '';
        renderMath(condEl);
      }

      const solEl = card.querySelector('.sol-content');
      if (solEl) {
        solEl.innerHTML = task.solutionHtml || '<p class="muted">Решение пока не загружено.</p>';
        renderMath(solEl);
      }
      const critEl = card.querySelector('.crit-content');
      if (critEl) renderMath(critEl);

      // обработчики radio
      card.querySelectorAll(`input[name="grade-${slot}"]`).forEach((r) => {
        r.addEventListener('change', (e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) {
            selfGrades[slot] = v;
            // визуально обновим
            card.querySelectorAll('.self-grade__opt').forEach((opt) => {
              const inp = opt.querySelector('input');
              if (inp) opt.classList.toggle('checked', inp.checked);
            });
            updateGradeOutput();
            schedulePersist();
          }
        });
      });

      detail.appendChild(card);
    }

    // ----- финальный блок с оценкой и кнопкой пересчёта (внизу страницы) -----
    const finalBlock = document.createElement('div');
    finalBlock.className = 'results__final-recompute';
    finalBlock.innerHTML = `
      <div class="results__final-inner">
        <div class="results__final-grade">
          <span class="muted small">Текущая оценка</span>
          <strong id="grade-output-bottom">—</strong>
        </div>
        <div class="results__final-actions">
          <button type="button" class="btn btn--primary btn--lg" id="btn-recompute-bottom">
            Пересчитать оценку
          </button>
          <button type="button" class="btn btn--ghost" id="btn-scroll-top">
            ↑ В начало
          </button>
        </div>
      </div>
    `;
    detail.appendChild(finalBlock);

    // обработчики финального блока
    $('#btn-recompute-bottom').addEventListener('click', () => {
      updateGradeOutput();
      // подсветим, чтобы пользователь увидел реакцию
      const bottomGrade = $('#grade-output-bottom');
      if (bottomGrade) {
        bottomGrade.classList.add('flash');
        setTimeout(() => bottomGrade.classList.remove('flash'), 700);
      }
      // плавно прокрутим к итогу наверху
      const summary = $('#results-summary');
      if (summary) summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#btn-scroll-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // кнопки наверху
    $('#btn-recompute').addEventListener('click', updateGradeOutput);
    $('#btn-new-variant').addEventListener('click', async () => {
      const ok = await showModal({
        title: 'Сгенерировать новый вариант?',
        message: 'Текущие результаты, черновики и самооценки будут потеряны. Это действие нельзя отменить.',
        confirmText: 'Да, сгенерировать',
        cancelText: 'Оставить как есть',
        variant: 'danger',
        icon: '↻',
      });
      if (!ok) return;
      phase = 'idle';
      currentVariant = null;
      drafts = {}; solved = {}; selfGrades = {};
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      $('#nav-exam').disabled = true;
      $('#nav-results').disabled = true;
      showScreen('home');
      updateTopbarStatus();
    });

    updateGradeOutput();
  }

  function formatScore(v) {
    if (Number.isInteger(v)) return String(v);
    return v.toFixed(1).replace('.', ',');
  }

  function updateGradeOutput() {
    let total = 0;
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      total += (selfGrades[s] || 0);
    }
    const grade = computeGrade(total);
    const gl = gradeLabel(grade);
    const out = $('#grade-output');
    if (!out) return;
    const breakdown = perSlotBreakdownHtml();
    out.innerHTML = `
      <div class="muted small">Твоя итоговая оценка</div>
      <div class="results__score">${formatScore(grade)}</div>
      <span class="results__score-label results__score-label--${gl.cls}">${gl.text}</span>
      <div class="results__breakdown">
        <div class="results__breakdown-item">
          <strong>${formatScore(total)}</strong>
          <span>сумма баллов из ${totalMaxScore()}</span>
        </div>
        <div class="results__breakdown-item math-content">
          <strong>${formatScore(grade)}</strong>
          <span>$= \\min(10,\\ \\frac{${formatScore(total)} + 2}{3})$</span>
        </div>
        <div class="results__breakdown-item">
          <strong>${countSolved()}/${TOTAL_SLOTS}</strong>
          <span>отмечено решёнными</span>
        </div>
      </div>
      ${breakdown}
    `;
    renderMath(out);

    // дублируем оценку в нижнюю плашку (если есть)
    const bottom = $('#grade-output-bottom');
    if (bottom) {
      bottom.textContent = formatScore(grade) + ' / 10';
    }
  }

  function perSlotBreakdownHtml() {
    let rows = '';
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const my = selfGrades[s] || 0;
      const mx = maxScoreOfSlot(s);
      rows += `<span class="muted small" style="display:inline-block; padding:0.15rem 0.5rem; margin:0.15rem 0.2rem 0 0; background:var(--bg-card-2); border-radius:6px;">№${s}: ${formatScore(my)}/${mx}</span>`;
    }
    return `<div style="margin-top:0.85rem;">${rows}</div>`;
  }

  // ============================================================
  // BANK (банк по типам)
  // ============================================================

  function buildBankGrid() {
    const grid = $('#bank-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const meta = (window.TASK_BANK && window.TASK_BANK[s]) || { title: '', tasks: [] };
      const cnt = (meta.tasks || []).length;
      const score = maxScoreOfSlot(s);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'bank-card';
      card.innerHTML = `
        <div class="bank-card__top">
          <span class="bank-card__num">${s}</span>
          <span class="bank-card__score bank-card__score--${score}">${score} ${pluralBall(score)}</span>
        </div>
        <p class="bank-card__title">${escapeHtml(meta.title || '...')}</p>
        <p class="bank-card__count">${cnt} ${cnt === 1 ? 'задача' : (cnt >= 2 && cnt <= 4 ? 'задачи' : 'задач')}</p>
      `;
      card.addEventListener('click', () => openBankSlot(s));
      grid.appendChild(card);
    }
  }

  function exitBankDetail() {
    bankActiveSlot = null;
    bankActiveTaskIdx = 0;
    const overview = $('#bank-overview');
    const detail = $('#bank-detail');
    if (overview) overview.hidden = false;
    if (detail) detail.hidden = true;
  }

  function openBankSlot(slot) {
    bankActiveSlot = slot;
    bankActiveTaskIdx = 0;
    $('#bank-overview').hidden = true;
    $('#bank-detail').hidden = false;

    const meta = (window.TASK_BANK && window.TASK_BANK[slot]) || { title: '', tasks: [], criteriaHtml: '' };
    const tasks = meta.tasks || [];
    const score = maxScoreOfSlot(slot);

    $('#bank-detail-title').innerHTML =
      `Тип №${slot} <span class="bank-card__score bank-card__score--${score}" style="margin-left:0.6rem;font-size:0.75rem;">${score} ${pluralBall(score)}</span>`;

    const desc = $('#bank-detail-desc');
    desc.innerHTML = escapeHtml(meta.title || '');

    const crit = $('#bank-detail-criteria');
    if (meta.criteriaHtml) {
      crit.innerHTML = `<h2>Критерии оценивания</h2><div class="math-content">${meta.criteriaHtml}</div>`;
      renderMath(crit);
      crit.hidden = false;
    } else {
      crit.innerHTML = '';
      crit.hidden = true;
    }

    // список слева
    const list = $('#bank-tasks-list');
    list.innerHTML = '';
    if (!tasks.length) {
      list.innerHTML = '<p class="muted small" style="padding:1rem;">Задач пока нет.</p>';
    } else {
      tasks.forEach((t, idx) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'bank-task-item';
        if (idx === bankActiveTaskIdx) item.classList.add('active');
        item.innerHTML = `
          <div class="bank-task-item__source">${escapeHtml(t.source || 'Без источника')}</div>
          <div class="bank-task-item__title">${escapeHtml(t.id || ('Задача ' + (idx + 1)))}</div>
        `;
        item.addEventListener('click', () => {
          bankActiveTaskIdx = idx;
          openBankSlot(slot);
        });
        list.appendChild(item);
      });
    }

    renderBankTaskView(tasks[bankActiveTaskIdx]);
  }

  function loadBankDrafts() {
    try { return JSON.parse(localStorage.getItem(BANK_DRAFT_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function saveBankDraft(taskId, text) {
    try {
      const o = loadBankDrafts();
      o[taskId] = text;
      localStorage.setItem(BANK_DRAFT_KEY, JSON.stringify(o));
    } catch (_) {}
  }

  function renderBankTaskView(task) {
    const view = $('#bank-task-view');
    if (!view) return;
    if (!task) {
      view.innerHTML = '<p class="muted">Выбери задачу слева.</p>';
      return;
    }
    const meta = (window.TASK_BANK && window.TASK_BANK[bankActiveSlot]) || {};
    const draftSaved = (loadBankDrafts())[task.id] || '';

    view.innerHTML = `
      <div class="task-card__heading" style="margin-bottom:1rem;">
        <span class="task-card__source">${escapeHtml(task.source || '')}</span>
      </div>
      <div class="math-content cond-area"></div>

      <div class="task-card__draft">
        <label for="bank-draft-input">Черновик решения</label>
        <textarea id="bank-draft-input" placeholder="Здесь можно решать. Сохраняется автоматически.">${escapeHtml(draftSaved)}</textarea>
      </div>

      <div class="task-card__actions" style="margin-top:1rem;">
        <button type="button" class="btn btn--ghost" id="bank-toggle-sol">Показать разбор</button>
      </div>

      <div class="solution-block math-content" id="bank-sol" hidden>
        <h4>Решение</h4>
        <div class="bank-sol-content"></div>
      </div>

      ${meta.criteriaHtml ? `
        <div class="criteria-block math-content" id="bank-crit" hidden>
          <h4>Критерии оценивания</h4>
          <div class="bank-crit-content">${meta.criteriaHtml}</div>
        </div>
      ` : ''}
    `;

    const condEl = view.querySelector('.cond-area');
    condEl.innerHTML = task.questionLatex || '';
    renderMath(condEl);

    const draftInput = $('#bank-draft-input');
    draftInput.addEventListener('input', () => saveBankDraft(task.id, draftInput.value));

    const solEl = $('#bank-sol');
    const critEl = $('#bank-crit');
    const btn = $('#bank-toggle-sol');
    btn.addEventListener('click', () => {
      const isHidden = solEl.hidden;
      solEl.hidden = !isHidden;
      if (critEl) critEl.hidden = !isHidden;
      btn.textContent = isHidden ? 'Скрыть разбор' : 'Показать разбор';
      if (isHidden) {
        const sc = solEl.querySelector('.bank-sol-content');
        sc.innerHTML = task.solutionHtml || '<p class="muted">Решение пока не добавлено.</p>';
        renderMath(sc);
        if (critEl) renderMath(critEl);
      }
    });
  }

  // ============================================================
  // ИНИЦИАЛИЗАЦИЯ
  // ============================================================

  function init() {
    buildBankGrid();

    $('#btn-start-variant').addEventListener('click', () => {
      // показываем экран с правилами перед стартом
      showScreen('pre-exam');
    });
    $('#btn-go-bank').addEventListener('click', () => showScreen('bank'));
    $('#btn-pre-back').addEventListener('click', () => showScreen('home'));
    $('#btn-pre-start').addEventListener('click', startNewVariant);
    $('#btn-bank-back').addEventListener('click', exitBankDetail);

    // навигация в шапке
    $$('.nav__item, .brand').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        if (b.disabled) return;
        const scr = b.getAttribute('data-screen');
        if (!scr) return;
        if (scr === 'exam' && phase === 'exam') {
          showScreen('exam');
          renderExam();
        } else if (scr === 'results' && phase === 'results') {
          showScreen('results');
        } else if (scr !== 'exam' && scr !== 'results') {
          showScreen(scr);
        }
      });
    });

    $('#btn-timer-pause').addEventListener('click', () => {
      timerPaused = !timerPaused;
      $('#btn-timer-pause').textContent = timerPaused ? 'Продолжить' : 'Пауза';
      persist();
    });

    $('#btn-finish').addEventListener('click', () => goToResults());

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persist();
    });
    window.addEventListener('beforeunload', (e) => {
      if (phase === 'exam') {
        persist();
      }
    });

    // обновление статуса в шапке
    setInterval(updateTopbarStatus, 1000);

    // восстановить сессию
    tryRestoreSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
