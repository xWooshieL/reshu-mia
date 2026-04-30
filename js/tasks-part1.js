/**
 * Задачи для типов 1-4 РешуМИА (создано параллельным агентом)
 *
 * Тип 1: операции с векторами, скалярное произведение, норма, косинус угла
 * Тип 2: разложение по ортогональному базису (формула Фурье)
 * Тип 3: расстояния и проекции (точка--прямая/плоскость)
 * Тип 4: частные производные функции в точке, градиент, матрица Якоби
 */
(function () {
  if (!window.TASK_BANK) return;
  const T = window.TASK_BANK;

  // ============================================================
  //  ТИП 1 — Операции с векторами, скалярное произведение, норма
  // ============================================================
  T[1].tasks = [
    {
      id: 'exam2025-demo-q1',
      source: 'Демо летнего экзамена, 2025 / КР №1, 2024–2025, вариант 1, задача №1 (простая)',
      questionLatex: `<p>Пусть $\\vec{a} = \\begin{pmatrix}1 \\\\ 0 \\\\ 3\\end{pmatrix}$, $\\vec{b} = \\begin{pmatrix}2 \\\\ -3 \\\\ -1\\end{pmatrix}$. Найди норму вектора $\\vec{a} - \\langle \\vec{a}, \\vec{b} \\rangle\\,\\vec{b}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Вычислим скалярное произведение $\\langle \\vec{a}, \\vec{b}\\rangle$:</p>
<p>$$\\langle \\vec{a}, \\vec{b}\\rangle = 1\\cdot 2 + 0\\cdot(-3) + 3\\cdot(-1) = 2 + 0 - 3 = -1.$$</p>
<p><strong>Шаг 2.</strong> Найдём вектор $\\langle\\vec{a},\\vec{b}\\rangle\\,\\vec{b}$:</p>
<p>$$-1\\cdot \\begin{pmatrix}2\\\\-3\\\\-1\\end{pmatrix} = \\begin{pmatrix}-2\\\\3\\\\1\\end{pmatrix}.$$</p>
<p><strong>Шаг 3.</strong> Вычислим $\\vec{a} - \\langle\\vec{a},\\vec{b}\\rangle\\,\\vec{b}$:</p>
<p>$$\\begin{pmatrix}1\\\\0\\\\3\\end{pmatrix} - \\begin{pmatrix}-2\\\\3\\\\1\\end{pmatrix} = \\begin{pmatrix}3\\\\-3\\\\2\\end{pmatrix}.$$</p>
<p><strong>Шаг 4.</strong> Вычислим норму:</p>
<p>$$\\left\\|\\begin{pmatrix}3\\\\-3\\\\2\\end{pmatrix}\\right\\| = \\sqrt{3^2 + (-3)^2 + 2^2} = \\sqrt{9 + 9 + 4} = \\sqrt{22}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\sqrt{22}$.</p>
`,
    },

    {
      id: 'exam2025-v1-q1',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Пусть $\\vec{a} = \\begin{pmatrix}1 \\\\ 1 \\\\ 1\\end{pmatrix}$, $\\vec{b} = \\begin{pmatrix}1 \\\\ -2 \\\\ 1\\end{pmatrix}$. Найди косинус угла между векторами $\\vec{a}$ и $\\vec{a} - \\vec{b}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Найдём вектор $\\vec{a} - \\vec{b}$:</p>
<p>$$\\vec{a} - \\vec{b} = \\begin{pmatrix}1-1\\\\1-(-2)\\\\1-1\\end{pmatrix} = \\begin{pmatrix}0\\\\3\\\\0\\end{pmatrix}.$$</p>
<p><strong>Шаг 2.</strong> Вычислим скалярное произведение $\\langle\\vec{a}, \\vec{a}-\\vec{b}\\rangle$:</p>
<p>$$\\langle\\vec{a}, \\vec{a}-\\vec{b}\\rangle = 1\\cdot 0 + 1\\cdot 3 + 1\\cdot 0 = 3.$$</p>
<p><strong>Шаг 3.</strong> Вычислим нормы:</p>
<p>$$\\|\\vec{a}\\| = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}, \\qquad \\|\\vec{a}-\\vec{b}\\| = \\sqrt{0 + 9 + 0} = 3.$$</p>
<p><strong>Шаг 4.</strong> По формуле косинуса угла:</p>
<p>$$\\cos\\theta = \\frac{\\langle\\vec{a},\\vec{a}-\\vec{b}\\rangle}{\\|\\vec{a}\\|\\cdot\\|\\vec{a}-\\vec{b}\\|} = \\frac{3}{\\sqrt{3}\\cdot 3} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\dfrac{\\sqrt{3}}{3}$.</p>
`,
    },

    {
      id: 'exam2025-v2-q1',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Пусть $\\vec{a} = \\begin{pmatrix}1 \\\\ 2 \\\\ 1\\end{pmatrix}$, $\\vec{b} = \\begin{pmatrix}1 \\\\ -2 \\\\ 1\\end{pmatrix}$. Найди косинус угла между векторами $\\vec{a}$ и $\\vec{a} + \\vec{b}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Найдём вектор $\\vec{a} + \\vec{b}$:</p>
<p>$$\\vec{a} + \\vec{b} = \\begin{pmatrix}1+1\\\\2+(-2)\\\\1+1\\end{pmatrix} = \\begin{pmatrix}2\\\\0\\\\2\\end{pmatrix}.$$</p>
<p><strong>Шаг 2.</strong> Скалярное произведение $\\langle\\vec{a}, \\vec{a}+\\vec{b}\\rangle$:</p>
<p>$$\\langle\\vec{a}, \\vec{a}+\\vec{b}\\rangle = 1\\cdot 2 + 2\\cdot 0 + 1\\cdot 2 = 4.$$</p>
<p><strong>Шаг 3.</strong> Нормы:</p>
<p>$$\\|\\vec{a}\\| = \\sqrt{1 + 4 + 1} = \\sqrt{6}, \\qquad \\|\\vec{a}+\\vec{b}\\| = \\sqrt{4 + 0 + 4} = \\sqrt{8} = 2\\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Косинус угла:</p>
<p>$$\\cos\\theta = \\frac{4}{\\sqrt{6}\\cdot 2\\sqrt{2}} = \\frac{4}{2\\sqrt{12}} = \\frac{4}{4\\sqrt{3}} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\dfrac{\\sqrt{3}}{3}$.</p>
`,
    },

    {
      id: 'kr1-2024-demo-q1',
      source: 'Демо-вариант КР №1, 2024–2025, задача №1 (простая)',
      questionLatex: `<p>Известно, что $\\|\\vec{a}\\| = 3$, $\\|\\vec{b}\\| = 13$, $\\|\\vec{a} + \\vec{b}\\| = \\sqrt{208}$. Найди площадь параллелограмма, натянутого на векторы $\\vec{a}$ и $\\vec{b}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Распишем квадрат нормы суммы:</p>
<p>$$\\|\\vec{a}+\\vec{b}\\|^2 = \\|\\vec{a}\\|^2 + 2\\langle\\vec{a},\\vec{b}\\rangle + \\|\\vec{b}\\|^2.$$</p>
<p>Подставим: $208 = 9 + 2\\langle\\vec{a},\\vec{b}\\rangle + 169$, откуда</p>
<p>$$2\\langle\\vec{a},\\vec{b}\\rangle = 208 - 178 = 30 \\;\\Rightarrow\\; \\langle\\vec{a},\\vec{b}\\rangle = 15.$$</p>
<p><strong>Шаг 2.</strong> Найдём косинус угла между векторами:</p>
<p>$$\\cos\\theta = \\frac{\\langle\\vec{a},\\vec{b}\\rangle}{\\|\\vec{a}\\|\\cdot\\|\\vec{b}\\|} = \\frac{15}{3\\cdot 13} = \\frac{15}{39} = \\frac{5}{13}.$$</p>
<p><strong>Шаг 3.</strong> Тогда синус (угол между векторами от $0$ до $\\pi$, поэтому $\\sin\\theta \\ge 0$):</p>
<p>$$\\sin\\theta = \\sqrt{1 - \\tfrac{25}{169}} = \\sqrt{\\tfrac{144}{169}} = \\tfrac{12}{13}.$$</p>
<p><strong>Шаг 4.</strong> Площадь параллелограмма:</p>
<p>$$S = \\|\\vec{a}\\|\\cdot\\|\\vec{b}\\|\\cdot\\sin\\theta = 3\\cdot 13\\cdot \\tfrac{12}{13} = 36.$$</p>
<hr>
<p><strong>Ответ:</strong> $S = 36$.</p>
`,
    },

    {
      id: 'kr1-2024-v1-q2',
      source: 'КР №1, 2024–2025, вариант 1, задача №2 (простая)',
      questionLatex: `<p>Известно, что $\\|\\vec{a}\\| = 3$, $\\|\\vec{b}\\| = 13$, $\\|\\vec{c}\\| = 1$, $\\|\\vec{a} + \\vec{b}\\| = \\sqrt{208}$, косинус угла между векторами $\\vec{a}$ и $\\vec{c}$ равен $\\dfrac{1}{3}$, а векторы $\\vec{b}$ и $\\vec{c}$ перпендикулярны. Найди $\\|\\vec{a} + \\vec{b} + \\vec{c}\\|$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Найдём $\\langle\\vec{a},\\vec{b}\\rangle$ из условия на $\\|\\vec{a}+\\vec{b}\\|$:</p>
<p>$$\\|\\vec{a}+\\vec{b}\\|^2 = \\|\\vec{a}\\|^2 + 2\\langle\\vec{a},\\vec{b}\\rangle + \\|\\vec{b}\\|^2,$$</p>
<p>$$208 = 9 + 2\\langle\\vec{a},\\vec{b}\\rangle + 169 \\;\\Rightarrow\\; \\langle\\vec{a},\\vec{b}\\rangle = 15.$$</p>
<p><strong>Шаг 2.</strong> Найдём $\\langle\\vec{a},\\vec{c}\\rangle$ через косинус угла:</p>
<p>$$\\langle\\vec{a},\\vec{c}\\rangle = \\|\\vec{a}\\|\\cdot\\|\\vec{c}\\|\\cdot\\cos(\\vec{a},\\vec{c}) = 3\\cdot 1\\cdot \\tfrac{1}{3} = 1.$$</p>
<p><strong>Шаг 3.</strong> По условию $\\vec{b}\\perp\\vec{c}$, поэтому $\\langle\\vec{b},\\vec{c}\\rangle = 0$.</p>
<p><strong>Шаг 4.</strong> Распишем квадрат нормы суммы трёх векторов:</p>
<p>$$\\|\\vec{a}+\\vec{b}+\\vec{c}\\|^2 = \\|\\vec{a}\\|^2 + \\|\\vec{b}\\|^2 + \\|\\vec{c}\\|^2 + 2\\bigl(\\langle\\vec{a},\\vec{b}\\rangle + \\langle\\vec{a},\\vec{c}\\rangle + \\langle\\vec{b},\\vec{c}\\rangle\\bigr).$$</p>
<p>Подставляем: $9 + 169 + 1 + 2(15 + 1 + 0) = 179 + 32 = 211$.</p>
<p><strong>Шаг 5.</strong> Итоговая норма:</p>
<p>$$\\|\\vec{a}+\\vec{b}+\\vec{c}\\| = \\sqrt{211}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\sqrt{211}$.</p>
`,
    },

    {
      id: 'kr1-2024-v2-q1',
      source: 'КР №1, 2024–2025, вариант 2, задача №1 (простая)',
      questionLatex: `<p>Пусть $\\vec{a} = \\begin{pmatrix}2 \\\\ -4 \\\\ 1\\end{pmatrix}$, $\\vec{b} = \\begin{pmatrix}0 \\\\ 1 \\\\ 6\\end{pmatrix}$. Найди норму вектора $\\vec{a} - \\langle\\vec{a},\\vec{b}\\rangle\\,\\vec{b}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Вычислим скалярное произведение:</p>
<p>$$\\langle\\vec{a},\\vec{b}\\rangle = 2\\cdot 0 + (-4)\\cdot 1 + 1\\cdot 6 = 0 - 4 + 6 = 2.$$</p>
<p><strong>Шаг 2.</strong> Найдём вектор $\\langle\\vec{a},\\vec{b}\\rangle\\,\\vec{b}$:</p>
<p>$$2\\cdot\\begin{pmatrix}0\\\\1\\\\6\\end{pmatrix} = \\begin{pmatrix}0\\\\2\\\\12\\end{pmatrix}.$$</p>
<p><strong>Шаг 3.</strong> Вычислим разность:</p>
<p>$$\\vec{a} - \\langle\\vec{a},\\vec{b}\\rangle\\,\\vec{b} = \\begin{pmatrix}2\\\\-4\\\\1\\end{pmatrix} - \\begin{pmatrix}0\\\\2\\\\12\\end{pmatrix} = \\begin{pmatrix}2\\\\-6\\\\-11\\end{pmatrix}.$$</p>
<p><strong>Шаг 4.</strong> Норма:</p>
<p>$$\\sqrt{2^2 + (-6)^2 + (-11)^2} = \\sqrt{4 + 36 + 121} = \\sqrt{161}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\sqrt{161}$.</p>
`,
    },

    {
      id: 'kr1-2024-v2-q2',
      source: 'КР №1, 2024–2025, вариант 2, задача №2 (простая)',
      questionLatex: `<p>Известно, что $\\|\\vec{a}\\| = 5$, $\\|\\vec{b}\\| = 7$, $\\|\\vec{c}\\| = 1$, $\\|\\vec{a}+\\vec{b}\\| = \\sqrt{130}$, косинус угла между векторами $\\vec{a}$ и $\\vec{c}$ равен $\\dfrac{2}{5}$, а векторы $\\vec{b}$ и $\\vec{c}$ перпендикулярны. Найди $\\|\\vec{a}+\\vec{b}+\\vec{c}\\|$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Найдём $\\langle\\vec{a},\\vec{b}\\rangle$:</p>
<p>$$\\|\\vec{a}+\\vec{b}\\|^2 = \\|\\vec{a}\\|^2 + 2\\langle\\vec{a},\\vec{b}\\rangle + \\|\\vec{b}\\|^2,$$</p>
<p>$$130 = 25 + 2\\langle\\vec{a},\\vec{b}\\rangle + 49 \\;\\Rightarrow\\; 2\\langle\\vec{a},\\vec{b}\\rangle = 56 \\;\\Rightarrow\\; \\langle\\vec{a},\\vec{b}\\rangle = 28.$$</p>
<p><strong>Шаг 2.</strong> Найдём $\\langle\\vec{a},\\vec{c}\\rangle$:</p>
<p>$$\\langle\\vec{a},\\vec{c}\\rangle = \\|\\vec{a}\\|\\cdot\\|\\vec{c}\\|\\cdot\\cos(\\vec{a},\\vec{c}) = 5\\cdot 1\\cdot \\tfrac{2}{5} = 2.$$</p>
<p><strong>Шаг 3.</strong> $\\langle\\vec{b},\\vec{c}\\rangle = 0$ (по условию).</p>
<p><strong>Шаг 4.</strong> Квадрат нормы суммы:</p>
<p>$$\\|\\vec{a}+\\vec{b}+\\vec{c}\\|^2 = 25 + 49 + 1 + 2(28 + 2 + 0) = 75 + 60 = 135.$$</p>
<p><strong>Шаг 5.</strong></p>
<p>$$\\|\\vec{a}+\\vec{b}+\\vec{c}\\| = \\sqrt{135} = \\sqrt{9\\cdot 15} = 3\\sqrt{15}.$$</p>
<hr>
<p><strong>Ответ:</strong> $3\\sqrt{15}$.</p>
`,
    },
  ];

  // ============================================================
  //  ТИП 2 — Разложение по ортогональному базису (формула Фурье)
  // ============================================================
  T[2].tasks = [
    {
      id: 'exam2025-demo-q2',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `<p>Найди разложение вектора $\\vec{a} = \\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}$ по ортогональному базису $\\{\\vec{v}_1, \\vec{v}_2, \\vec{v}_3\\}$, где $$\\vec{v}_1 = \\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix},\\quad \\vec{v}_2 = \\begin{pmatrix}1\\\\-1\\\\0\\end{pmatrix},\\quad \\vec{v}_3 = \\begin{pmatrix}1\\\\1\\\\-2\\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Проверим ортогональность базиса (попарные скалярные произведения):</p>
<ul>
  <li>$\\langle\\vec{v}_1,\\vec{v}_2\\rangle = 1\\cdot 1 + 1\\cdot(-1) + 1\\cdot 0 = 0$;</li>
  <li>$\\langle\\vec{v}_1,\\vec{v}_3\\rangle = 1 + 1 - 2 = 0$;</li>
  <li>$\\langle\\vec{v}_2,\\vec{v}_3\\rangle = 1 - 1 + 0 = 0$.</li>
</ul>
<p>Базис действительно ортогональный.</p>
<p><strong>Шаг 2.</strong> По формуле коэффициентов Фурье:</p>
<p>$$c_i = \\frac{\\langle\\vec{a},\\vec{v}_i\\rangle}{\\|\\vec{v}_i\\|^2}.$$</p>
<p>Найдём квадраты норм базисных векторов:</p>
<p>$$\\|\\vec{v}_1\\|^2 = 1+1+1 = 3,\\quad \\|\\vec{v}_2\\|^2 = 1+1+0 = 2,\\quad \\|\\vec{v}_3\\|^2 = 1+1+4 = 6.$$</p>
<p><strong>Шаг 3.</strong> Скалярные произведения с $\\vec{a}$:</p>
<p>$$\\langle\\vec{a},\\vec{v}_1\\rangle = 1+2+3 = 6,\\;\\;\\langle\\vec{a},\\vec{v}_2\\rangle = 1-2+0 = -1,\\;\\;\\langle\\vec{a},\\vec{v}_3\\rangle = 1+2-6 = -3.$$</p>
<p><strong>Шаг 4.</strong> Коэффициенты:</p>
<p>$$c_1 = \\tfrac{6}{3} = 2,\\quad c_2 = \\tfrac{-1}{2} = -\\tfrac{1}{2},\\quad c_3 = \\tfrac{-3}{6} = -\\tfrac{1}{2}.$$</p>
<p><strong>Шаг 5.</strong> Разложение:</p>
<p>$$\\vec{a} = 2\\vec{v}_1 - \\tfrac{1}{2}\\vec{v}_2 - \\tfrac{1}{2}\\vec{v}_3.$$</p>
<p><em>Проверка:</em> $2(1,1,1) - \\tfrac12(1,-1,0) - \\tfrac12(1,1,-2) = (2,2,2) + (-\\tfrac12,\\tfrac12,0) + (-\\tfrac12,-\\tfrac12,1) = (1,2,3)$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $\\vec{a} = 2\\vec{v}_1 - \\tfrac{1}{2}\\vec{v}_2 - \\tfrac{1}{2}\\vec{v}_3$.</p>
`,
    },

    {
      id: 'exam2025-v1-q2',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Найди разложение вектора $\\vec{a} = \\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}$ по ортогональному базису $\\{\\vec{v}_1, \\vec{v}_2, \\vec{v}_3\\}$, где $$\\vec{v}_1 = \\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix},\\quad \\vec{v}_2 = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix},\\quad \\vec{v}_3 = \\begin{pmatrix}1\\\\-1\\\\-2\\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Проверим ортогональность:</p>
<ul>
  <li>$\\langle\\vec{v}_1,\\vec{v}_2\\rangle = 1 - 1 + 0 = 0$;</li>
  <li>$\\langle\\vec{v}_1,\\vec{v}_3\\rangle = 1 + 1 - 2 = 0$;</li>
  <li>$\\langle\\vec{v}_2,\\vec{v}_3\\rangle = 1 - 1 + 0 = 0$.</li>
</ul>
<p>Базис ортогональный.</p>
<p><strong>Шаг 2.</strong> Квадраты норм:</p>
<p>$$\\|\\vec{v}_1\\|^2 = 1+1+1 = 3,\\quad \\|\\vec{v}_2\\|^2 = 1+1 = 2,\\quad \\|\\vec{v}_3\\|^2 = 1+1+4 = 6.$$</p>
<p><strong>Шаг 3.</strong> Скалярные произведения с $\\vec{a} = (3, 2, 1)$:</p>
<p>$$\\langle\\vec{a},\\vec{v}_1\\rangle = 3 - 2 + 1 = 2,\\;\\; \\langle\\vec{a},\\vec{v}_2\\rangle = 3 + 2 + 0 = 5,\\;\\; \\langle\\vec{a},\\vec{v}_3\\rangle = 3 - 2 - 2 = -1.$$</p>
<p><strong>Шаг 4.</strong> Коэффициенты Фурье:</p>
<p>$$c_1 = \\tfrac{2}{3},\\quad c_2 = \\tfrac{5}{2},\\quad c_3 = -\\tfrac{1}{6}.$$</p>
<p><strong>Шаг 5.</strong> Разложение:</p>
<p>$$\\vec{a} = \\tfrac{2}{3}\\vec{v}_1 + \\tfrac{5}{2}\\vec{v}_2 - \\tfrac{1}{6}\\vec{v}_3.$$</p>
<p><em>Проверка:</em> $\\tfrac23(1,-1,1) + \\tfrac52(1,1,0) - \\tfrac16(1,-1,-2) = \\tfrac{1}{6}(4,-4,4) + \\tfrac16(15,15,0) + \\tfrac16(-1,1,2) = \\tfrac16(18,12,6) = (3,2,1)$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $\\vec{a} = \\tfrac{2}{3}\\vec{v}_1 + \\tfrac{5}{2}\\vec{v}_2 - \\tfrac{1}{6}\\vec{v}_3$.</p>
`,
    },

    {
      id: 'exam2025-v2-q2',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Найди разложение вектора $\\vec{a} = \\begin{pmatrix}3\\\\-2\\\\1\\end{pmatrix}$ по ортогональному базису $\\{\\vec{v}_1, \\vec{v}_2, \\vec{v}_3\\}$, где $$\\vec{v}_1 = \\begin{pmatrix}1\\\\-1\\\\-1\\end{pmatrix},\\quad \\vec{v}_2 = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix},\\quad \\vec{v}_3 = \\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Проверим ортогональность:</p>
<ul>
  <li>$\\langle\\vec{v}_1,\\vec{v}_2\\rangle = 1 - 1 + 0 = 0$;</li>
  <li>$\\langle\\vec{v}_1,\\vec{v}_3\\rangle = 1 + 1 - 2 = 0$;</li>
  <li>$\\langle\\vec{v}_2,\\vec{v}_3\\rangle = 1 - 1 + 0 = 0$.</li>
</ul>
<p>Базис ортогональный.</p>
<p><strong>Шаг 2.</strong> Квадраты норм:</p>
<p>$$\\|\\vec{v}_1\\|^2 = 1+1+1 = 3,\\quad \\|\\vec{v}_2\\|^2 = 1+1 = 2,\\quad \\|\\vec{v}_3\\|^2 = 1+1+4 = 6.$$</p>
<p><strong>Шаг 3.</strong> Скалярные произведения с $\\vec{a} = (3, -2, 1)$:</p>
<p>$$\\langle\\vec{a},\\vec{v}_1\\rangle = 3\\cdot 1 + (-2)\\cdot(-1) + 1\\cdot(-1) = 3 + 2 - 1 = 4,$$</p>
<p>$$\\langle\\vec{a},\\vec{v}_2\\rangle = 3 + (-2) + 0 = 1,$$</p>
<p>$$\\langle\\vec{a},\\vec{v}_3\\rangle = 3 + (-2)\\cdot(-1) + 1\\cdot 2 = 3 + 2 + 2 = 7.$$</p>
<p><strong>Шаг 4.</strong> Коэффициенты Фурье:</p>
<p>$$c_1 = \\tfrac{4}{3},\\quad c_2 = \\tfrac{1}{2},\\quad c_3 = \\tfrac{7}{6}.$$</p>
<p><strong>Шаг 5.</strong> Разложение:</p>
<p>$$\\vec{a} = \\tfrac{4}{3}\\vec{v}_1 + \\tfrac{1}{2}\\vec{v}_2 + \\tfrac{7}{6}\\vec{v}_3.$$</p>
<p><em>Проверка:</em> $\\tfrac{1}{6}\\bigl(8(1,-1,-1) + 3(1,1,0) + 7(1,-1,2)\\bigr) = \\tfrac{1}{6}(8+3+7,\\,-8+3-7,\\,-8+0+14) = \\tfrac{1}{6}(18,-12,6) = (3,-2,1)$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $\\vec{a} = \\tfrac{4}{3}\\vec{v}_1 + \\tfrac{1}{2}\\vec{v}_2 + \\tfrac{7}{6}\\vec{v}_3$.</p>
`,
    },
  ];

  // ============================================================
  //  ТИП 3 — Расстояния и проекции
  // ============================================================
  T[3].tasks = [
    {
      id: 'exam2025-demo-q3',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `<p>Найди проекцию точки $A(1;\\,1;\\,0)$ на плоскость, заданную уравнением $2x - y - 2z = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Запишем нормаль к плоскости. Из уравнения $2x - y - 2z = 0$ получаем $\\vec{n} = (2, -1, -2)$, $\\|\\vec{n}\\|^2 = 4 + 1 + 4 = 9$.</p>
<p><strong>Шаг 2.</strong> Формула проекции точки $A$ на плоскость $\\langle\\vec{n}, X\\rangle = d$:</p>
<p>$$A' = A - \\frac{\\langle\\vec{n}, A\\rangle - d}{\\|\\vec{n}\\|^2}\\,\\vec{n}.$$</p>
<p>Здесь $d = 0$, $\\langle\\vec{n}, A\\rangle = 2\\cdot 1 - 1 - 0 = 1$.</p>
<p><strong>Шаг 3.</strong> Подставим:</p>
<p>$$A' = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix} - \\frac{1}{9}\\begin{pmatrix}2\\\\-1\\\\-2\\end{pmatrix} = \\begin{pmatrix}1 - \\tfrac{2}{9}\\\\ 1 + \\tfrac{1}{9}\\\\ 0 + \\tfrac{2}{9}\\end{pmatrix} = \\begin{pmatrix}\\tfrac{7}{9}\\\\ \\tfrac{10}{9}\\\\ \\tfrac{2}{9}\\end{pmatrix}.$$</p>
<p><em>Проверка:</em> $2\\cdot\\tfrac{7}{9} - \\tfrac{10}{9} - 2\\cdot\\tfrac{2}{9} = \\tfrac{14 - 10 - 4}{9} = 0$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $A' = \\left(\\dfrac{7}{9},\\,\\dfrac{10}{9},\\,\\dfrac{2}{9}\\right)$.</p>
`,
    },

    {
      id: 'exam2025-v1-q3',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Найди расстояние от точки $A(1;\\,1)$ до прямой $$\\begin{pmatrix}x \\\\ y\\end{pmatrix} = \\begin{pmatrix}1 \\\\ 0\\end{pmatrix} + t \\begin{pmatrix}1 \\\\ 1\\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Точка на прямой: $P_0 = (1,\\,0)$, направляющий вектор $\\vec{d} = (1,\\,1)$. Возьмём вектор от $P_0$ к $A$:</p>
<p>$$\\vec{P_0 A} = A - P_0 = (1-1,\\,1-0) = (0,\\,1).$$</p>
<p><strong>Шаг 2.</strong> Расстояние от точки до прямой на плоскости:</p>
<p>$$d = \\frac{|\\vec{P_0 A}\\times \\vec{d}|}{\\|\\vec{d}\\|},$$</p>
<p>где псевдоскалярное произведение в 2D: $\\vec{u}\\times\\vec{v} = u_x v_y - u_y v_x$.</p>
<p><strong>Шаг 3.</strong> Подставим:</p>
<p>$$\\vec{P_0 A}\\times \\vec{d} = 0\\cdot 1 - 1\\cdot 1 = -1,\\qquad |{-1}| = 1.$$</p>
<p>$$\\|\\vec{d}\\| = \\sqrt{1^2 + 1^2} = \\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Итог:</p>
<p>$$d = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}.$$</p>
<hr>
<p><strong>Ответ:</strong> $d = \\dfrac{\\sqrt{2}}{2}$.</p>
`,
    },

    {
      id: 'exam2025-v2-q3',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Найди расстояние от точки $A(1;\\,1)$ до прямой $$\\begin{pmatrix}x \\\\ y\\end{pmatrix} = \\begin{pmatrix}0 \\\\ 1\\end{pmatrix} + t \\begin{pmatrix}1 \\\\ -1\\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> $P_0 = (0,\\,1)$, $\\vec{d} = (1,\\,-1)$. Тогда</p>
<p>$$\\vec{P_0 A} = (1 - 0,\\, 1 - 1) = (1,\\,0).$$</p>
<p><strong>Шаг 2.</strong> Расстояние от точки до прямой на плоскости:</p>
<p>$$d = \\frac{|u_x v_y - u_y v_x|}{\\|\\vec{d}\\|}.$$</p>
<p><strong>Шаг 3.</strong> Подставим:</p>
<p>$$|1\\cdot(-1) - 0\\cdot 1| = 1,\\quad \\|\\vec{d}\\| = \\sqrt{1 + 1} = \\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Итог:</p>
<p>$$d = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}.$$</p>
<hr>
<p><strong>Ответ:</strong> $d = \\dfrac{\\sqrt{2}}{2}$.</p>
`,
    },

    {
      id: 'contest2-2024-set1-q7',
      source: 'Контест 2, 2024–2025, набор 1, задача №7 (простая)',
      questionLatex: `<p>Найди расстояние от точки $P(5;\\,-1)$ до прямой, заданной уравнением $x + 2y - 3 = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Расстояние от точки $(x_0, y_0)$ до прямой $ax + by + c = 0$ выражается формулой:</p>
<p>$$d = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}.$$</p>
<p><strong>Шаг 2.</strong> Здесь $a = 1$, $b = 2$, $c = -3$, $(x_0,y_0) = (5,-1)$. В числитель:</p>
<p>$$a x_0 + b y_0 + c = 1\\cdot 5 + 2\\cdot(-1) + (-3) = 5 - 2 - 3 = 0.$$</p>
<p><strong>Шаг 3.</strong> Знаменатель: $\\sqrt{1 + 4} = \\sqrt{5}$.</p>
<p><strong>Шаг 4.</strong> Получаем $d = 0/\\sqrt{5} = 0$. Это означает, что точка $P$ лежит на прямой.</p>
<hr>
<p><strong>Ответ:</strong> $d = 0$ (точка $P$ лежит на прямой).</p>
`,
    },

    {
      id: 'contest2-2024-set1-q8',
      source: 'Контест 2, 2024–2025, набор 1, задача №8 (простая)',
      questionLatex: `<p>Найди координаты проекции точки $P(2;\\,1)$ на прямую $2x + 3y - 2 = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Нормаль к прямой $2x + 3y - 2 = 0$: $\\vec{n} = (2,\\,3)$, $\\|\\vec{n}\\|^2 = 4 + 9 = 13$.</p>
<p><strong>Шаг 2.</strong> Формула проекции точки $P$ на прямую $a x + b y + c = 0$:</p>
<p>$$P' = P - \\frac{a x_P + b y_P + c}{a^2 + b^2}\\,(a,\\,b).$$</p>
<p><strong>Шаг 3.</strong> Подставляем $P = (2,\\,1)$:</p>
<p>$$2\\cdot 2 + 3\\cdot 1 - 2 = 4 + 3 - 2 = 5.$$</p>
<p>$$P' = (2,\\,1) - \\tfrac{5}{13}(2,\\,3) = \\left(2 - \\tfrac{10}{13},\\;1 - \\tfrac{15}{13}\\right) = \\left(\\tfrac{16}{13},\\;-\\tfrac{2}{13}\\right).$$</p>
<p><em>Проверка:</em> $2\\cdot\\tfrac{16}{13} + 3\\cdot(-\\tfrac{2}{13}) - 2 = \\tfrac{32 - 6 - 26}{13} = 0$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $P' = \\left(\\dfrac{16}{13},\\,-\\dfrac{2}{13}\\right)$.</p>
`,
    },

    {
      id: 'contest2-2024-set1-q10',
      source: 'Контест 2, 2024–2025, набор 1, задача №10 (простая)',
      questionLatex: `<p>Найди расстояние между параллельными прямыми $x + 2y - 1 = 0$ и $2x + 4y - 5 = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Приведём прямые к общему виду нормали. Поделим вторую прямую на $2$:</p>
<p>$$2x + 4y - 5 = 0 \\;\\Longleftrightarrow\\; x + 2y - \\tfrac{5}{2} = 0.$$</p>
<p>Теперь обе прямые имеют вид $x + 2y + c_i = 0$ с $c_1 = -1$, $c_2 = -\\tfrac{5}{2}$.</p>
<p><strong>Шаг 2.</strong> Формула расстояния между параллельными прямыми $a x + b y + c_1 = 0$ и $a x + b y + c_2 = 0$:</p>
<p>$$d = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}.$$</p>
<p><strong>Шаг 3.</strong> Числитель: $\\left|-1 - \\left(-\\tfrac{5}{2}\\right)\\right| = \\left|\\tfrac{3}{2}\\right| = \\tfrac{3}{2}$. Знаменатель: $\\sqrt{1 + 4} = \\sqrt{5}$.</p>
<p><strong>Шаг 4.</strong></p>
<p>$$d = \\frac{3/2}{\\sqrt{5}} = \\frac{3}{2\\sqrt{5}} = \\frac{3\\sqrt{5}}{10}.$$</p>
<hr>
<p><strong>Ответ:</strong> $d = \\dfrac{3\\sqrt{5}}{10}$.</p>
`,
    },

    {
      id: 'contest2-2024-set1-q5e',
      source: 'Контест 2, 2024–2025, набор 1, задача №5 (с развёрнутым решением)',
      questionLatex: `<p>Найди проекцию точки $P(3;\\,3;\\,0)$ на прямую $$\\ell:\\; \\begin{pmatrix}x \\\\ y \\\\ z\\end{pmatrix} = \\begin{pmatrix}t \\\\ 2t \\\\ 2t\\end{pmatrix},\\quad t \\in \\mathbb{R}.$$</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Прямая проходит через начало $O = (0,0,0)$ с направлением $\\vec{d} = (1,\\,2,\\,2)$. Тогда $\\|\\vec{d}\\|^2 = 1 + 4 + 4 = 9$.</p>
<p><strong>Шаг 2.</strong> Параметр $t^*$ для проекции точки $P$ находится по формуле:</p>
<p>$$t^* = \\frac{\\langle\\vec{OP},\\,\\vec{d}\\rangle}{\\|\\vec{d}\\|^2}.$$</p>
<p>Здесь $\\vec{OP} = (3,\\,3,\\,0)$, поэтому</p>
<p>$$\\langle\\vec{OP},\\,\\vec{d}\\rangle = 3\\cdot 1 + 3\\cdot 2 + 0\\cdot 2 = 9, \\qquad t^* = \\tfrac{9}{9} = 1.$$</p>
<p><strong>Шаг 3.</strong> Подставим $t^* = 1$ в параметризацию прямой:</p>
<p>$$P' = (1,\\,2,\\,2).$$</p>
<p><em>Проверка:</em> $\\vec{P'P} = (3-1,\\,3-2,\\,0-2) = (2,\\,1,\\,-2)$, и $\\langle\\vec{P'P},\\,\\vec{d}\\rangle = 2 + 2 - 4 = 0$. ✓ (вектор от проекции к точке перпендикулярен прямой)</p>
<hr>
<p><strong>Ответ:</strong> $P' = (1,\\,2,\\,2)$.</p>
`,
    },

    {
      id: 'contest2-2024-set1-q8e',
      source: 'Контест 2, 2024–2025, набор 1, задача №8 (с развёрнутым решением)',
      questionLatex: `<p>Даны точка $A(1;\\,2)$ и прямая $\\ell:\\; 3x - y + 9 = 0$. Найди координаты точки $B$, симметричной $A$ относительно прямой $\\ell$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Симметричная точка $B$ задаётся равенством $B = 2A' - A$, где $A'$ — проекция $A$ на прямую $\\ell$.</p>
<p><strong>Шаг 2.</strong> Найдём $A'$. Нормаль к $\\ell$: $\\vec{n} = (3,\\,-1)$, $\\|\\vec{n}\\|^2 = 9 + 1 = 10$. Подставим $A = (1,\\,2)$ в левую часть уравнения:</p>
<p>$$3\\cdot 1 - 1\\cdot 2 + 9 = 3 - 2 + 9 = 10.$$</p>
<p>По формуле проекции:</p>
<p>$$A' = A - \\frac{10}{10}\\,(3,\\,-1) = (1,\\,2) - (3,\\,-1) = (-2,\\,3).$$</p>
<p><em>Проверка:</em> $3\\cdot(-2) - 3 + 9 = -6 - 3 + 9 = 0$. Точка $A'$ на прямой. ✓</p>
<p><strong>Шаг 3.</strong> Симметричная точка:</p>
<p>$$B = 2A' - A = 2(-2,\\,3) - (1,\\,2) = (-4 - 1,\\;6 - 2) = (-5,\\,4).$$</p>
<p><em>Проверка:</em> середина $A$ и $B$ есть $\\left(\\tfrac{1 + (-5)}{2},\\,\\tfrac{2 + 4}{2}\\right) = (-2,\\,3) = A'$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $B(-5,\\,4)$.</p>
`,
    },

    {
      id: 'contest2-2024-set2-q8',
      source: 'Контест 2, 2024–2025, набор 2, задача №8 (простая)',
      questionLatex: `<p>Найди проекцию точки $P(2;\\,-5;\\,1)$ на плоскость, заданную уравнением $5x + 3y + z = 1$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Запишем плоскость в виде $5x + 3y + z - 1 = 0$. Нормаль $\\vec{n} = (5,\\,3,\\,1)$, $\\|\\vec{n}\\|^2 = 25 + 9 + 1 = 35$.</p>
<p><strong>Шаг 2.</strong> Подставим $P = (2,\\,-5,\\,1)$ в левую часть:</p>
<p>$$5\\cdot 2 + 3\\cdot(-5) + 1\\cdot 1 - 1 = 10 - 15 + 1 - 1 = -5.$$</p>
<p><strong>Шаг 3.</strong> Формула проекции:</p>
<p>$$P' = P - \\frac{-5}{35}\\,\\vec{n} = P + \\tfrac{1}{7}\\,(5,\\,3,\\,1) = \\left(2 + \\tfrac{5}{7},\\;-5 + \\tfrac{3}{7},\\;1 + \\tfrac{1}{7}\\right) = \\left(\\tfrac{19}{7},\\,-\\tfrac{32}{7},\\,\\tfrac{8}{7}\\right).$$</p>
<p><em>Проверка:</em> $5\\cdot\\tfrac{19}{7} + 3\\cdot(-\\tfrac{32}{7}) + \\tfrac{8}{7} = \\tfrac{95 - 96 + 8}{7} = 1$. ✓</p>
<hr>
<p><strong>Ответ:</strong> $P' = \\left(\\dfrac{19}{7},\\,-\\dfrac{32}{7},\\,\\dfrac{8}{7}\\right)$.</p>
`,
    },

    {
      id: 'kr1-2024-demo-q6',
      source: 'Демо-вариант КР №1, 2024–2025, задача №6 (с развёрнутым решением)',
      questionLatex: `<p>Найди проекции точки $\\begin{pmatrix}1\\\\2\\end{pmatrix}$ на прямые, которые проходят через точку $\\begin{pmatrix}3\\\\4\\end{pmatrix}$ и касаются единичной окружности с центром в начале координат.</p>`,
      solutionHtml: `
<p>Обозначим $T = (3,\\,4)$, $P = (1,\\,2)$, окружность $x^2 + y^2 = 1$.</p>
<p><strong>Шаг 1. Найдём касательные из точки $T$.</strong> Будем искать их в виде $y - 4 = k(x - 3)$, т.е. $kx - y + (4 - 3k) = 0$. Условие касания — расстояние от центра $O$ до прямой равно радиусу $1$:</p>
<p>$$\\frac{|4 - 3k|}{\\sqrt{k^2 + 1}} = 1 \\;\\Longleftrightarrow\\; (4 - 3k)^2 = k^2 + 1.$$</p>
<p>Раскроем: $16 - 24k + 9k^2 = k^2 + 1 \\;\\Rightarrow\\; 8k^2 - 24k + 15 = 0$. Дискриминант $D = 576 - 480 = 96 = 16\\cdot 6$, поэтому</p>
<p>$$k_{1,2} = \\frac{24 \\pm 4\\sqrt{6}}{16} = \\frac{6 \\pm \\sqrt{6}}{4}.$$</p>
<p>Получаем две касательные $\\ell_i:\\;\\; y = k_i x + (4 - 3 k_i)$, $i = 1,\\,2$.</p>
<p><strong>Шаг 2. Проекция точки $P$ на прямую $\\ell$ через $T$ с направлением $\\vec{d} = (1,\\,k)$.</strong> Используем формулу:</p>
<p>$$P' = T + \\frac{\\langle\\vec{TP},\\,\\vec{d}\\rangle}{\\|\\vec{d}\\|^2}\\,\\vec{d}, \\qquad \\vec{TP} = P - T = (-2,\\,-2).$$</p>
<p>Числитель: $\\langle\\vec{TP},\\,\\vec{d}\\rangle = -2\\cdot 1 + (-2)\\cdot k = -2(1 + k)$.</p>
<p>Знаменатель: $\\|\\vec{d}\\|^2 = 1 + k^2$.</p>
<p>Параметр: $t = \\dfrac{-2(1 + k)}{1 + k^2}$.</p>
<p><strong>Шаг 3. Подсчёт для $k_1 = \\dfrac{6 + \\sqrt{6}}{4}$.</strong></p>
<p>$1 + k_1 = \\dfrac{10 + \\sqrt{6}}{4}$, $k_1^2 = \\dfrac{42 + 12\\sqrt{6}}{16} = \\dfrac{21 + 6\\sqrt{6}}{8}$, $1 + k_1^2 = \\dfrac{29 + 6\\sqrt{6}}{8}$.</p>
<p>$$t_1 = \\frac{-2\\cdot\\tfrac{10 + \\sqrt{6}}{4}}{\\tfrac{29 + 6\\sqrt{6}}{8}} = \\frac{-4(10 + \\sqrt{6})}{29 + 6\\sqrt{6}}.$$</p>
<p>Рационализируем (умножаем числитель и знаменатель на $29 - 6\\sqrt{6}$, знаменатель станет $29^2 - 36\\cdot 6 = 841 - 216 = 625$):</p>
<p>$$(10 + \\sqrt{6})(29 - 6\\sqrt{6}) = 290 - 60\\sqrt{6} + 29\\sqrt{6} - 36 = 254 - 31\\sqrt{6}.$$</p>
<p>$$t_1 = \\frac{-4(254 - 31\\sqrt{6})}{625} = \\frac{-1016 + 124\\sqrt{6}}{625}.$$</p>
<p>Проекция: $P'_1 = T + t_1\\,(1,\\,k_1)$.</p>
<p>$x_{P'_1} = 3 + t_1 = \\dfrac{1875 - 1016 + 124\\sqrt{6}}{625} = \\dfrac{859 + 124\\sqrt{6}}{625}$.</p>
<p>$y_{P'_1} = 4 + t_1 k_1$. Вычислим $t_1 k_1$:</p>
<p>$$(-1016 + 124\\sqrt{6})\\cdot\\tfrac{6 + \\sqrt{6}}{4} = \\tfrac{1}{4}\\bigl(-6096 - 1016\\sqrt{6} + 744\\sqrt{6} + 744\\bigr) = \\tfrac{-5352 - 272\\sqrt{6}}{4}.$$</p>
<p>Тогда $t_1 k_1 = \\dfrac{-5352 - 272\\sqrt{6}}{2500}$, и $y_{P'_1} = 4 + \\dfrac{-5352 - 272\\sqrt{6}}{2500} = \\dfrac{4648 - 272\\sqrt{6}}{2500} = \\dfrac{1162 - 68\\sqrt{6}}{625}.$</p>
<p><strong>Шаг 4. Подсчёт для $k_2 = \\dfrac{6 - \\sqrt{6}}{4}$.</strong> Все формулы аналогичны, меняется лишь знак при $\\sqrt{6}$. По симметрии получаем:</p>
<p>$$P'_2 = \\left(\\dfrac{859 - 124\\sqrt{6}}{625},\\;\\dfrac{1162 + 68\\sqrt{6}}{625}\\right).$$</p>
<p><em>Численная проверка:</em> $\\sqrt{6}\\approx 2{,}449$. Тогда $P'_1\\approx (1{,}860;\\;1{,}592)$, $P'_2\\approx (0{,}889;\\;2{,}126)$. Слоупы касательных $k_1\\approx 2{,}112$, $k_2\\approx 0{,}888$. Подстановка показывает, что обе точки лежат на соответствующих касательных. ✓</p>
<hr>
<p><strong>Ответ:</strong></p>
<p>$$P'_{1,2} = \\left(\\dfrac{859 \\pm 124\\sqrt{6}}{625},\\;\\dfrac{1162 \\mp 68\\sqrt{6}}{625}\\right).$$</p>
`,
    },

    {
      id: 'kr1-2024-v1-q3',
      source: 'КР №1, 2024–2025, вариант 1, задача №3 (простая)',
      questionLatex: `<p>Найди расстояние от точки $A(1;\\,2)$ до прямой $x = -2y + 7$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Перепишем прямую в общем виде:</p>
<p>$$x + 2y - 7 = 0.$$</p>
<p><strong>Шаг 2.</strong> Применяем формулу расстояния:</p>
<p>$$d = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}.$$</p>
<p>Здесь $a = 1$, $b = 2$, $c = -7$, $(x_0, y_0) = (1, 2)$. Числитель:</p>
<p>$$|1\\cdot 1 + 2\\cdot 2 - 7| = |1 + 4 - 7| = |-2| = 2.$$</p>
<p>Знаменатель: $\\sqrt{1 + 4} = \\sqrt{5}$.</p>
<p><strong>Шаг 3.</strong></p>
<p>$$d = \\frac{2}{\\sqrt{5}} = \\frac{2\\sqrt{5}}{5}.$$</p>
<hr>
<p><strong>Ответ:</strong> $d = \\dfrac{2\\sqrt{5}}{5}$.</p>
`,
    },

    {
      id: 'kr1-2024-v2-q3',
      source: 'КР №1, 2024–2025, вариант 2, задача №3 (простая)',
      questionLatex: `<p>Найди расстояние от точки $A(2;\\,-2)$ до прямой $y = 4x - 3$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Перепишем прямую в общем виде:</p>
<p>$$4x - y - 3 = 0.$$</p>
<p><strong>Шаг 2.</strong> Применяем формулу расстояния. Здесь $a = 4$, $b = -1$, $c = -3$, $(x_0, y_0) = (2, -2)$. Числитель:</p>
<p>$$|4\\cdot 2 + (-1)\\cdot(-2) + (-3)| = |8 + 2 - 3| = |7| = 7.$$</p>
<p>Знаменатель: $\\sqrt{16 + 1} = \\sqrt{17}$.</p>
<p><strong>Шаг 3.</strong></p>
<p>$$d = \\frac{7}{\\sqrt{17}} = \\frac{7\\sqrt{17}}{17}.$$</p>
<hr>
<p><strong>Ответ:</strong> $d = \\dfrac{7\\sqrt{17}}{17}$.</p>
`,
    },
  ];

  // ============================================================
  //  ТИП 4 — Частные производные, градиент, матрица Якоби
  // ============================================================
  T[4].tasks = [
    {
      id: 'exam2025-demo-q4',
      source: 'Демо летнего экзамена, 2025 / КР №2, 2024–2025, варианты 1 и 3, задача №11 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y) = \\ln\\!\\left(\\sqrt{x^2 + y^2}\\right)$ найди значение частных производных в точке $(3;\\,4)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Упростим функцию, используя свойство логарифма:</p>
<p>$$f(x,\\,y) = \\ln\\!\\sqrt{x^2 + y^2} = \\tfrac{1}{2}\\ln\\!\\bigl(x^2 + y^2\\bigr).$$</p>
<p><strong>Шаг 2.</strong> Найдём $\\dfrac{\\partial f}{\\partial x}$. По правилу дифференцирования сложной функции:</p>
<p>$$\\frac{\\partial f}{\\partial x} = \\tfrac{1}{2}\\cdot\\frac{2x}{x^2 + y^2} = \\frac{x}{x^2 + y^2}.$$</p>
<p>Аналогично $\\dfrac{\\partial f}{\\partial y} = \\dfrac{y}{x^2 + y^2}.$</p>
<p><strong>Шаг 3.</strong> В точке $(3,\\,4)$: $x^2 + y^2 = 9 + 16 = 25$, поэтому</p>
<p>$$\\frac{\\partial f}{\\partial x}(3,\\,4) = \\frac{3}{25},\\qquad \\frac{\\partial f}{\\partial y}(3,\\,4) = \\frac{4}{25}.$$</p>
<hr>
<p><strong>Ответ:</strong> $f_x(3,4) = \\dfrac{3}{25},\\;\\; f_y(3,4) = \\dfrac{4}{25}$.</p>
`,
    },

    {
      id: 'exam2025-v1-q4',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Для функции $f(x;\\,y) = \\sin(x^2 y)$ найди значение частных производных в точке $(1;\\,\\pi)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Применим правило цепочки. Внешняя функция $\\sin(u)$, внутренняя $u = x^2 y$.</p>
<p>$$\\frac{\\partial f}{\\partial x} = \\cos(x^2 y)\\cdot \\frac{\\partial(x^2 y)}{\\partial x} = \\cos(x^2 y)\\cdot 2 x y,$$</p>
<p>$$\\frac{\\partial f}{\\partial y} = \\cos(x^2 y)\\cdot \\frac{\\partial(x^2 y)}{\\partial y} = \\cos(x^2 y)\\cdot x^2.$$</p>
<p><strong>Шаг 2.</strong> В точке $(1,\\,\\pi)$: $x^2 y = 1\\cdot \\pi = \\pi$, $\\cos\\pi = -1$.</p>
<p><strong>Шаг 3.</strong> Подставляем:</p>
<p>$$\\frac{\\partial f}{\\partial x}(1,\\,\\pi) = (-1)\\cdot 2\\cdot 1\\cdot \\pi = -2\\pi,$$</p>
<p>$$\\frac{\\partial f}{\\partial y}(1,\\,\\pi) = (-1)\\cdot 1^2 = -1.$$</p>
<hr>
<p><strong>Ответ:</strong> $f_x(1,\\pi) = -2\\pi,\\;\\; f_y(1,\\pi) = -1$.</p>
`,
    },

    {
      id: 'exam2025-v2-q4',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Для функции $f(x;\\,y) = \\cos(y^2 x)$ найди значение частных производных в точке $\\left(\\dfrac{\\pi}{2};\\,1\\right)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Внутренняя функция $u = y^2 x$. По правилу цепочки:</p>
<p>$$\\frac{\\partial f}{\\partial x} = -\\sin(y^2 x)\\cdot y^2,\\qquad \\frac{\\partial f}{\\partial y} = -\\sin(y^2 x)\\cdot 2 y x.$$</p>
<p><strong>Шаг 2.</strong> В точке $(\\pi/2,\\,1)$: $y^2 x = 1\\cdot \\tfrac{\\pi}{2} = \\tfrac{\\pi}{2}$, $\\sin\\tfrac{\\pi}{2} = 1$.</p>
<p><strong>Шаг 3.</strong> Подставляем:</p>
<p>$$\\frac{\\partial f}{\\partial x}\\!\\left(\\tfrac{\\pi}{2},\\,1\\right) = -1\\cdot 1^2 = -1,$$</p>
<p>$$\\frac{\\partial f}{\\partial y}\\!\\left(\\tfrac{\\pi}{2},\\,1\\right) = -1\\cdot 2\\cdot 1\\cdot \\tfrac{\\pi}{2} = -\\pi.$$</p>
<hr>
<p><strong>Ответ:</strong> $f_x = -1,\\;\\; f_y = -\\pi$.</p>
`,
    },

    {
      id: 'kr2-2024-demo-q17',
      source: 'Демо-вариант КР №2, 2024–2025, задача №17 (тест)',
      questionLatex: `<p>Найди направление наискорейшего роста функции $f(x;\\,y;\\,z) = z\\,e^{xy}$ в точке $(0;\\,1;\\,2)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Направление наискорейшего роста — это направление градиента $\\nabla f$.</p>
<p><strong>Шаг 2.</strong> Найдём частные производные:</p>
<p>$$\\frac{\\partial f}{\\partial x} = z\\cdot y\\, e^{xy},\\quad \\frac{\\partial f}{\\partial y} = z\\cdot x\\, e^{xy},\\quad \\frac{\\partial f}{\\partial z} = e^{xy}.$$</p>
<p><strong>Шаг 3.</strong> В точке $(0,\\,1,\\,2)$: $xy = 0$, $e^{xy} = 1$. Тогда:</p>
<p>$$\\nabla f(0,\\,1,\\,2) = \\bigl(2\\cdot 1\\cdot 1,\\;2\\cdot 0\\cdot 1,\\;1\\bigr) = (2,\\,0,\\,1).$$</p>
<p><strong>Шаг 4.</strong> Можно нормировать: $\\|\\nabla f\\| = \\sqrt{4 + 0 + 1} = \\sqrt{5}$, единичный вектор</p>
<p>$$\\hat{e} = \\frac{1}{\\sqrt{5}}(2,\\,0,\\,1).$$</p>
<hr>
<p><strong>Ответ:</strong> $\\nabla f(0,\\,1,\\,2) = (2,\\,0,\\,1)$ (или единичный вектор $\\tfrac{1}{\\sqrt{5}}(2,\\,0,\\,1)$).</p>
`,
    },

    {
      id: 'kr2-2024-demo-q20',
      source: 'Демо-вариант КР №2, 2024–2025, задача №20 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y) = x^2 + 2xy + 3y^2$ найди угол между векторами градиентов в точках $P(1;\\,1)$ и $Q(-1;\\,1/2)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Найдём градиент:</p>
<p>$$\\frac{\\partial f}{\\partial x} = 2x + 2y,\\qquad \\frac{\\partial f}{\\partial y} = 2x + 6y.$$</p>
<p><strong>Шаг 2.</strong> Подставим точки:</p>
<p>$$\\nabla f(P) = \\nabla f(1,\\,1) = (2 + 2,\\;2 + 6) = (4,\\,8),$$</p>
<p>$$\\nabla f(Q) = \\nabla f(-1,\\,\\tfrac{1}{2}) = (-2 + 1,\\;-2 + 3) = (-1,\\,1).$$</p>
<p><strong>Шаг 3.</strong> Скалярное произведение и нормы:</p>
<p>$$\\langle\\nabla f(P),\\,\\nabla f(Q)\\rangle = 4\\cdot(-1) + 8\\cdot 1 = 4,$$</p>
<p>$$\\|\\nabla f(P)\\| = \\sqrt{16 + 64} = \\sqrt{80} = 4\\sqrt{5},\\quad \\|\\nabla f(Q)\\| = \\sqrt{1 + 1} = \\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Косинус угла:</p>
<p>$$\\cos\\theta = \\frac{4}{4\\sqrt{5}\\cdot\\sqrt{2}} = \\frac{1}{\\sqrt{10}} = \\frac{\\sqrt{10}}{10}.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\theta = \\arccos\\dfrac{\\sqrt{10}}{10}$.</p>
`,
    },

    {
      id: 'kr2-2024-v13-q1',
      source: 'КР №2, 2024–2025, варианты 1 и 3, задача №1 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y) = x^3 e^y + y^2 \\ln(x)$ найди значение частной производной $\\dfrac{\\partial f}{\\partial x}$ в точке $(1;\\,0)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> При дифференцировании по $x$ переменная $y$ — константа.</p>
<p>$$\\frac{\\partial f}{\\partial x} = 3 x^2 e^y + y^2\\cdot \\frac{1}{x} = 3 x^2 e^y + \\frac{y^2}{x}.$$</p>
<p><strong>Шаг 2.</strong> В точке $(1,\\,0)$: $e^0 = 1$, $y^2 = 0$.</p>
<p>$$\\frac{\\partial f}{\\partial x}(1,\\,0) = 3\\cdot 1\\cdot 1 + \\frac{0}{1} = 3.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\dfrac{\\partial f}{\\partial x}(1,\\,0) = 3$.</p>
`,
    },

    {
      id: 'kr2-2024-v24-q1',
      source: 'КР №2, 2024–2025, варианты 2 и 4, задача №1 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y) = x^2 y\\, e^x + x y^3$ найди значение частной производной $\\dfrac{\\partial f}{\\partial y}$ в точке $(0;\\,1)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> При дифференцировании по $y$ переменная $x$ — константа.</p>
<p>$$\\frac{\\partial f}{\\partial y} = x^2\\, e^x + 3 x y^2.$$</p>
<p><strong>Шаг 2.</strong> В точке $(0,\\,1)$: $x^2 = 0$, $3 x y^2 = 0$.</p>
<p>$$\\frac{\\partial f}{\\partial y}(0,\\,1) = 0\\cdot e^0 + 3\\cdot 0\\cdot 1 = 0.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\dfrac{\\partial f}{\\partial y}(0,\\,1) = 0$.</p>
`,
    },

    {
      id: 'kr2-2024-v24-q11',
      source: 'КР №2, 2024–2025, варианты 2 и 4, задача №11 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y) = \\arctan\\!\\left(\\sqrt{x^2 + y^2}\\right)$ найди значение частной производной $f_x(1;\\,0)$. <br><em>Указание:</em> $\\arctan'(t) = \\dfrac{1}{1 + t^2}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Применим правило цепочки. Положим $u = \\sqrt{x^2 + y^2}$, тогда $f = \\arctan u$.</p>
<p>$$\\frac{\\partial f}{\\partial x} = \\frac{1}{1 + u^2}\\cdot \\frac{\\partial u}{\\partial x} = \\frac{1}{1 + x^2 + y^2}\\cdot \\frac{x}{\\sqrt{x^2 + y^2}}.$$</p>
<p><strong>Шаг 2.</strong> В точке $(1,\\,0)$: $x^2 + y^2 = 1$, $\\sqrt{x^2 + y^2} = 1$, $1 + x^2 + y^2 = 2$.</p>
<p>$$f_x(1,\\,0) = \\frac{1}{2}\\cdot \\frac{1}{1} = \\frac{1}{2}.$$</p>
<hr>
<p><strong>Ответ:</strong> $f_x(1,\\,0) = \\dfrac{1}{2}$.</p>
`,
    },

    {
      id: 'kr2-2024-v13-q9',
      source: 'КР №2, 2024–2025, варианты 1 и 3, задача №9 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y;\\,z) = x y + z$ найди угол между градиентами в точках $(1;\\,0;\\,0)$ и $(0;\\,1;\\,0)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Градиент:</p>
<p>$$\\nabla f = \\left(\\frac{\\partial f}{\\partial x},\\,\\frac{\\partial f}{\\partial y},\\,\\frac{\\partial f}{\\partial z}\\right) = (y,\\,x,\\,1).$$</p>
<p><strong>Шаг 2.</strong> Подставим точки:</p>
<p>$$\\nabla f(1,\\,0,\\,0) = (0,\\,1,\\,1),\\qquad \\nabla f(0,\\,1,\\,0) = (1,\\,0,\\,1).$$</p>
<p><strong>Шаг 3.</strong> Скалярное произведение и нормы:</p>
<p>$$\\langle(0,1,1),\\,(1,0,1)\\rangle = 0 + 0 + 1 = 1,$$</p>
<p>$$\\|(0,1,1)\\| = \\sqrt{2},\\quad \\|(1,0,1)\\| = \\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Косинус угла:</p>
<p>$$\\cos\\theta = \\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}} = \\frac{1}{2} \\;\\Rightarrow\\; \\theta = \\frac{\\pi}{3} = 60^\\circ.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\theta = \\dfrac{\\pi}{3}$ (т.е. $60^\\circ$).</p>
`,
    },

    {
      id: 'kr2-2024-v24-q9',
      source: 'КР №2, 2024–2025, варианты 2 и 4, задача №9 (тест)',
      questionLatex: `<p>Для функции $f(x;\\,y;\\,z) = x + y z$ найди угол между градиентами в точках $(1;\\,0;\\,0)$ и $(0;\\,1;\\,0)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Градиент:</p>
<p>$$\\nabla f = (1,\\,z,\\,y).$$</p>
<p><strong>Шаг 2.</strong> Подставим точки:</p>
<p>$$\\nabla f(1,\\,0,\\,0) = (1,\\,0,\\,0),\\qquad \\nabla f(0,\\,1,\\,0) = (1,\\,0,\\,1).$$</p>
<p><strong>Шаг 3.</strong> Скалярное произведение и нормы:</p>
<p>$$\\langle(1,0,0),\\,(1,0,1)\\rangle = 1 + 0 + 0 = 1,$$</p>
<p>$$\\|(1,0,0)\\| = 1,\\quad \\|(1,0,1)\\| = \\sqrt{2}.$$</p>
<p><strong>Шаг 4.</strong> Косинус угла:</p>
<p>$$\\cos\\theta = \\frac{1}{1\\cdot \\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\;\\Rightarrow\\; \\theta = \\frac{\\pi}{4} = 45^\\circ.$$</p>
<hr>
<p><strong>Ответ:</strong> $\\theta = \\dfrac{\\pi}{4}$ (т.е. $45^\\circ$).</p>
`,
    },

    {
      id: 'kr2-2024-v13-q15',
      source: 'КР №2, 2024–2025, варианты 1 и 3, задача №15 (тест) — матрица Якоби',
      questionLatex: `<p>Для векторной функции $$f(x;\\,y;\\,z) = \\begin{pmatrix}xy + yz \\\\ xz + xyz\\end{pmatrix}$$ найди матрицу производных $Df(\\vec{a})$ в точке $\\vec{a} = (2;\\,3;\\,4)$.</p>`,
      solutionHtml: `
<p>Обозначим компоненты $f_1 = xy + yz$ и $f_2 = xz + xyz$.</p>
<p><strong>Шаг 1.</strong> Найдём частные производные $f_1$:</p>
<p>$$\\frac{\\partial f_1}{\\partial x} = y,\\quad \\frac{\\partial f_1}{\\partial y} = x + z,\\quad \\frac{\\partial f_1}{\\partial z} = y.$$</p>
<p><strong>Шаг 2.</strong> Найдём частные производные $f_2$:</p>
<p>$$\\frac{\\partial f_2}{\\partial x} = z + yz,\\quad \\frac{\\partial f_2}{\\partial y} = xz,\\quad \\frac{\\partial f_2}{\\partial z} = x + xy.$$</p>
<p><strong>Шаг 3.</strong> Подставим $(x,\\,y,\\,z) = (2,\\,3,\\,4)$:</p>
<ul>
  <li>$\\partial_x f_1 = 3$;</li>
  <li>$\\partial_y f_1 = 2 + 4 = 6$;</li>
  <li>$\\partial_z f_1 = 3$;</li>
  <li>$\\partial_x f_2 = 4 + 3\\cdot 4 = 16$;</li>
  <li>$\\partial_y f_2 = 2\\cdot 4 = 8$;</li>
  <li>$\\partial_z f_2 = 2 + 2\\cdot 3 = 8$.</li>
</ul>
<p><strong>Шаг 4.</strong> Соберём матрицу Якоби:</p>
<p>$$Df(2,\\,3,\\,4) = \\begin{pmatrix} 3 & 6 & 3 \\\\ 16 & 8 & 8 \\end{pmatrix}.$$</p>
<hr>
<p><strong>Ответ:</strong> $Df(2,\\,3,\\,4) = \\begin{pmatrix} 3 & 6 & 3 \\\\ 16 & 8 & 8 \\end{pmatrix}$.</p>
`,
    },

    {
      id: 'kr2-2024-v24-q15',
      source: 'КР №2, 2024–2025, варианты 2 и 4, задача №15 (тест) — матрица Якоби',
      questionLatex: `<p>Для векторной функции $$f(x;\\,y;\\,z) = \\begin{pmatrix}x^2 y + yz \\\\ xz + y^2 z\\end{pmatrix}$$ найди матрицу производных $Df(\\vec{a})$ в точке $\\vec{a} = (1;\\,2;\\,3)$.</p>`,
      solutionHtml: `
<p>Обозначим $f_1 = x^2 y + yz$, $f_2 = xz + y^2 z$.</p>
<p><strong>Шаг 1.</strong> Частные производные $f_1$:</p>
<p>$$\\frac{\\partial f_1}{\\partial x} = 2 x y,\\quad \\frac{\\partial f_1}{\\partial y} = x^2 + z,\\quad \\frac{\\partial f_1}{\\partial z} = y.$$</p>
<p><strong>Шаг 2.</strong> Частные производные $f_2$:</p>
<p>$$\\frac{\\partial f_2}{\\partial x} = z,\\quad \\frac{\\partial f_2}{\\partial y} = 2 y z,\\quad \\frac{\\partial f_2}{\\partial z} = x + y^2.$$</p>
<p><strong>Шаг 3.</strong> Подставим $(x,\\,y,\\,z) = (1,\\,2,\\,3)$:</p>
<ul>
  <li>$\\partial_x f_1 = 2\\cdot 1\\cdot 2 = 4$;</li>
  <li>$\\partial_y f_1 = 1 + 3 = 4$;</li>
  <li>$\\partial_z f_1 = 2$;</li>
  <li>$\\partial_x f_2 = 3$;</li>
  <li>$\\partial_y f_2 = 2\\cdot 2\\cdot 3 = 12$;</li>
  <li>$\\partial_z f_2 = 1 + 4 = 5$.</li>
</ul>
<p><strong>Шаг 4.</strong> Матрица Якоби:</p>
<p>$$Df(1,\\,2,\\,3) = \\begin{pmatrix} 4 & 4 & 2 \\\\ 3 & 12 & 5 \\end{pmatrix}.$$</p>
<hr>
<p><strong>Ответ:</strong> $Df(1,\\,2,\\,3) = \\begin{pmatrix} 4 & 4 & 2 \\\\ 3 & 12 & 5 \\end{pmatrix}$.</p>
`,
    },
  ];
})();
