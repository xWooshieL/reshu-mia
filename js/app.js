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
  function computeGrade100(totalPoints) {
    return computeGrade(totalPoints) * 10;
  }
  function gradeLabel(g) {
    if (g >= 8) return { text: 'отлично', cls: 'ex' };
    if (g >= 6) return { text: 'хорошо', cls: 'good' };
    if (g >= 4) return { text: 'удовлетворительно', cls: 'sat' };
    return { text: 'неудовлетворительно', cls: 'fail' };
  }

  /**
   * Парсит criteriaHtml в массив пунктов с баллами.
   * Извлекает все <li> и в каждом ищет в начале число вида +0,3 или −0,1.
   * Возвращает [{points: ±Number, text: String}] или null если парсинг не удался.
   */
  function parseCriteria(html) {
    if (!html || typeof html !== 'string') return null;
    // убираем HTML-комментарии
    const cleaned = html.replace(/<!--[\s\S]*?-->/g, '');
    const items = [];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let match;
    while ((match = liRegex.exec(cleaned)) !== null) {
      // текст внутри <li>, без вложенных тегов (оставляем для отображения)
      const inner = match[1].trim();
      // удаляем HTML-теги для поиска числа, но сохраняем для текста
      const plainInner = inner.replace(/<[^>]+>/g, '').trim();
      // ищем знак (+ / − / -) и число
      const pm = plainInner.match(/^\s*([+\u2212\-])\s*(\d+(?:[,.]\d+)?)\s*(.*)$/);
      if (!pm) return null;
      const sign = (pm[1] === '+') ? 1 : -1;
      const num = parseFloat(pm[2].replace(',', '.'));
      if (isNaN(num)) return null;
      let text = pm[3].trim();
      // убираем предлог "за " в начале
      text = text.replace(/^за\s+/i, '');
      items.push({ points: sign * num, text: text });
    }
    if (!items.length) return null;
    return items;
  }

  /**
   * Клампим сумму баллов в допустимый диапазон [0, maxS].
   */
  function clampScore(sum, maxS) {
    return Math.max(0, Math.min(maxS, sum));
  }

  /**
   * Рендер блока «Решение» с поддержкой альтернативных методов.
   * Если у задачи есть task.altSolutions — добавляем табы «Основное / Метод 2 / ...».
   *
   * container — элемент, куда вставить блок целиком
   * task — объект задачи
   * blockId — уникальный суффикс для id (чтобы несколько блоков не конфликтовали)
   */
  function renderSolutionBlock(container, task, blockId) {
    if (!task || !container) return;
    const alts = Array.isArray(task.altSolutions) ? task.altSolutions : [];
    const solutions = [
      { title: 'Решение', html: task.solutionHtml || '<p class="muted">Решение пока не загружено.</p>' },
      ...alts.map((a, i) => ({
        title: a.title || ('Метод ' + (i + 2)),
        html: a.html || '<p class="muted">—</p>'
      }))
    ];

    if (solutions.length === 1) {
      // одно решение — как было
      const block = document.createElement('div');
      block.className = 'solution-block math-content';
      block.innerHTML = `<h4>Решение</h4><div class="sol-content">${solutions[0].html}</div>`;
      container.appendChild(block);
      renderMath(block.querySelector('.sol-content'));
      return;
    }

    // несколько решений — табы
    const block = document.createElement('div');
    block.className = 'solution-block solution-block--tabbed math-content';
    const tabsHtml = solutions.map((s, i) => `
      <button type="button" class="sol-tab ${i === 0 ? 'active' : ''}" data-idx="${i}" data-blockid="${blockId}">${escapeHtml(s.title)}</button>
    `).join('');
    const panesHtml = solutions.map((s, i) => `
      <div class="sol-pane ${i === 0 ? 'active' : ''}" data-idx="${i}" data-blockid="${blockId}">${s.html}</div>
    `).join('');

    block.innerHTML = `
      <h4 style="margin-bottom:0.6rem;">Решение</h4>
      <div class="sol-tabs" data-blockid="${blockId}">${tabsHtml}</div>
      <div class="sol-panes" data-blockid="${blockId}">${panesHtml}</div>
    `;
    container.appendChild(block);

    // рендер math для всех
    block.querySelectorAll('.sol-pane').forEach(renderMath);

    // табы
    block.querySelectorAll('.sol-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.idx, 10);
        block.querySelectorAll('.sol-tab').forEach((t) => t.classList.toggle('active', parseInt(t.dataset.idx, 10) === idx));
        block.querySelectorAll('.sol-pane').forEach((p) => p.classList.toggle('active', parseInt(p.dataset.idx, 10) === idx));
      });
    });
  }

  // Заполняет таблицу перевода на инфо-экране
  function buildConversionTable() {
    const tbody = $('#conv-table-body');
    if (!tbody) return;
    const maxPoints = totalMaxScore();
    let rows = '';
    for (let p = 0; p <= maxPoints; p++) {
      const g10 = computeGrade(p);
      const g100 = computeGrade100(p);
      const lbl = gradeLabel(g10);
      rows += `<tr class="conv-row--${lbl.cls}"><td><strong>${p}</strong></td><td>${formatScore(g10)}</td><td>${formatScore(g100)}</td></tr>`;
    }
    tbody.innerHTML = rows;
  }

  // ============================================================
  // СОСТОЯНИЕ
  // ============================================================

  let currentVariant = null; // { 1: task, 2: task, ... 20: task }
  let currentVariantMeta = null; // { key, title, subtitle } или null для случайного
  let pendingPreset = null;  // выбранный preset, ждущий нажатия "Начать"
  let drafts = {};           // { slot: текст черновика }
  let solved = {};           // { slot: true/false }
  let selfGrades = {};       // { slot: число баллов }
  let selfCriteria = {};     // { slot: [bool, bool, ...] — отмеченные критерии (чекбоксы) }

  // ============================================================
  // ГОТОВЫЕ ВАРИАНТЫ (presets)
  // ============================================================

  const PRESETS = [
    {
      key: 'exam2025-demo',
      title: 'Демо летнего экзамена',
      subtitle: '2024–2025',
      desc: 'Демо-вариант реального экзамена по курсу МИА за летнюю сессию 2025. Выдавался студентам для подготовки.',
      badge: 'Демо',
      badgeCls: 'presets-badge--demo',
    },
    {
      key: 'exam2025-v1',
      title: 'Летний экзамен · Вариант 1',
      subtitle: '2024–2025',
      desc: 'Первый вариант реального экзамена, который сдавали летом 2025. 20 задач, 180 минут.',
      badge: 'Вариант 1',
      badgeCls: 'presets-badge--v1',
    },
    {
      key: 'exam2025-v2',
      title: 'Летний экзамен · Вариант 2',
      subtitle: '2024–2025',
      desc: 'Второй вариант реального экзамена. Задачи аналогичны варианту 1, но с другими числами и формулировками.',
      badge: 'Вариант 2',
      badgeCls: 'presets-badge--v2',
    },
  ];

  /**
   * Собирает готовый вариант по префиксу id.
   * Для каждого типа ищет задачу с id, начинающимся на prefix+'-'.
   * Если не нашлось — берёт случайную задачу из этого типа (fallback).
   * Возвращает { variant: { slot: task }, missingSlots: [int] }.
   */
  function collectPresetVariant(prefix) {
    const bank = window.TASK_BANK || {};
    const variant = {};
    const missingSlots = [];
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const tasks = (bank[s] && bank[s].tasks) || [];
      const hit = tasks.find((t) => t.id && t.id.startsWith(prefix + '-'));
      if (hit) {
        variant[s] = hit;
      } else {
        // fallback: случайная задача из этого типа
        if (tasks.length) {
          variant[s] = tasks[Math.floor(Math.random() * tasks.length)];
        } else {
          variant[s] = makePlaceholderTask(s);
        }
        missingSlots.push(s);
      }
    }
    return { variant, missingSlots };
  }

  function buildPresetsGrid() {
    const grid = $('#presets-grid');
    if (!grid) return;
    grid.innerHTML = '';
    PRESETS.forEach((p) => {
      const { missingSlots } = collectPresetVariant(p.key);
      const complete = missingSlots.length === 0;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'preset-card';
      card.innerHTML = `
        <div class="preset-card__top">
          <span class="presets-badge ${p.badgeCls}">${escapeHtml(p.badge)}</span>
          <span class="preset-card__subtitle">${escapeHtml(p.subtitle)}</span>
        </div>
        <h3 class="preset-card__title">${escapeHtml(p.title)}</h3>
        <p class="preset-card__desc">${escapeHtml(p.desc)}</p>
        <div class="preset-card__footer">
          <span class="preset-card__meta">
            ${complete
              ? '<span class="preset-card__ok">● Все 20 задач из оригинала</span>'
              : `<span class="preset-card__partial">● ${20 - missingSlots.length}/20 из оригинала, остальные — случайные</span>`}
          </span>
          <span class="preset-card__cta">Начать →</span>
        </div>
      `;
      card.addEventListener('click', () => openPresetInfo(p.key));
      grid.appendChild(card);
    });
  }

  // ============================================================
  // LEARN — лекции и конспекты
  // ============================================================

  function buildLecturesList() {
    const list = $('#lectures-list');
    if (!list) return;
    const data = (window.LEARN_DATA && window.LEARN_DATA.lectures) || [];
    if (!data.length) {
      list.innerHTML = '<p class="muted">Лекции пока не добавлены. Впиши их в <code>site/js/learn.js</code>.</p>';
      return;
    }
    list.innerHTML = '';
    data.forEach((lec, idx) => {
      const hasLinks = Array.isArray(lec.links) && lec.links.length > 0;
      const card = document.createElement('div');
      card.className = 'lecture-card' + (hasLinks ? '' : ' lecture-card--empty');

      const topicsHtml = (lec.topics || []).map((t) => `<span class="lecture-tag">${escapeHtml(t)}</span>`).join('');

      const linksHtml = hasLinks
        ? lec.links.map((l) => {
            const icon = linkIcon(l.type);
            return `<a class="lecture-link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${icon}<span>${escapeHtml(l.label || l.type || 'Открыть')}</span></a>`;
          }).join('')
        : '<span class="muted small">Ссылка ещё не добавлена</span>';

      card.innerHTML = `
        <div class="lecture-card__head">
          <div class="lecture-card__week">Неделя ${lec.week || '?'}</div>
          <div class="lecture-card__title-wrap">
            <h3 class="lecture-card__title math-content">${lec.title || 'Без названия'}</h3>
            ${topicsHtml ? `<div class="lecture-tags">${topicsHtml}</div>` : ''}
          </div>
        </div>
        <div class="lecture-card__links">${linksHtml}</div>
      `;
      list.appendChild(card);
    });
    list.querySelectorAll('.math-content').forEach(renderMath);
  }

  function linkIcon(type) {
    const icons = {
      video: '▶',
      notes: '≡',
      slides: '▣',
      pdf: '⎙',
      yadisk: '☁',
    };
    return `<span class="lecture-link__icon">${icons[type] || '→'}</span>`;
  }

  function buildNotesGrid() {
    const grid = $('#notes-grid');
    if (!grid) return;
    const bank = window.TASK_BANK || {};
    const notes = (window.LEARN_DATA && window.LEARN_DATA.notes) || {};
    grid.innerHTML = '';
    for (let s = 1; s <= TOTAL_SLOTS; s++) {
      const meta = bank[s] || { title: '' };
      const note = notes[s] || { html: '' };
      const hasContent = !!(note.html && note.html.trim());
      const score = maxScoreOfSlot(s);

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'note-card' + (hasContent ? '' : ' note-card--empty');
      card.innerHTML = `
        <div class="note-card__top">
          <span class="note-card__num">${s}</span>
          <span class="bank-card__score bank-card__score--${score}">${score} ${pluralBall(score)}</span>
        </div>
        <p class="note-card__title">${escapeHtml(meta.title || '...')}</p>
        <p class="note-card__status">${hasContent ? 'Конспект готов →' : '<span class="muted small">конспекта пока нет</span>'}</p>
      `;
      card.addEventListener('click', () => openNote(s));
      grid.appendChild(card);
    }
  }

  function openNote(slot) {
    const bank = window.TASK_BANK || {};
    const meta = bank[slot] || { title: '' };
    const note = ((window.LEARN_DATA && window.LEARN_DATA.notes) || {})[slot] || { html: '' };
    $('#learn-overview').hidden = true;
    $('#learn-detail').hidden = false;

    const title = $('#learn-detail-title');
    const subtitle = $('#learn-detail-subtitle');
    const body = $('#learn-detail-body');
    if (title) title.innerHTML = `Тип №${slot} <span class="muted">&middot; ${maxScoreOfSlot(slot)} ${pluralBall(maxScoreOfSlot(slot))}</span>`;
    if (subtitle) subtitle.textContent = meta.title || '';
    if (body) {
      if (note.html && note.html.trim()) {
        body.innerHTML = note.html;
      } else {
        body.innerHTML = `
          <div class="info-card">
            <h2>Конспекта пока нет</h2>
            <p class="muted">Добавь его в <code>site/js/learn.js</code>, в объект <code>notes[${slot}].html</code>.</p>
            <p class="muted">Внутри html можно использовать LaTeX через <code>$...$</code> и <code>$$...$$</code>, а также HTML-теги для разметки.</p>
          </div>
        `;
      }
      renderMath(body);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function exitNote() {
    $('#learn-overview').hidden = false;
    $('#learn-detail').hidden = true;
  }

  function openPresetInfo(presetKey) {
    const p = PRESETS.find((x) => x.key === presetKey);
    if (!p) return;
    pendingPreset = presetKey;
    // обновим заголовок инфо-экрана
    const titleEl = $('#pre-exam-title');
    if (titleEl) titleEl.textContent = p.title + ' · ' + p.subtitle;
    showScreen('pre-exam');
  }
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
    if (name !== 'learn') {
      const ov = $('#learn-overview'); if (ov) ov.hidden = false;
      const dt = $('#learn-detail'); if (dt) dt.hidden = true;
    }
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
      selfCriteria,
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
    selfCriteria = (data.selfCriteria && typeof data.selfCriteria === 'object') ? data.selfCriteria : {};
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
    // если был выбран preset — используем его; иначе случайный
    if (pendingPreset) {
      const preset = PRESETS.find((p) => p.key === pendingPreset);
      const { variant } = collectPresetVariant(pendingPreset);
      currentVariant = variant;
      currentVariantMeta = preset ? { key: preset.key, title: preset.title + ' · ' + preset.subtitle } : null;
      pendingPreset = null;
    } else {
      currentVariant = pickVariant();
      currentVariantMeta = null;
    }
    drafts = {};
    solved = {};
    selfGrades = {};
    selfCriteria = {};
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
        <p class="formula-display" style="margin-top:0.5rem;">$$\\text{оценка}_{10} = \\min\\!\\left(10,\\ \\dfrac{\\text{твои баллы} + 2}{3}\\right),\\quad \\text{оценка}_{100} = \\text{оценка}_{10}\\cdot 10$$</p>
        <p class="muted small" style="margin-top:0.4rem;">Максимум за вариант: <strong>${totalMaxScore()}</strong> баллов.</p>
      </div>
      <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
        <button type="button" class="btn btn--primary" id="btn-recompute">Пересчитать оценку</button>
        <button type="button" class="btn btn--ghost" id="btn-show-final">Показать итоговую таблицу</button>
        <button type="button" class="btn btn--ghost" id="btn-new-variant">Сгенерировать новый вариант</button>
      </div>
    `;
    renderMath(summary);

    // sticky-плашка с текущей оценкой — появляется сверху при скролле
    const oldSticky = $('#grade-sticky');
    if (oldSticky) oldSticky.remove();
    const stickyEl = document.createElement('div');
    stickyEl.className = 'grade-sticky';
    stickyEl.id = 'grade-sticky';
    stickyEl.innerHTML = `
      <div class="grade-sticky__title">Текущая оценка</div>
      <div class="grade-sticky__value" id="grade-sticky-value">—</div>
      <div class="grade-sticky__bar-wrap"><div class="grade-sticky__bar" id="grade-sticky-bar" style="width:0%"></div></div>
    `;
    summary.after(stickyEl);

    detail.innerHTML = '';

    for (let slot = 1; slot <= TOTAL_SLOTS; slot++) {
      const task = currentVariant[slot];
      const maxS = maxScoreOfSlot(slot);
      const slotMeta = (window.TASK_BANK && window.TASK_BANK[slot]) || { title: '', criteriaHtml: '' };
      const draft = drafts[slot] || '';

      // какие критерии показывать
      const critSourceHtml = task.criteriaHtml || slotMeta.criteriaHtml || '';
      const critIsOwn = !!task.criteriaHtml;
      const parsedCriteria = parseCriteria(critSourceHtml);

      // Состояние чекбоксов. Если длина не совпадает с распарсенным числом — сбрасываем.
      let critState = Array.isArray(selfCriteria[slot]) ? selfCriteria[slot] : null;
      if (parsedCriteria && (!critState || critState.length !== parsedCriteria.length)) {
        critState = parsedCriteria.map(() => false);
        selfCriteria[slot] = critState;
      }

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
      `;

      // блок «Решение» (с возможными альтернативами)
      renderSolutionBlock(card, task, 'results-' + slot);

      // Блок с критериями + самооценкой (разный UI в зависимости от parseCriteria)
      if (parsedCriteria) {
        // ---------- чекбокс-режим ----------
        const rowsHtml = parsedCriteria.map((c, idx) => {
          const checked = critState[idx] ? 'checked' : '';
          const clsSign = c.points >= 0 ? 'criteria-row--plus' : 'criteria-row--minus';
          const pts = (c.points > 0 ? '+' : '') + formatScore(c.points);
          return `
            <label class="criteria-row ${clsSign} ${critState[idx] ? 'is-on' : ''}" data-idx="${idx}">
              <input type="checkbox" data-idx="${idx}" ${checked} />
              <span class="criteria-points">${pts}</span>
              <span class="criteria-text">${escapeHtml(c.text)}</span>
            </label>
          `;
        }).join('');

        const block = document.createElement('div');
        block.className = 'self-grade-v2';
        block.innerHTML = `
          <h4 class="self-grade-v2__title">${critIsOwn ? 'Критерии для этой задачи' : 'Общие критерии типа'} <span class="muted small">— отметь всё, что сделал(а)</span></h4>
          <div class="criteria-list">${rowsHtml}</div>
          <div class="self-grade-v2__sum">
            <span class="muted small">Сумма баллов за задачу:</span>
            <strong class="self-grade-v2__sum-value" data-slot="${slot}">—</strong>
            <span class="muted small">/ ${maxS}</span>
          </div>
        `;
        card.appendChild(block);

      } else {
        // ---------- fallback: критерии в HTML + radio-buttons ----------
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

        const critBlock = document.createElement('div');
        if (critSourceHtml) {
          critBlock.className = 'criteria-block math-content';
          critBlock.innerHTML = `
            <h4>${critIsOwn ? 'Критерии для этой задачи' : 'Общие критерии типа'}</h4>
            <div class="crit-content">${critSourceHtml}</div>
          `;
          card.appendChild(critBlock);
        }

        const selfGradeBlock = document.createElement('div');
        selfGradeBlock.className = 'self-grade';
        selfGradeBlock.innerHTML = `
          <div class="self-grade__title">Поставь себе балл (макс. ${maxS}):</div>
          <div class="self-grade__options">${optsHtml}</div>
        `;
        card.appendChild(selfGradeBlock);
      }

      const condEl = card.querySelector('.task-card__head + .muted + .math-content');
      if (condEl) {
        condEl.innerHTML = task.questionLatex || '';
        renderMath(condEl);
      }

      const critContentEl = card.querySelector('.crit-content');
      if (critContentEl) renderMath(critContentEl);

      // Обработчики
      if (parsedCriteria) {
        // --- чекбоксы ---
        const sumEl = card.querySelector('.self-grade-v2__sum-value');
        const recalcSum = () => {
          let s = 0;
          parsedCriteria.forEach((c, i) => { if (critState[i]) s += c.points; });
          const clamped = clampScore(s, maxS);
          selfGrades[slot] = clamped;
          if (sumEl) {
            sumEl.textContent = formatScore(clamped);
            // если исходная сумма вышла за границы — покажем отметку
            sumEl.classList.toggle('clamped', Math.abs(s - clamped) > 1e-9);
            sumEl.title = (Math.abs(s - clamped) > 1e-9)
              ? `Сырая сумма: ${formatScore(s)}, ограничено до ${formatScore(clamped)}`
              : '';
          }
        };
        recalcSum();

        card.querySelectorAll('.criteria-list input[type=checkbox]').forEach((cb) => {
          cb.addEventListener('change', (e) => {
            const idx = parseInt(cb.dataset.idx, 10);
            critState[idx] = cb.checked;
            const row = cb.closest('.criteria-row');
            if (row) row.classList.toggle('is-on', cb.checked);
            recalcSum();
            updateGradeOutput();
            schedulePersist();
          });
        });
      } else {
        // --- radio ---
        card.querySelectorAll(`input[name="grade-${slot}"]`).forEach((r) => {
          r.addEventListener('change', (e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) {
              selfGrades[slot] = v;
              card.querySelectorAll('.self-grade__opt').forEach((opt) => {
                const inp = opt.querySelector('input');
                if (inp) opt.classList.toggle('checked', inp.checked);
              });
              updateGradeOutput();
              schedulePersist();
            }
          });
        });
      }

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
    $('#btn-show-final').addEventListener('click', () => {
      renderFinalPage();
      showScreen('final');
    });
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
      drafts = {}; solved = {}; selfGrades = {}; selfCriteria = {};
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
    const grade100 = computeGrade100(total);
    const gl = gradeLabel(grade);
    const out = $('#grade-output');
    if (!out) return;
    const breakdown = perSlotBreakdownHtml();
    out.innerHTML = `
      <div class="muted small">Твоя итоговая оценка</div>
      <div class="results__score-row">
        <div class="results__score">${formatScore(grade)}<span class="results__score-scale">/10</span></div>
        <div class="results__score results__score--small">${formatScore(grade100)}<span class="results__score-scale">/100</span></div>
      </div>
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
      bottom.textContent = formatScore(grade) + ' / 10  ·  ' + formatScore(grade100) + ' / 100';
    }
    // и в sticky плашку справа
    const sticky = $('#grade-sticky-value');
    if (sticky) {
      sticky.innerHTML = `<strong>${formatScore(grade)}</strong><span class="muted small">/10</span>  &middot;  <strong>${formatScore(grade100)}</strong><span class="muted small">/100</span>`;
    }
    const stickyBar = $('#grade-sticky-bar');
    if (stickyBar) stickyBar.style.width = (grade * 10) + '%';
  }

  // ============================================================
  // FINAL PAGE — итоговая табличка
  // ============================================================

  function renderFinalPage() {
    if (!currentVariant) return;
    let total = 0;
    const maxTotal = totalMaxScore();

    // строки таблицы
    const rows = [];
    for (let slot = 1; slot <= TOTAL_SLOTS; slot++) {
      const task = currentVariant[slot];
      const maxS = maxScoreOfSlot(slot);
      const my = selfGrades[slot] || 0;
      total += my;
      const pct = Math.round((my / maxS) * 100);
      const slotMeta = (window.TASK_BANK && window.TASK_BANK[slot]) || { title: '' };
      let rowCls = 'final-row--none';
      if (my >= maxS) rowCls = 'final-row--full';
      else if (my >= maxS * 0.5) rowCls = 'final-row--part';
      else if (my > 0) rowCls = 'final-row--some';

      rows.push(`
        <tr class="${rowCls}">
          <td><strong>${slot}</strong></td>
          <td>${escapeHtml(slotMeta.title || '')}</td>
          <td class="muted small">${escapeHtml(task.source || '')}</td>
          <td class="tal-right"><strong>${formatScore(my)}</strong></td>
          <td class="tal-right muted">${maxS}</td>
          <td class="tal-right muted">${pct}%</td>
        </tr>
      `);
    }

    const body = $('#final-table-body');
    if (body) body.innerHTML = rows.join('');

    const foot = $('#final-table-foot');
    if (foot) {
      foot.innerHTML = `
        <tr class="grade-table__total">
          <td colspan="3"><strong>ИТОГО</strong></td>
          <td class="tal-right"><strong>${formatScore(total)}</strong></td>
          <td class="tal-right"><strong>${maxTotal}</strong></td>
          <td class="tal-right"><strong>${Math.round((total/maxTotal)*100)}%</strong></td>
        </tr>
      `;
    }

    // hero с крупной оценкой
    const grade = computeGrade(total);
    const grade100 = computeGrade100(total);
    const gl = gradeLabel(grade);
    const hero = $('#final-hero');
    if (hero) {
      hero.innerHTML = `
        <div class="final-hero__grades">
          <div class="final-hero__grade">
            <div class="muted small">Оценка</div>
            <div class="final-hero__num">${formatScore(grade)}<span class="muted">/10</span></div>
          </div>
          <div class="final-hero__divider"></div>
          <div class="final-hero__grade">
            <div class="muted small">100-балльная шкала</div>
            <div class="final-hero__num final-hero__num--small">${formatScore(grade100)}<span class="muted">/100</span></div>
          </div>
          <div class="final-hero__divider"></div>
          <div class="final-hero__grade">
            <div class="muted small">Сумма баллов</div>
            <div class="final-hero__num final-hero__num--small">${formatScore(total)}<span class="muted">/${maxTotal}</span></div>
          </div>
        </div>
        <div class="final-hero__label">
          <span class="results__score-label results__score-label--${gl.cls}">${gl.text}</span>
        </div>
      `;
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

  function openBankSlot(slot, taskIdx) {
    bankActiveSlot = slot;
    // если taskIdx не передан — используем 0 (первое открытие); если передан — берём его
    if (typeof taskIdx === 'number') bankActiveTaskIdx = taskIdx;
    else bankActiveTaskIdx = 0;

    $('#bank-overview').hidden = true;
    $('#bank-detail').hidden = false;

    const meta = (window.TASK_BANK && window.TASK_BANK[slot]) || { title: '', tasks: [], criteriaHtml: '' };
    const tasks = meta.tasks || [];
    const score = maxScoreOfSlot(slot);

    $('#bank-detail-title').innerHTML =
      `Тип №${slot} <span class="bank-card__score bank-card__score--${score}" style="margin-left:0.6rem;font-size:0.75rem;">${score} ${pluralBall(score)}</span>`;

    const desc = $('#bank-detail-desc');
    desc.innerHTML = escapeHtml(meta.title || '');

    // Общие критерии для типа теперь показываем СВЁРНУТЫМИ (по умолчанию).
    // Индивидуальные критерии конкретной задачи будут внутри карточки задачи (если есть).
    const crit = $('#bank-detail-criteria');
    if (meta.criteriaHtml) {
      crit.innerHTML = `
        <details class="info-card-collapsible">
          <summary><strong>Общие критерии оценивания типа</strong> <span class="muted small">(нажми, чтобы развернуть)</span></summary>
          <div class="math-content" style="margin-top:0.5rem;">${meta.criteriaHtml}</div>
        </details>
      `;
      const detailsEl = crit.querySelector('details');
      // рендерим математику только когда раскрыли (лениво)
      detailsEl.addEventListener('toggle', () => {
        if (detailsEl.open) renderMath(detailsEl);
      });
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
      renderBankTaskView(null);
      return;
    }
    tasks.forEach((t, idx) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'bank-task-item';
      if (idx === bankActiveTaskIdx) item.classList.add('active');
      item.dataset.idx = String(idx);
      item.innerHTML = `
        <div class="bank-task-item__source">${escapeHtml(t.source || 'Без источника')}</div>
        <div class="bank-task-item__title">${escapeHtml(t.id || ('Задача ' + (idx + 1)))}</div>
      `;
      item.addEventListener('click', () => selectBankTask(idx));
      list.appendChild(item);
    });

    renderBankTaskView(tasks[bankActiveTaskIdx]);
  }

  /**
   * Переключиться на задачу idx внутри уже открытого слота
   * (без перерисовки списка слева).
   */
  function selectBankTask(idx) {
    if (bankActiveSlot == null) return;
    const tasks = (window.TASK_BANK[bankActiveSlot] && window.TASK_BANK[bankActiveSlot].tasks) || [];
    if (idx < 0 || idx >= tasks.length) return;

    bankActiveTaskIdx = idx;

    // обновим класс active в списке
    document.querySelectorAll('.bank-task-item').forEach((el) => {
      const i = parseInt(el.dataset.idx, 10);
      el.classList.toggle('active', i === idx);
    });

    renderBankTaskView(tasks[idx]);

    // прокрутим карточку задачи наверх (по правой колонке)
    const view = $('#bank-task-view');
    if (view) view.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    const tasks = meta.tasks || [];
    const draftSaved = (loadBankDrafts())[task.id] || '';

    // Какие критерии показывать к этой задаче?
    // - если у задачи есть индивидуальные task.criteriaHtml — берём их (помечаем "Критерии для этой задачи")
    // - иначе — fallback на общие критерии типа (помечаем "Общие критерии типа")
    const hasOwnCriteria = !!task.criteriaHtml;
    const critHtml = hasOwnCriteria ? task.criteriaHtml : (meta.criteriaHtml || '');
    const critTitle = hasOwnCriteria ? 'Критерии для этой задачи' : 'Общие критерии типа';

    const idx = bankActiveTaskIdx;
    const total = tasks.length;
    const hasPrev = idx > 0;
    const hasNext = idx < total - 1;

    view.innerHTML = `
      <div class="bank-task-nav">
        <button type="button" class="btn btn--ghost btn--small" id="bank-prev" ${hasPrev ? '' : 'disabled'}>← Предыдущая</button>
        <span class="muted small">Задача ${idx + 1} из ${total}</span>
        <button type="button" class="btn btn--ghost btn--small" id="bank-next" ${hasNext ? '' : 'disabled'}>Следующая →</button>
      </div>

      <div class="task-card__heading" style="margin:1rem 0;">
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

      <div id="bank-sol-host" hidden></div>

      ${critHtml ? `
        <div class="criteria-block math-content" id="bank-crit" hidden>
          <h4>${critTitle}</h4>
          <div class="bank-crit-content">${critHtml}</div>
        </div>
      ` : ''}
    `;

    const condEl = view.querySelector('.cond-area');
    condEl.innerHTML = task.questionLatex || '';
    renderMath(condEl);

    const draftInput = $('#bank-draft-input');
    draftInput.addEventListener('input', () => saveBankDraft(task.id, draftInput.value));

    // навигация prev/next
    $('#bank-prev').addEventListener('click', () => { if (hasPrev) selectBankTask(idx - 1); });
    $('#bank-next').addEventListener('click', () => { if (hasNext) selectBankTask(idx + 1); });

    const solHost = $('#bank-sol-host');
    const critEl = $('#bank-crit');
    const btn = $('#bank-toggle-sol');
    let solLoaded = false;
    btn.addEventListener('click', () => {
      const isHidden = solHost.hidden;
      solHost.hidden = !isHidden;
      if (critEl) critEl.hidden = !isHidden;
      btn.textContent = isHidden ? 'Скрыть разбор' : 'Показать разбор';
      if (isHidden && !solLoaded) {
        solHost.innerHTML = '';
        renderSolutionBlock(solHost, task, 'bank-' + (task.id || 'x'));
        if (critEl) renderMath(critEl);
        solLoaded = true;
      }
    });
  }

  // ============================================================
  // ИНИЦИАЛИЗАЦИЯ
  // ============================================================

  function init() {
    buildBankGrid();
    buildPresetsGrid();
    buildConversionTable();
    buildLecturesList();
    buildNotesGrid();

    $('#btn-start-variant').addEventListener('click', () => {
      pendingPreset = null;
      // сброс заголовка на дефолтный
      const titleEl = $('#pre-exam-title');
      if (titleEl) titleEl.textContent = 'Информация перед началом';
      showScreen('pre-exam');
    });
    $('#btn-go-bank').addEventListener('click', () => showScreen('bank'));
    $('#btn-go-presets').addEventListener('click', () => showScreen('presets'));
    const btnLearn = $('#btn-go-learn');
    if (btnLearn) btnLearn.addEventListener('click', () => showScreen('learn'));
    const btnLearnBack = $('#btn-learn-back');
    if (btnLearnBack) btnLearnBack.addEventListener('click', exitNote);

    // табы в разделе Обучение
    $$('.learn-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-tab');
        $$('.learn-tab').forEach((t) => t.classList.toggle('active', t === tab));
        $$('.learn-pane').forEach((p) => {
          p.classList.toggle('active', p.id === 'learn-pane-' + key);
        });
      });
    });
    $('#btn-pre-back').addEventListener('click', () => {
      // если открыли инфо из пресета — возвращаем к списку пресетов, иначе домой
      if (pendingPreset) {
        pendingPreset = null;
        showScreen('presets');
      } else {
        showScreen('home');
      }
    });
    $('#btn-pre-start').addEventListener('click', startNewVariant);
    $('#btn-bank-back').addEventListener('click', exitBankDetail);

    // финальная страница
    $('#btn-final-back').addEventListener('click', () => showScreen('results'));
    $('#btn-final-back-2').addEventListener('click', () => showScreen('results'));
    $('#btn-final-new').addEventListener('click', async () => {
      const ok = await showModal({
        title: 'Сгенерировать новый вариант?',
        message: 'Текущие результаты, черновики и самооценки будут потеряны.',
        confirmText: 'Да, сгенерировать',
        cancelText: 'Оставить как есть',
        variant: 'danger',
        icon: '↻',
      });
      if (!ok) return;
      phase = 'idle';
      currentVariant = null;
      drafts = {}; solved = {}; selfGrades = {}; selfCriteria = {};
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      $('#nav-exam').disabled = true;
      $('#nav-results').disabled = true;
      showScreen('home');
      updateTopbarStatus();
    });

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
