/**
 * РешуМИА — банк задач для типов 9, 10, 11, 12.
 *
 *   9  — определённый интеграл (тригонометрия, симметрия, кусочные функции, сумма Римана)
 *  10  — производная интеграла с переменным верхним пределом (формула Лейбница)
 *  11  — уравнение плоскости, нормаль, расстояние, проекция, угол между плоскостями
 *  12  — подпространство, базис, размерность, Грам–Шмидт, пересечение
 */
(function () {
  if (!window.TASK_BANK) return;
  const T = window.TASK_BANK;

  // ============================================================
  // ТИП 9 — Определённый интеграл
  // ============================================================
  T[9].tasks = [
    {
      id: 'exam2025-demo-q9',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `
        <p>Вычисли определённый интеграл $\\displaystyle\\int_{-\\pi}^{\\pi} \\sin^2(x)\\,dx$.</p>
        <p><em>Указание:</em> воспользуйся тригонометрическим тождеством $\\cos(2x) = 1 - 2\\sin^2(x).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Понижение степени.</strong> Из $\\cos(2x) = 1 - 2\\sin^2 x$ получаем
        $$\\sin^2 x = \\frac{1 - \\cos(2x)}{2}.$$</p>
        <p><strong>Шаг 2. Подставляем в интеграл.</strong></p>
        <p>$$\\int_{-\\pi}^{\\pi} \\sin^2 x\\,dx = \\int_{-\\pi}^{\\pi} \\frac{1 - \\cos(2x)}{2}\\,dx = \\frac{1}{2}\\int_{-\\pi}^{\\pi}\\,dx - \\frac{1}{2}\\int_{-\\pi}^{\\pi}\\cos(2x)\\,dx.$$</p>
        <p><strong>Шаг 3. Считаем по слагаемым.</strong></p>
        <ul>
          <li>$\\displaystyle\\frac{1}{2}\\int_{-\\pi}^{\\pi}dx = \\frac{1}{2}\\cdot 2\\pi = \\pi.$</li>
          <li>$\\displaystyle\\frac{1}{2}\\int_{-\\pi}^{\\pi}\\cos(2x)\\,dx = \\frac{1}{2}\\cdot\\frac{\\sin(2x)}{2}\\Big|_{-\\pi}^{\\pi} = \\frac{1}{4}(\\sin(2\\pi)-\\sin(-2\\pi)) = 0.$</li>
        </ul>
        <p><strong>Шаг 4. Альтернативный способ — через симметрию.</strong> Функция $\\sin^2 x$ чётная, значит
        $$\\int_{-\\pi}^{\\pi}\\sin^2 x\\,dx = 2\\int_0^{\\pi}\\sin^2 x\\,dx = 2\\cdot\\frac{\\pi}{2} = \\pi.$$</p>
        <p><strong>Ответ:</strong> $\\pi.$</p>
      `
    },
    {
      id: 'exam2025-v1-q9',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `
        <p>Вычисли определённый интеграл $\\displaystyle\\int_{-\\pi}^{\\pi}\\!\\left(\\sin^3(2x) + \\cos^2\\!\\left(\\dfrac{x}{2}\\right)\\right)\\,dx.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Используем симметрию для первого слагаемого.</strong></p>
        <p>Функция $\\sin^3(2x)$ нечётная: $\\sin^3(-2x) = -\\sin^3(2x)$. Отрезок $[-\\pi,\\pi]$ симметричен, поэтому
        $$\\int_{-\\pi}^{\\pi}\\sin^3(2x)\\,dx = 0.$$</p>
        <p><strong>Шаг 2. Понижение степени для второго слагаемого.</strong></p>
        <p>$$\\cos^2\\!\\left(\\frac{x}{2}\\right) = \\frac{1 + \\cos x}{2}.$$</p>
        <p><strong>Шаг 3. Считаем оставшийся интеграл.</strong></p>
        <p>$$\\int_{-\\pi}^{\\pi}\\frac{1 + \\cos x}{2}\\,dx = \\frac{1}{2}\\Big[x + \\sin x\\Big]_{-\\pi}^{\\pi} = \\frac{1}{2}\\big((\\pi + 0) - (-\\pi + 0)\\big) = \\frac{1}{2}\\cdot 2\\pi = \\pi.$$</p>
        <p><strong>Ответ:</strong> $\\pi.$</p>
      `
    },
    {
      id: 'exam2025-v2-q9',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `
        <p>Вычисли определённый интеграл $\\displaystyle\\int_{-\\pi/2}^{\\pi/2}\\!\\left(\\sin^3\\!\\left(\\dfrac{x}{2}\\right) + \\cos^2(2x)\\right)\\,dx.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Симметрия для первого слагаемого.</strong></p>
        <p>$\\sin^3(x/2)$ — нечётная функция (нечётная композиция нечётных), отрезок $[-\\pi/2,\\pi/2]$ симметричен, поэтому
        $$\\int_{-\\pi/2}^{\\pi/2}\\sin^3(x/2)\\,dx = 0.$$</p>
        <p><strong>Шаг 2. Понижение степени для второго слагаемого.</strong></p>
        <p>$$\\cos^2(2x) = \\frac{1 + \\cos(4x)}{2}.$$</p>
        <p><strong>Шаг 3. Интегрируем.</strong></p>
        <p>$$\\int_{-\\pi/2}^{\\pi/2}\\frac{1+\\cos(4x)}{2}\\,dx = \\frac{1}{2}\\Big[x + \\frac{\\sin(4x)}{4}\\Big]_{-\\pi/2}^{\\pi/2}.$$</p>
        <p>В обеих границах $\\sin(4\\cdot(\\pm\\pi/2)) = \\sin(\\pm 2\\pi) = 0$, поэтому
        $$= \\frac{1}{2}\\Big(\\frac{\\pi}{2} - \\Big(-\\frac{\\pi}{2}\\Big)\\Big) = \\frac{1}{2}\\cdot\\pi = \\frac{\\pi}{2}.$$</p>
        <p><strong>Ответ:</strong> $\\dfrac{\\pi}{2}.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q1',
      source: 'Демо-вариант КР №3, 2024–2025, задача №1 (тест)',
      questionLatex: `
        <p>Найди значение $\\displaystyle\\int_0^{\\pi}\\sin(2x)\\,dx.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Первообразная.</strong> $\\displaystyle\\int\\sin(2x)\\,dx = -\\frac{\\cos(2x)}{2} + C.$</p>
        <p><strong>Шаг 2. Подставляем пределы.</strong></p>
        <p>$$\\int_0^{\\pi}\\sin(2x)\\,dx = -\\frac{\\cos(2x)}{2}\\Big|_0^{\\pi} = -\\frac{\\cos(2\\pi)}{2} + \\frac{\\cos 0}{2} = -\\frac{1}{2} + \\frac{1}{2} = 0.$$</p>
        <p><strong>Ответ:</strong> $0.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q9',
      source: 'Демо-вариант КР №3, 2024–2025, задача №9 (тест)',
      questionLatex: `
        <p>Найди значение $\\displaystyle\\int_{-1}^{1}(x+1)\\,f(x)\\,dx,$ если $f(x)$ — чётная функция и $\\displaystyle\\int_0^1 f(x)\\,dx = 2.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Раскроем скобки.</strong></p>
        <p>$$\\int_{-1}^{1}(x+1)f(x)\\,dx = \\int_{-1}^{1} x\\,f(x)\\,dx + \\int_{-1}^{1} f(x)\\,dx.$$</p>
        <p><strong>Шаг 2. Первое слагаемое — нечётное.</strong></p>
        <p>$x$ — нечётная, $f$ — чётная, значит произведение $x\\,f(x)$ — нечётное. Интеграл по симметричному отрезку $[-1,1]$ равен нулю:
        $$\\int_{-1}^{1} x\\,f(x)\\,dx = 0.$$</p>
        <p><strong>Шаг 3. Второе слагаемое — чётное.</strong></p>
        <p>$$\\int_{-1}^{1} f(x)\\,dx = 2\\int_0^{1}f(x)\\,dx = 2\\cdot 2 = 4.$$</p>
        <p><strong>Шаг 4. Складываем.</strong> $0 + 4 = 4.$</p>
        <p><strong>Ответ:</strong> $4.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q14',
      source: 'Демо-вариант КР №3, 2024–2025, задача №14 (тест)',
      questionLatex: `
        <p>Найди значение $\\displaystyle\\int_{-\\pi/2}^{\\pi/2}\\!\\left(\\sin^2(x) + (x+1)\\cos^2(x)\\right)\\,dx.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Раскроем второе слагаемое.</strong></p>
        <p>$(x+1)\\cos^2 x = x\\cos^2 x + \\cos^2 x.$ Тогда подынтегральная функция:
        $$\\sin^2 x + x\\cos^2 x + \\cos^2 x = \\underbrace{(\\sin^2 x + \\cos^2 x)}_{=1} + x\\cos^2 x = 1 + x\\cos^2 x.$$</p>
        <p><strong>Шаг 2. Слагаемое $x\\cos^2 x$ — нечётное.</strong></p>
        <p>$x$ — нечётная, $\\cos^2 x$ — чётная, произведение — нечётное. Интеграл по $[-\\pi/2, \\pi/2]$ равен нулю:
        $$\\int_{-\\pi/2}^{\\pi/2} x\\cos^2 x\\,dx = 0.$$</p>
        <p><strong>Шаг 3. Считаем константу.</strong></p>
        <p>$$\\int_{-\\pi/2}^{\\pi/2} 1\\,dx = \\pi.$$</p>
        <p><strong>Ответ:</strong> $\\pi.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q8',
      source: 'Демо-вариант КР №3, 2024–2025, задача №8 (тест) — сумма Римана',
      questionLatex: `
        <p>К чему стремится интегральная сумма
        $$\\sum_{i=1}^{n}\\sin\\!\\left(\\frac{\\pi i}{n}\\right)\\cdot\\frac{\\pi^2 i}{n^2}$$
        при $n \\to +\\infty$? Запиши предел в виде определённого интеграла.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Угадываем разбиение.</strong></p>
        <p>Возьмём отрезок $[0,\\pi]$ и равномерное разбиение точками $x_i = \\dfrac{\\pi i}{n}$, $i = 1,\\ldots,n$. Тогда $\\Delta x = \\dfrac{\\pi}{n}.$</p>
        <p><strong>Шаг 2. Преобразуем общий член.</strong></p>
        <p>$$\\sin\\!\\left(\\frac{\\pi i}{n}\\right)\\cdot\\frac{\\pi^2 i}{n^2} = \\sin(x_i)\\cdot \\underbrace{\\frac{\\pi i}{n}}_{=\\,x_i}\\cdot\\underbrace{\\frac{\\pi}{n}}_{=\\,\\Delta x} = x_i\\,\\sin(x_i)\\cdot\\Delta x.$$</p>
        <p><strong>Шаг 3. Узнаём интегральную сумму.</strong></p>
        <p>$$\\sum_{i=1}^{n} x_i\\,\\sin(x_i)\\cdot\\Delta x \\xrightarrow[n\\to\\infty]{} \\int_0^{\\pi} x\\,\\sin x\\,dx.$$</p>
        <p><strong>Шаг 4. (Бонус) Считаем сам интеграл по частям.</strong> Положим $u = x$, $dv = \\sin x\\,dx$, тогда $du = dx$, $v = -\\cos x:$
        $$\\int_0^{\\pi} x\\sin x\\,dx = \\Big[-x\\cos x\\Big]_0^{\\pi} + \\int_0^{\\pi}\\cos x\\,dx = (-\\pi\\cdot(-1) - 0) + \\big[\\sin x\\big]_0^{\\pi} = \\pi + 0 = \\pi.$$</p>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_0^{\\pi} x\\sin x\\,dx = \\pi.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q10',
      source: 'Демо-вариант КР №3, 2024–2025, задача №10 (тест) — кусочная функция',
      questionLatex: `
        <p>Рассмотрим функцию
        $$f(x) = \\begin{cases} 3x^2, & 0 \\le x \\le 1, \\\\ 3 - 3(x-1)^2, & 1 < x \\le 2. \\end{cases}$$
        Найди $\\displaystyle\\int_0^2 f(x)\\,dx.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Разобьём интеграл по точке стыка $x=1.$</strong></p>
        <p>$$\\int_0^2 f(x)\\,dx = \\int_0^1 3x^2\\,dx + \\int_1^2\\bigl(3 - 3(x-1)^2\\bigr)\\,dx.$$</p>
        <p><strong>Шаг 2. Первый интеграл.</strong></p>
        <p>$$\\int_0^1 3x^2\\,dx = \\Big[x^3\\Big]_0^1 = 1.$$</p>
        <p><strong>Шаг 3. Второй интеграл.</strong> Первообразная: $3x - (x-1)^3.$</p>
        <p>$$\\int_1^2\\bigl(3 - 3(x-1)^2\\bigr)\\,dx = \\Big[3x - (x-1)^3\\Big]_1^2 = (6 - 1) - (3 - 0) = 5 - 3 = 2.$$</p>
        <p><strong>Шаг 4. Суммируем.</strong> $1 + 2 = 3.$</p>
        <p><strong>Ответ:</strong> $3.$</p>
      `
    }
  ];

  // ============================================================
  // ТИП 10 — Производная интеграла с переменным верхним пределом
  // ============================================================
  T[10].tasks = [
    {
      id: 'exam2025-demo-q10',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `
        <p>Дана функция $g(x) = \\displaystyle\\int_{-\\pi}^{x^2}\\frac{t^2}{2 + t^2}\\,dt.$ Найди $g'(2).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Формула Лейбница.</strong> Если $\\displaystyle g(x) = \\int_{a}^{\\varphi(x)} h(t)\\,dt,$ то
        $$g'(x) = h(\\varphi(x))\\cdot\\varphi'(x).$$</p>
        <p>Здесь $h(t) = \\dfrac{t^2}{2+t^2},$ $\\varphi(x) = x^2,$ $\\varphi'(x) = 2x.$</p>
        <p><strong>Шаг 2. Подставляем $\\varphi(x) = x^2$ вместо $t.$</strong></p>
        <p>$$h(\\varphi(x)) = \\frac{(x^2)^2}{2 + (x^2)^2} = \\frac{x^4}{2 + x^4}.$$</p>
        <p><strong>Шаг 3. Умножаем на $\\varphi'(x).$</strong></p>
        <p>$$g'(x) = \\frac{x^4}{2 + x^4}\\cdot 2x = \\frac{2x^5}{2 + x^4}.$$</p>
        <p><strong>Шаг 4. Подставляем $x = 2.$</strong></p>
        <p>$$g'(2) = \\frac{2\\cdot 2^5}{2 + 2^4} = \\frac{2\\cdot 32}{2 + 16} = \\frac{64}{18} = \\frac{32}{9}.$$</p>
        <p><strong>Ответ:</strong> $g'(2) = \\dfrac{32}{9}.$</p>
      `
    },
    {
      id: 'exam2025-v1-q10',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `
        <p>Дана функция $g(x) = \\displaystyle\\int_{-e}^{\\ln x}\\frac{e^{-t}}{1 + e^{2t}}\\,dt.$ Найди $g'(2).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Формула Лейбница.</strong> При $\\varphi(x) = \\ln x,$ $\\varphi'(x) = \\dfrac{1}{x}:$
        $$g'(x) = \\frac{e^{-\\ln x}}{1 + e^{2\\ln x}}\\cdot\\frac{1}{x}.$$</p>
        <p><strong>Шаг 2. Упрощаем экспоненты.</strong></p>
        <ul>
          <li>$e^{-\\ln x} = \\dfrac{1}{x}.$</li>
          <li>$e^{2\\ln x} = (e^{\\ln x})^2 = x^2.$</li>
        </ul>
        <p><strong>Шаг 3. Подставляем.</strong></p>
        <p>$$g'(x) = \\frac{1/x}{1 + x^2}\\cdot\\frac{1}{x} = \\frac{1}{x^2(1 + x^2)}.$$</p>
        <p><strong>Шаг 4. Считаем в точке $x = 2.$</strong></p>
        <p>$$g'(2) = \\frac{1}{4\\cdot 5} = \\frac{1}{20}.$$</p>
        <p><strong>Ответ:</strong> $g'(2) = \\dfrac{1}{20}.$</p>
      `
    },
    {
      id: 'exam2025-v2-q10',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `
        <p>Дана функция $g(x) = \\displaystyle\\int_{-e}^{\\ln x}\\frac{e^{2t}}{1 + e^{-t}}\\,dt.$ Найди $g'(2).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Формула Лейбница.</strong> При $\\varphi(x) = \\ln x,$ $\\varphi'(x) = \\dfrac{1}{x}:$
        $$g'(x) = \\frac{e^{2\\ln x}}{1 + e^{-\\ln x}}\\cdot\\frac{1}{x}.$$</p>
        <p><strong>Шаг 2. Упрощаем.</strong></p>
        <ul>
          <li>$e^{2\\ln x} = x^2.$</li>
          <li>$e^{-\\ln x} = \\dfrac{1}{x},$ значит $1 + e^{-\\ln x} = 1 + \\dfrac{1}{x} = \\dfrac{x+1}{x}.$</li>
        </ul>
        <p><strong>Шаг 3. Подставляем.</strong></p>
        <p>$$g'(x) = \\frac{x^2}{(x+1)/x}\\cdot\\frac{1}{x} = \\frac{x^3}{x+1}\\cdot\\frac{1}{x} = \\frac{x^2}{x+1}.$$</p>
        <p><strong>Шаг 4. Считаем в точке $x = 2.$</strong></p>
        <p>$$g'(2) = \\frac{4}{3}.$$</p>
        <p><strong>Ответ:</strong> $g'(2) = \\dfrac{4}{3}.$</p>
      `
    },
    {
      id: 'kr3-2024-demo-q12',
      source: 'Демо-вариант КР №3, 2024–2025, задача №12 (тест) — композитная',
      questionLatex: `
        <p>Рассмотрим функцию $g(x) = \\displaystyle\\int_0^{\\sqrt{x}} t\\,dt.$ Вычисли $\\displaystyle\\int_0^2 g(x)\\,dx.$</p>
        <p><em>(Сначала найди $g(x)$ явно, затем интегрируй.)</em></p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Найдём $g(x)$ явно.</strong></p>
        <p>$$g(x) = \\int_0^{\\sqrt{x}} t\\,dt = \\frac{t^2}{2}\\Big|_0^{\\sqrt{x}} = \\frac{(\\sqrt{x})^2}{2} = \\frac{x}{2}\\quad (x \\ge 0).$$</p>
        <p><strong>Шаг 2. Интегрируем $g(x)$ от $0$ до $2.$</strong></p>
        <p>$$\\int_0^2 g(x)\\,dx = \\int_0^2 \\frac{x}{2}\\,dx = \\frac{x^2}{4}\\Big|_0^2 = \\frac{4}{4} = 1.$$</p>
        <p><strong>Шаг 3. Проверка через формулу Лейбница.</strong> $g'(x) = \\sqrt{x}\\cdot\\dfrac{1}{2\\sqrt{x}} = \\dfrac{1}{2},$ значит $g(x) = \\dfrac{x}{2} + C,$ а $g(0) = 0$ даёт $C = 0$</p>
        <p><strong>Ответ:</strong> $1.$</p>
      `
    }
  ];

  // ============================================================
  // ТИП 11 — Уравнение плоскости, нормаль, расстояние, проекция, угол
  // ============================================================
  T[11].tasks = [
    {
      id: 'exam2025-demo-q11',
      source: 'Демо летнего экзамена, 2025 / КР №1, 2024–2025, вариант 1, задача №1 (с развёрнутым решением)',
      questionLatex: `
        <p>Плоскость задана параметрическим уравнением:
        $$\\pi:\\;\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix} + t_1\\begin{pmatrix}1\\\\-3\\\\1\\end{pmatrix} + t_2\\begin{pmatrix}2\\\\0\\\\5\\end{pmatrix}.$$
        Найди расстояние от точки $A(1;\\,2;\\,3)$ до этой плоскости.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормаль к плоскости.</strong> Векторное произведение направляющих векторов:
        $$\\vec n = \\begin{pmatrix}1\\\\-3\\\\1\\end{pmatrix}\\times\\begin{pmatrix}2\\\\0\\\\5\\end{pmatrix} = \\begin{pmatrix}(-3)\\cdot 5 - 1\\cdot 0\\\\ -(1\\cdot 5 - 1\\cdot 2)\\\\ 1\\cdot 0 - (-3)\\cdot 2\\end{pmatrix} = \\begin{pmatrix}-15\\\\-3\\\\6\\end{pmatrix}.$$</p>
        <p>Можно сократить на $-3$: $\\vec n = (5,\\,1,\\,-2).$</p>
        <p><strong>Шаг 2. Уравнение плоскости.</strong> Берём точку $\\vec r_0 = (1,1,1):$
        $$5(x-1) + 1(y-1) - 2(z-1) = 0\\;\\Longleftrightarrow\\; 5x + y - 2z - 4 = 0.$$</p>
        <p><strong>Шаг 3. Формула расстояния от точки до плоскости.</strong></p>
        <p>$$d(A,\\pi) = \\frac{|5\\cdot 1 + 1\\cdot 2 - 2\\cdot 3 - 4|}{\\sqrt{5^2 + 1^2 + (-2)^2}} = \\frac{|5 + 2 - 6 - 4|}{\\sqrt{30}} = \\frac{3}{\\sqrt{30}}.$$</p>
        <p><strong>Шаг 4. Упрощение.</strong> $\\dfrac{3}{\\sqrt{30}} = \\dfrac{3\\sqrt{30}}{30} = \\dfrac{\\sqrt{30}}{10}.$</p>
        <p><strong>Ответ:</strong> $d = \\dfrac{\\sqrt{30}}{10}.$</p>
      `
    },
    {
      id: 'exam2025-v1-q11',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `
        <p>Найди общее уравнение плоскости $\\pi,$ проходящей через точку $A(1;\\,1;\\,1)$ и прямую
        $$l:\\;\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}1\\\\0\\\\0\\end{pmatrix} + t\\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix}.$$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Два направляющих вектора плоскости.</strong></p>
        <p>Прямая лежит в плоскости, значит её направляющий вектор $\\vec v = (1,-1,1)$ — один из направляющих векторов $\\pi.$ Второй — вектор от точки $P_0 = (1,0,0)$ прямой до $A:$
        $$\\vec u = A - P_0 = (1-1,\\,1-0,\\,1-0) = (0,1,1).$$</p>
        <p><strong>Шаг 2. Нормаль = $\\vec v\\times\\vec u.$</strong></p>
        <p>$$\\vec n = \\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix}\\times\\begin{pmatrix}0\\\\1\\\\1\\end{pmatrix} = \\begin{pmatrix}(-1)\\cdot 1 - 1\\cdot 1\\\\ -(1\\cdot 1 - 1\\cdot 0)\\\\ 1\\cdot 1 - (-1)\\cdot 0\\end{pmatrix} = \\begin{pmatrix}-2\\\\-1\\\\1\\end{pmatrix}.$$</p>
        <p>Удобно взять противоположную: $\\vec n = (2,\\,1,\\,-1).$</p>
        <p><strong>Шаг 3. Уравнение через точку $A(1,1,1).$</strong></p>
        <p>$$2(x-1) + 1(y-1) - 1(z-1) = 0\\;\\Longleftrightarrow\\; 2x + y - z - 2 = 0.$$</p>
        <p><strong>Шаг 4. Проверка.</strong> Точка $(1,0,0)$ прямой: $2 - 0 - 0 - 2 = 0$ Произвольная точка прямой $(1+t,-t,t):$ $2(1+t) - t - t - 2 = 0$</p>
        <p><strong>Ответ:</strong> $2x + y - z - 2 = 0.$</p>
      `
    },
    {
      id: 'exam2025-v2-q11',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `
        <p>Найди общее уравнение плоскости, проходящей через три точки $A(1;\\,1;\\,1),$ $B(1;\\,-1;\\,1),$ $C(0;\\,1;\\,-1).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Два вектора в плоскости.</strong></p>
        <p>$$\\vec{AB} = B - A = (0,-2,0),\\qquad \\vec{AC} = C - A = (-1,0,-2).$$</p>
        <p><strong>Шаг 2. Нормаль = $\\vec{AB}\\times\\vec{AC}.$</strong></p>
        <p>$$\\vec n = \\begin{pmatrix}0\\\\-2\\\\0\\end{pmatrix}\\times\\begin{pmatrix}-1\\\\0\\\\-2\\end{pmatrix} = \\begin{pmatrix}(-2)\\cdot(-2) - 0\\cdot 0\\\\ -(0\\cdot(-2) - 0\\cdot(-1))\\\\ 0\\cdot 0 - (-2)\\cdot(-1)\\end{pmatrix} = \\begin{pmatrix}4\\\\0\\\\-2\\end{pmatrix}.$$</p>
        <p>Сокращаем на $2:$ $\\vec n = (2,\\,0,\\,-1).$</p>
        <p><strong>Шаг 3. Уравнение через $A(1,1,1).$</strong></p>
        <p>$$2(x-1) + 0\\cdot(y-1) - 1\\cdot(z-1) = 0\\;\\Longleftrightarrow\\; 2x - z - 1 = 0.$$</p>
        <p><strong>Шаг 4. Проверка.</strong> $A:$ $2 - 1 - 1 = 0$; $B:$ $2 - 1 - 1 = 0$; $C:$ $0 + 1 - 1 = 0$</p>
        <p><strong>Ответ:</strong> $2x - z - 1 = 0.$</p>
      `
    },
    {
      id: 'contest2-2024-set2-q6',
      source: 'Контест 2, 2024–2025, набор 2, задача №6 (простая)',
      questionLatex: `
        <p>Запиши параметрическое уравнение плоскости (в виде $\\vec r = \\vec r_0 + t_1\\vec v_1 + t_2\\vec v_2$), проходящей через точку $A(1;\\,2;\\,3)$ и прямую
        $$\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}0\\\\t\\\\0\\end{pmatrix}.$$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Что есть прямая?</strong></p>
        <p>Прямая $(0,t,0)$ — это ось $Oy:$ проходит через $P_0 = (0,0,0)$ с направляющим вектором $\\vec v_1 = (0,1,0).$</p>
        <p><strong>Шаг 2. Второй направляющий вектор.</strong></p>
        <p>В качестве $\\vec v_2$ берём вектор от точки прямой до $A:$
        $$\\vec v_2 = A - P_0 = (1,2,3).$$</p>
        <p><strong>Шаг 3. Сборка параметрического уравнения.</strong></p>
        <p>Удобно взять $\\vec r_0 = P_0 = (0,0,0)$ — тогда плоскость явно содержит и прямую, и точку $A:$
        $$\\vec r = \\begin{pmatrix}0\\\\0\\\\0\\end{pmatrix} + t_1\\begin{pmatrix}0\\\\1\\\\0\\end{pmatrix} + t_2\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}.$$</p>
        <p><strong>Шаг 4. Проверка.</strong> При $t_2 = 0:$ получаем точно ось $Oy$ — прямая лежит в плоскости. При $t_1 = 2,\\, t_2 = 1:$ $(1,4,3) - (0,2,0) = $ Wait, calculate: $(0,0,0) + 2(0,1,0) + 1(1,2,3) = (1,4,3),$ ну а $A = (1,2,3)$ выходит при $t_1 = 0,\\,t_2 = 1$</p>
        <p><strong>Ответ:</strong> $\\vec r = \\begin{pmatrix}0\\\\0\\\\0\\end{pmatrix} + t_1\\begin{pmatrix}0\\\\1\\\\0\\end{pmatrix} + t_2\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}.$</p>
      `
    },
    {
      id: 'contest2-2024-set2-q7',
      source: 'Контест 2, 2024–2025, набор 2, задача №7 (простая) / Демо-вариант КР №1, 2024–2025, задача №2 (простая)',
      questionLatex: `
        <p>Найди расстояние от точки $A(1;\\,2;\\,3)$ до плоскости, заданной уравнением $2x - y = 2z + 5.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Приведём уравнение к виду $Ax + By + Cz + D = 0.$</strong></p>
        <p>$$2x - y - 2z - 5 = 0,\\quad \\vec n = (2,\\,-1,\\,-2),\\quad |\\vec n| = \\sqrt{4+1+4} = 3.$$</p>
        <p><strong>Шаг 2. Формула расстояния.</strong></p>
        <p>$$d(A,\\pi) = \\frac{|2\\cdot 1 - 1\\cdot 2 - 2\\cdot 3 - 5|}{3} = \\frac{|2 - 2 - 6 - 5|}{3} = \\frac{|-11|}{3} = \\frac{11}{3}.$$</p>
        <p><strong>Ответ:</strong> $d = \\dfrac{11}{3}.$</p>
      `
    },
    {
      id: 'contest2-2024-set2-q10',
      source: 'Контест 2, 2024–2025, набор 2, задача №10 (простая)',
      questionLatex: `
        <p>Найди расстояние в $\\mathbb{R}^3$ от точки $\\begin{pmatrix}1\\\\4\\\\0\\end{pmatrix}$ до плоскости, которая проходит через точку $\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}$ и перпендикулярна вектору $\\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix}.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Уравнение плоскости через точку и нормаль.</strong></p>
        <p>$\\vec n = (1,-1,2),$ точка $P_0 = (1,1,1).$ Уравнение:
        $$1(x-1) - 1(y-1) + 2(z-1) = 0\\;\\Longleftrightarrow\\; x - y + 2z - 2 = 0.$$</p>
        <p><strong>Шаг 2. Формула расстояния от $A = (1,4,0).$</strong></p>
        <p>$$d = \\frac{|1\\cdot 1 - 1\\cdot 4 + 2\\cdot 0 - 2|}{\\sqrt{1+1+4}} = \\frac{|1 - 4 + 0 - 2|}{\\sqrt 6} = \\frac{5}{\\sqrt 6}.$$</p>
        <p><strong>Шаг 3. Упрощение.</strong> $\\dfrac{5}{\\sqrt 6} = \\dfrac{5\\sqrt 6}{6}.$</p>
        <p><strong>Ответ:</strong> $d = \\dfrac{5\\sqrt{6}}{6}.$</p>
      `
    },
    {
      id: 'contest2-2024-set2-q2',
      source: 'Контест 2, 2024–2025, набор 2, задача №2 (с развёрнутым решением)',
      questionLatex: `
        <p>Плоскость задана параметрическим уравнением
        $$\\pi:\\;\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix} + t_1\\begin{pmatrix}1\\\\0\\\\-1\\end{pmatrix} + t_2\\begin{pmatrix}0\\\\1\\\\2\\end{pmatrix}.$$
        Найди её уравнение в виде $Ax + By + Cz + D = 0$ и определи, с какой стороны (сверху или снизу относительно оси $Oz$) от неё находится точка $P(2;\\,3;\\,4).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормаль = векторное произведение направляющих.</strong></p>
        <p>$$\\vec n = \\begin{pmatrix}1\\\\0\\\\-1\\end{pmatrix}\\times\\begin{pmatrix}0\\\\1\\\\2\\end{pmatrix} = \\begin{pmatrix}0\\cdot 2 - (-1)\\cdot 1\\\\ -(1\\cdot 2 - (-1)\\cdot 0)\\\\ 1\\cdot 1 - 0\\cdot 0\\end{pmatrix} = \\begin{pmatrix}1\\\\-2\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 2. Общее уравнение плоскости.</strong> Через $\\vec r_0 = (1,1,1):$
        $$1(x-1) - 2(y-1) + 1(z-1) = 0\\;\\Longleftrightarrow\\; x - 2y + z = 0.$$</p>
        <p>То есть $A=1,$ $B=-2,$ $C=1,$ $D=0.$</p>
        <p><strong>Шаг 3. Подставим $P(2,3,4).$</strong></p>
        <p>$$F(P) = 2 - 2\\cdot 3 + 4 = 2 - 6 + 4 = 0.$$</p>
        <p>Точка $P$ <strong>лежит на плоскости</strong>: ни сверху, ни снизу. Действительно, $P - \\vec r_0 = (1,2,3) = 1\\cdot(1,0,-1) + 2\\cdot(0,1,2),$ то есть $P$ получается из параметрического представления при $t_1 = 1,\\,t_2 = 2.$</p>
        <p><strong>Ответ:</strong> уравнение плоскости $x - 2y + z = 0;$ точка $P(2,3,4)$ лежит на самой плоскости (расстояние от неё равно нулю).</p>
      `
    },
    {
      id: 'contest2-2024-set2-q3',
      source: 'Контест 2, 2024–2025, набор 2, задача №3 (с развёрнутым решением)',
      questionLatex: `
        <p>Найди уравнение плоскости $\\pi,$ которая проходит через три точки $A(1;\\,-1;\\,0),$ $B(5;\\,3;\\,-1)$ и $C(-2;\\,2;\\,-3).$ Запиши уравнение через сдвиг и нормаль (в виде $\\langle\\vec r - \\vec r_0,\\,\\vec n\\rangle = 0$).</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Два вектора в плоскости.</strong></p>
        <p>$$\\vec{AB} = (4,\\,4,\\,-1),\\qquad \\vec{AC} = (-3,\\,3,\\,-3).$$</p>
        <p><strong>Шаг 2. Нормаль = $\\vec{AB}\\times\\vec{AC}.$</strong></p>
        <p>$$\\vec n = \\begin{pmatrix}4\\\\4\\\\-1\\end{pmatrix}\\times\\begin{pmatrix}-3\\\\3\\\\-3\\end{pmatrix} = \\begin{pmatrix}4\\cdot(-3) - (-1)\\cdot 3\\\\ -(4\\cdot(-3) - (-1)\\cdot(-3))\\\\ 4\\cdot 3 - 4\\cdot(-3)\\end{pmatrix} = \\begin{pmatrix}-9\\\\15\\\\24\\end{pmatrix}.$$</p>
        <p>Сокращаем на $3:$ $\\vec n = (-3,\\,5,\\,8).$</p>
        <p><strong>Шаг 3. Запись плоскости.</strong> Берём $\\vec r_0 = A = (1,-1,0):$
        $$\\Big\\langle \\vec r - \\begin{pmatrix}1\\\\-1\\\\0\\end{pmatrix},\\;\\begin{pmatrix}-3\\\\5\\\\8\\end{pmatrix}\\Big\\rangle = 0.$$</p>
        <p><strong>Шаг 4. Проверка.</strong> Подставим $B = (5,3,-1):$ $\\vec{AB}\\cdot\\vec n = 4\\cdot(-3) + 4\\cdot 5 + (-1)\\cdot 8 = -12 + 20 - 8 = 0$ Подставим $C:$ $\\vec{AC}\\cdot\\vec n = -3\\cdot(-3) + 3\\cdot 5 + (-3)\\cdot 8 = 9 + 15 - 24 = 0$</p>
        <p><strong>Ответ:</strong> $\\Big\\langle \\vec r - (1,-1,0)^{\\!\\top},\\,(-3,5,8)^{\\!\\top}\\Big\\rangle = 0,$ или равносильно $-3x + 5y + 8z + 8 = 0.$</p>
      `
    },
    {
      id: 'kr1-2024-demo-q4',
      source: 'Демо-вариант КР №1, 2024–2025, задача №4 (простая)',
      questionLatex: `
        <p>Плоскость задана параметрическим уравнением:
        $$\\pi:\\;\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}2\\\\-3\\\\1\\end{pmatrix} + t_1\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix} + t_2\\begin{pmatrix}0\\\\3\\\\4\\end{pmatrix}.$$
        Найди её уравнение в виде $Ax + By + Cz + D = 0.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормаль.</strong></p>
        <p>$$\\vec n = \\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}\\times\\begin{pmatrix}0\\\\3\\\\4\\end{pmatrix} = \\begin{pmatrix}1\\cdot 4 - 1\\cdot 3\\\\ -(1\\cdot 4 - 1\\cdot 0)\\\\ 1\\cdot 3 - 1\\cdot 0\\end{pmatrix} = \\begin{pmatrix}1\\\\-4\\\\3\\end{pmatrix}.$$</p>
        <p><strong>Шаг 2. Через точку $\\vec r_0 = (2,-3,1).$</strong></p>
        <p>$$1(x-2) - 4(y+3) + 3(z-1) = 0\\;\\Longleftrightarrow\\; x - 4y + 3z - 17 = 0.$$</p>
        <p><strong>Шаг 3. Проверка.</strong> $\\vec r_0 = (2,-3,1):$ $2 + 12 + 3 - 17 = 0$</p>
        <p><strong>Ответ:</strong> $x - 4y + 3z - 17 = 0.$</p>
      `
    },
    {
      id: 'kr1-2024-v2-q1',
      source: 'КР №1, 2024–2025, вариант 2, задача №1 (с развёрнутым решением)',
      questionLatex: `
        <p>Плоскость задана параметрическим уравнением:
        $$\\pi:\\;\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}2\\\\-3\\\\1\\end{pmatrix} + t_1\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix} + t_2\\begin{pmatrix}0\\\\3\\\\4\\end{pmatrix}.$$
        Найди расстояние от точки $A(1;\\,2;\\,3)$ до этой плоскости.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормаль и общее уравнение плоскости.</strong> (см. также демо КР №1, задача 4)</p>
        <p>$$\\vec n = (1,1,1)\\times(0,3,4) = (1,\\,-4,\\,3),\\quad |\\vec n| = \\sqrt{1+16+9} = \\sqrt{26}.$$</p>
        <p>Через $\\vec r_0 = (2,-3,1):$ $x - 4y + 3z - 17 = 0.$</p>
        <p><strong>Шаг 2. Расстояние от $A(1,2,3).$</strong></p>
        <p>$$d = \\frac{|1\\cdot 1 - 4\\cdot 2 + 3\\cdot 3 - 17|}{\\sqrt{26}} = \\frac{|1 - 8 + 9 - 17|}{\\sqrt{26}} = \\frac{15}{\\sqrt{26}}.$$</p>
        <p><strong>Шаг 3. Упрощение.</strong> $\\dfrac{15}{\\sqrt{26}} = \\dfrac{15\\sqrt{26}}{26}.$</p>
        <p><strong>Ответ:</strong> $d = \\dfrac{15\\sqrt{26}}{26}.$</p>
      `
    },
    {
      id: 'kr1-2024-v1-q4',
      source: 'КР №1, 2024–2025, вариант 1, задача №4 (простая)',
      questionLatex: `
        <p>Найди косинус угла между плоскостями $2x + y + z = 5$ и $-3x + 4y + 2z = 1.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормали.</strong> $\\vec n_1 = (2,1,1),$ $\\vec n_2 = (-3,4,2).$</p>
        <p><strong>Шаг 2. Скалярное произведение.</strong></p>
        <p>$$\\vec n_1\\cdot\\vec n_2 = 2\\cdot(-3) + 1\\cdot 4 + 1\\cdot 2 = -6 + 4 + 2 = 0.$$</p>
        <p><strong>Шаг 3. Косинус угла.</strong></p>
        <p>$$\\cos\\theta = \\frac{\\vec n_1\\cdot\\vec n_2}{|\\vec n_1|\\,|\\vec n_2|} = 0.$$</p>
        <p>Плоскости перпендикулярны.</p>
        <p><strong>Ответ:</strong> $\\cos\\theta = 0$ (плоскости перпендикулярны).</p>
      `
    },
    {
      id: 'kr1-2024-v2-q4',
      source: 'КР №1, 2024–2025, вариант 2, задача №4 (простая)',
      questionLatex: `
        <p>Найди косинус угла между плоскостями $4x - y + 2z = 1$ и $16x - 4y + 4z = 8.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормали.</strong> $\\vec n_1 = (4,-1,2),$ $\\vec n_2 = (16,-4,4).$</p>
        <p><strong>Шаг 2. Скалярное произведение.</strong></p>
        <p>$$\\vec n_1\\cdot\\vec n_2 = 4\\cdot 16 + (-1)\\cdot(-4) + 2\\cdot 4 = 64 + 4 + 8 = 76.$$</p>
        <p><strong>Шаг 3. Длины нормалей.</strong></p>
        <p>$$|\\vec n_1| = \\sqrt{16+1+4} = \\sqrt{21},\\quad |\\vec n_2| = \\sqrt{256+16+16} = \\sqrt{288} = 12\\sqrt{2}.$$</p>
        <p><strong>Шаг 4. Косинус.</strong></p>
        <p>$$\\cos\\theta = \\frac{76}{\\sqrt{21}\\cdot 12\\sqrt{2}} = \\frac{76}{12\\sqrt{42}} = \\frac{19}{3\\sqrt{42}} = \\frac{19\\sqrt{42}}{126}.$$</p>
        <p><strong>Ответ:</strong> $\\cos\\theta = \\dfrac{19\\sqrt{42}}{126}.$</p>
      `
    },
    {
      id: 'kr1-2024-v1-q3',
      source: 'КР №1, 2024–2025, вариант 1, задача №3 (с развёрнутым решением)',
      questionLatex: `
        <p>Найди проекцию точки $A(1;\\,2;\\,3)$ на плоскость, заданную уравнением $2x - y = -z + 5.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Приведём плоскость к виду $Ax + By + Cz + D = 0.$</strong></p>
        <p>$$2x - y + z - 5 = 0,\\quad \\vec n = (2,\\,-1,\\,1).$$</p>
        <p><strong>Шаг 2. Параметрически опускаем перпендикуляр из $A.$</strong></p>
        <p>$$\\vec r(t) = (1,2,3) + t(2,-1,1) = (1+2t,\\;2-t,\\;3+t).$$</p>
        <p><strong>Шаг 3. Подставим в уравнение плоскости.</strong></p>
        <p>$$2(1+2t) - (2-t) + (3+t) - 5 = 0\\;\\Longleftrightarrow\\; 2 + 4t - 2 + t + 3 + t - 5 = 0\\;\\Longleftrightarrow\\; 6t - 2 = 0,$$
        откуда $t = \\dfrac{1}{3}.$</p>
        <p><strong>Шаг 4. Координаты проекции.</strong></p>
        <p>$$A' = \\Big(1 + \\tfrac{2}{3},\\; 2 - \\tfrac{1}{3},\\; 3 + \\tfrac{1}{3}\\Big) = \\Big(\\tfrac{5}{3},\\, \\tfrac{5}{3},\\, \\tfrac{10}{3}\\Big).$$</p>
        <p><strong>Шаг 5. Проверка.</strong> $2\\cdot\\tfrac{5}{3} - \\tfrac{5}{3} + \\tfrac{10}{3} - 5 = \\tfrac{10-5+10}{3} - 5 = 5 - 5 = 0$</p>
        <p><strong>Ответ:</strong> $A' = \\Big(\\dfrac{5}{3},\\,\\dfrac{5}{3},\\,\\dfrac{10}{3}\\Big).$</p>
      `
    },
    {
      id: 'kr1-2024-v2-q3',
      source: 'КР №1, 2024–2025, вариант 2, задача №3 (с развёрнутым решением)',
      questionLatex: `
        <p>Найди проекцию точки $A(3;\\,0;\\,-2)$ на плоскость, заданную уравнением $x + 2y + 3z = 5.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Нормаль и параметрическая прямая через $A.$</strong></p>
        <p>$\\vec n = (1,2,3),$ значит $\\vec r(t) = (3 + t,\\; 2t,\\; -2 + 3t).$</p>
        <p><strong>Шаг 2. Подставим в плоскость $x + 2y + 3z = 5.$</strong></p>
        <p>$$(3 + t) + 2\\cdot 2t + 3\\cdot(-2 + 3t) = 5$$
        $$3 + t + 4t - 6 + 9t = 5$$
        $$14t - 3 = 5\\;\\Longleftrightarrow\\; t = \\frac{8}{14} = \\frac{4}{7}.$$</p>
        <p><strong>Шаг 3. Координаты проекции.</strong></p>
        <p>$$A' = \\Big(3 + \\tfrac{4}{7},\\; 2\\cdot\\tfrac{4}{7},\\; -2 + 3\\cdot\\tfrac{4}{7}\\Big) = \\Big(\\tfrac{25}{7},\\,\\tfrac{8}{7},\\,-\\tfrac{2}{7}\\Big).$$</p>
        <p><strong>Шаг 4. Проверка.</strong> $\\tfrac{25}{7} + 2\\cdot\\tfrac{8}{7} + 3\\cdot(-\\tfrac{2}{7}) = \\tfrac{25 + 16 - 6}{7} = \\tfrac{35}{7} = 5$</p>
        <p><strong>Ответ:</strong> $A' = \\Big(\\dfrac{25}{7},\\,\\dfrac{8}{7},\\,-\\dfrac{2}{7}\\Big).$</p>
      `
    }
  ];

  // ============================================================
  // ТИП 12 — Подпространство, базис, размерность, Грам–Шмидт, пересечение
  // ============================================================
  T[12].tasks = [
    {
      id: 'exam2025-demo-q12',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `
        <p>Рассмотрим подпространство $\\mathbb{R}^4,$ которое содержит все векторы, одновременно перпендикулярные векторам $\\vec a$ и $\\vec b:$
        $$\\vec a = \\begin{pmatrix}1\\\\0\\\\1\\\\0\\end{pmatrix},\\quad \\vec b = \\begin{pmatrix}0\\\\0\\\\2\\\\1\\end{pmatrix}.$$
        Укажи размерность этого подпространства и найди в нём ортогональный базис.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Условия ортогональности.</strong> $\\vec x = (x_1,x_2,x_3,x_4)$ должен удовлетворять:
        $$\\langle\\vec x,\\vec a\\rangle = x_1 + x_3 = 0,\\qquad \\langle\\vec x,\\vec b\\rangle = 2x_3 + x_4 = 0.$$</p>
        <p><strong>Шаг 2. Решаем СЛАУ.</strong> Из первого: $x_3 = -x_1.$ Из второго: $x_4 = -2x_3 = 2x_1.$ Свободные переменные: $x_1$ и $x_2.$</p>
        <p>$$\\vec x = \\begin{pmatrix}x_1\\\\x_2\\\\-x_1\\\\2x_1\\end{pmatrix} = x_1\\underbrace{\\begin{pmatrix}1\\\\0\\\\-1\\\\2\\end{pmatrix}}_{\\vec u_1} + x_2\\underbrace{\\begin{pmatrix}0\\\\1\\\\0\\\\0\\end{pmatrix}}_{\\vec u_2}.$$</p>
        <p><strong>Шаг 3. Размерность.</strong> Свободных переменных две, значит $\\dim V = 2.$</p>
        <p><strong>Шаг 4. Проверка ортогональности базиса.</strong></p>
        <p>$$\\langle\\vec u_1,\\vec u_2\\rangle = 1\\cdot 0 + 0\\cdot 1 + (-1)\\cdot 0 + 2\\cdot 0 = 0.$$</p>
        <p>Базис уже ортогонален, метод Грама–Шмидта не нужен.</p>
        <p><strong>Ответ:</strong> $\\dim V = 2;$ ортогональный базис $\\Big\\{(1,0,-1,2)^{\\!\\top},\\;(0,1,0,0)^{\\!\\top}\\Big\\}.$</p>
      `
    },
    {
      id: 'exam2025-v1-q12',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `
        <p>Подпространство в $\\mathbb{R}^5$ состоит из векторов, одновременно перпендикулярных
        $$\\vec a = \\begin{pmatrix}1\\\\1\\\\1\\\\1\\\\1\\end{pmatrix},\\quad \\vec b = \\begin{pmatrix}1\\\\0\\\\0\\\\0\\\\0\\end{pmatrix}.$$
        Найди размерность и базис этого подпространства.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Система ортогональности.</strong></p>
        <p>$$\\langle\\vec x,\\vec a\\rangle = x_1 + x_2 + x_3 + x_4 + x_5 = 0,\\qquad \\langle\\vec x,\\vec b\\rangle = x_1 = 0.$$</p>
        <p><strong>Шаг 2. Решаем.</strong> Из второго $x_1 = 0,$ тогда первое даёт $x_2 + x_3 + x_4 + x_5 = 0,$ откуда $x_2 = -x_3 - x_4 - x_5.$</p>
        <p>Свободные: $x_3,\\,x_4,\\,x_5.$</p>
        <p>$$\\vec x = \\begin{pmatrix}0\\\\-x_3-x_4-x_5\\\\x_3\\\\x_4\\\\x_5\\end{pmatrix} = x_3\\begin{pmatrix}0\\\\-1\\\\1\\\\0\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}0\\\\-1\\\\0\\\\1\\\\0\\end{pmatrix} + x_5\\begin{pmatrix}0\\\\-1\\\\0\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 3. Ответ.</strong> $\\dim V = 3.$</p>
        <p><strong>Базис:</strong> $\\Big\\{(0,-1,1,0,0)^{\\!\\top},\\,(0,-1,0,1,0)^{\\!\\top},\\,(0,-1,0,0,1)^{\\!\\top}\\Big\\}.$</p>
        <p><strong>Шаг 4. Быстрая проверка.</strong> Каждый базисный вектор имеет $x_1=0$ и сумму остальных $=0$</p>
      `
    },
    {
      id: 'exam2025-v2-q12',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `
        <p>Подпространство ортогонально векторам
        $$\\vec a = \\begin{pmatrix}1\\\\1\\\\1\\\\-1\\\\-1\\end{pmatrix},\\quad \\vec b = \\begin{pmatrix}0\\\\0\\\\1\\\\0\\\\0\\end{pmatrix}.$$
        Найди размерность и базис этого подпространства.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Система ортогональности.</strong></p>
        <p>$$\\langle\\vec x,\\vec a\\rangle = x_1 + x_2 + x_3 - x_4 - x_5 = 0,\\qquad \\langle\\vec x,\\vec b\\rangle = x_3 = 0.$$</p>
        <p><strong>Шаг 2. Решаем.</strong> Из второго $x_3 = 0;$ тогда первое: $x_1 + x_2 - x_4 - x_5 = 0,$ откуда $x_1 = -x_2 + x_4 + x_5.$ Свободные: $x_2,\\,x_4,\\,x_5.$</p>
        <p>$$\\vec x = \\begin{pmatrix}-x_2 + x_4 + x_5\\\\x_2\\\\0\\\\x_4\\\\x_5\\end{pmatrix} = x_2\\begin{pmatrix}-1\\\\1\\\\0\\\\0\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}1\\\\0\\\\0\\\\1\\\\0\\end{pmatrix} + x_5\\begin{pmatrix}1\\\\0\\\\0\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 3. Ответ.</strong> $\\dim V = 3.$</p>
        <p><strong>Базис:</strong> $\\Big\\{(-1,1,0,0,0)^{\\!\\top},\\,(1,0,0,1,0)^{\\!\\top},\\,(1,0,0,0,1)^{\\!\\top}\\Big\\}.$</p>
        <p><strong>Шаг 4. Проверка для первого базисного вектора.</strong> $\\langle(-1,1,0,0,0),\\vec a\\rangle = -1 + 1 + 0 - 0 - 0 = 0$ и $\\langle(-1,1,0,0,0),\\vec b\\rangle = 0$</p>
      `
    },
    {
      id: 'contest3-2024-q4',
      source: 'Контест 3, 2024–2025, задача №4 (простая)',
      questionLatex: `
        <p>Найди векторы $\\vec v,\\,\\vec w \\in \\mathbb{R}^3$ такие, что подпространство $x + y + z = 0$ можно задать в виде $\\mathrm{span}(\\vec v,\\,\\vec w).$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Решим уравнение.</strong> $x = -y - z.$ Свободные: $y,\\,z.$</p>
        <p>$$\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}-y-z\\\\y\\\\z\\end{pmatrix} = y\\begin{pmatrix}-1\\\\1\\\\0\\end{pmatrix} + z\\begin{pmatrix}-1\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 2. Берём базис.</strong></p>
        <p>$$\\vec v = \\begin{pmatrix}-1\\\\1\\\\0\\end{pmatrix},\\qquad \\vec w = \\begin{pmatrix}-1\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p>(Можно равноправно взять $\\vec v = (1,-1,0)^{\\!\\top},\\,\\vec w = (1,0,-1)^{\\!\\top}.$)</p>
        <p><strong>Шаг 3. Проверка.</strong> Сумма координат каждого вектора равна $0$ (значит они лежат в плоскости). Векторы не коллинеарны, так что $\\dim\\mathrm{span} = 2 = \\dim$ плоскости.</p>
        <p><strong>Ответ:</strong> $\\vec v = (-1,1,0)^{\\!\\top},$ $\\vec w = (-1,0,1)^{\\!\\top}.$</p>
      `
    },
    {
      id: 'contest3-2024-q9',
      source: 'Контест 3, 2024–2025, задача №9 (простая)',
      questionLatex: `
        <p>Найди ненулевой вектор $\\vec v \\in \\mathbb{R}^3$ такой, что
        $$\\left\\{\\vec x \\in \\mathbb{R}^3 :\\; \\vec x\\cdot\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix} = 0,\\; \\vec x\\cdot\\begin{pmatrix}-2\\\\-1\\\\1\\end{pmatrix} = 0\\right\\} = \\mathrm{span}(\\vec v).$$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Идея.</strong> Множество — это пересечение двух плоскостей, проходящих через начало координат. Их пересечение — прямая, направляющий вектор которой ортогонален обеим нормалям, т.е. равен векторному произведению нормалей.</p>
        <p><strong>Шаг 2. Векторное произведение.</strong></p>
        <p>$$\\vec v = \\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}\\times\\begin{pmatrix}-2\\\\-1\\\\1\\end{pmatrix} = \\begin{pmatrix}2\\cdot 1 - 3\\cdot(-1)\\\\ -(1\\cdot 1 - 3\\cdot(-2))\\\\ 1\\cdot(-1) - 2\\cdot(-2)\\end{pmatrix} = \\begin{pmatrix}5\\\\-7\\\\3\\end{pmatrix}.$$</p>
        <p><strong>Шаг 3. Проверка.</strong></p>
        <ul>
          <li>$\\vec v\\cdot(1,2,3) = 5 - 14 + 9 = 0$</li>
          <li>$\\vec v\\cdot(-2,-1,1) = -10 + 7 + 3 = 0$</li>
        </ul>
        <p><strong>Ответ:</strong> $\\vec v = (5,\\,-7,\\,3)^{\\!\\top}$ (или любой ненулевой кратный).</p>
      `
    },
    {
      id: 'contest3-2024-q7',
      source: 'Контест 3, 2024–2025, задача №7 (с развёрнутым решением)',
      questionLatex: `
        <p>Дано подпространство, которое получено пересечением плоскостей $x + y + z = 0$ и $x + 2y + 3z = 0.$ Запиши это подпространство в виде линейной оболочки нескольких линейно независимых векторов. Чему равна размерность этого подпространства?</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Решим систему.</strong></p>
        <p>$$\\begin{cases}x + y + z = 0,\\\\ x + 2y + 3z = 0.\\end{cases}$$</p>
        <p>Вычтем первое из второго: $y + 2z = 0,$ откуда $y = -2z.$ Из первого: $x = -y - z = 2z - z = z.$ Свободная переменная: $z.$</p>
        <p>$$\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix} = \\begin{pmatrix}z\\\\-2z\\\\z\\end{pmatrix} = z\\begin{pmatrix}1\\\\-2\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 2. Размерность и базис.</strong></p>
        <p>Одна свободная переменная $\\Rightarrow$ $\\dim = 1,$ подпространство — прямая $\\mathrm{span}\\big((1,-2,1)^{\\!\\top}\\big).$</p>
        <p><strong>Шаг 3. Альтернативный способ.</strong> Направляющий вектор пересечения двух плоскостей — векторное произведение их нормалей: $(1,1,1)\\times(1,2,3) = (1\\cdot 3 - 1\\cdot 2,\\,-(1\\cdot 3 - 1\\cdot 1),\\,1\\cdot 2 - 1\\cdot 1) = (1,-2,1)$</p>
        <p><strong>Ответ:</strong> подпространство $= \\mathrm{span}\\big((1,-2,1)^{\\!\\top}\\big),$ размерность $= 1.$</p>
      `
    },
    {
      id: 'contest3-2024-q8',
      source: 'Контест 3, 2024–2025, задача №8 (с развёрнутым решением)',
      questionLatex: `
        <p>Запиши подпространство $\\mathbb{R}^4,$ перпендикулярное вектору
        $$\\begin{pmatrix}1\\\\2\\\\-5\\\\-1\\end{pmatrix},$$
        в виде линейной оболочки нескольких линейно независимых векторов.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Уравнение ортогональности.</strong></p>
        <p>$$x_1 + 2x_2 - 5x_3 - x_4 = 0\\;\\Longleftrightarrow\\; x_1 = -2x_2 + 5x_3 + x_4.$$</p>
        <p><strong>Шаг 2. Свободные переменные: $x_2,\\,x_3,\\,x_4.$</strong></p>
        <p>$$\\vec x = \\begin{pmatrix}-2x_2 + 5x_3 + x_4\\\\x_2\\\\x_3\\\\x_4\\end{pmatrix} = x_2\\begin{pmatrix}-2\\\\1\\\\0\\\\0\\end{pmatrix} + x_3\\begin{pmatrix}5\\\\0\\\\1\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}1\\\\0\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 3. Проверка ортогональности.</strong> Каждый базисный вектор скалярно перемножим с $(1,2,-5,-1):$</p>
        <ul>
          <li>$(-2,1,0,0)\\cdot(1,2,-5,-1) = -2 + 2 + 0 + 0 = 0$</li>
          <li>$(5,0,1,0)\\cdot(1,2,-5,-1) = 5 + 0 - 5 + 0 = 0$</li>
          <li>$(1,0,0,1)\\cdot(1,2,-5,-1) = 1 + 0 + 0 - 1 = 0$</li>
        </ul>
        <p><strong>Шаг 4. Линейная независимость.</strong> Подматрица из столбцов $2,3,4$ — единичная $3\\times 3,$ значит ранг тройки равен $3$</p>
        <p><strong>Ответ:</strong> $V = \\mathrm{span}\\Big((-2,1,0,0)^{\\!\\top},\\;(5,0,1,0)^{\\!\\top},\\;(1,0,0,1)^{\\!\\top}\\Big),$ $\\dim V = 3.$</p>
      `
    },
    {
      id: 'kr1-2024-demo-q3',
      source: 'Демо-вариант КР №1, 2024–2025, задача №3 (простая)',
      questionLatex: `
        <p>Дано множество
        $$V = \\{(a,b,c,d)\\in\\mathbb{R}^4 :\\; a + b + c = 0,\\; b + c = d\\}.$$
        Представь $V$ в виде линейной оболочки нескольких векторов и определи размерность $V.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Перепишем как однородную СЛАУ.</strong></p>
        <p>$$\\begin{cases}a + b + c = 0,\\\\ b + c - d = 0.\\end{cases}$$</p>
        <p><strong>Шаг 2. Выразим главные переменные.</strong> Из первого: $a = -b - c.$ Из второго: $d = b + c.$ Свободные: $b,\\,c.$</p>
        <p>$$\\begin{pmatrix}a\\\\b\\\\c\\\\d\\end{pmatrix} = \\begin{pmatrix}-b - c\\\\b\\\\c\\\\b + c\\end{pmatrix} = b\\begin{pmatrix}-1\\\\1\\\\0\\\\1\\end{pmatrix} + c\\begin{pmatrix}-1\\\\0\\\\1\\\\1\\end{pmatrix}.$$</p>
        <p><strong>Шаг 3. Размерность.</strong> Две свободные переменные $\\Rightarrow$ $\\dim V = 2.$</p>
        <p><strong>Шаг 4. Проверка.</strong> Для $\\vec v_1 = (-1,1,0,1):$ $a + b + c = -1 + 1 + 0 = 0$ и $b + c = 1 = d$</p>
        <p><strong>Ответ:</strong> $V = \\mathrm{span}\\Big((-1,1,0,1)^{\\!\\top},\\;(-1,0,1,1)^{\\!\\top}\\Big),$ $\\dim V = 2.$</p>
      `
    },
    {
      id: 'kr1-2024-demo-q7',
      source: 'Демо-вариант КР №1, 2024–2025, задача №7 (с развёрнутым решением)',
      questionLatex: `
        <p>Запиши подпространство $\\mathbb{R}^4,$ перпендикулярное вектору
        $$\\begin{pmatrix}1\\\\2\\\\3\\\\4\\end{pmatrix},$$
        в виде линейной оболочки нескольких <strong>единичных</strong> линейно независимых векторов.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Уравнение ортогональности.</strong></p>
        <p>$$x_1 + 2x_2 + 3x_3 + 4x_4 = 0\\;\\Longleftrightarrow\\; x_1 = -2x_2 - 3x_3 - 4x_4.$$</p>
        <p><strong>Шаг 2. Базис из общего решения.</strong> Свободные: $x_2,\\,x_3,\\,x_4.$</p>
        <p>$$\\vec u_1 = \\begin{pmatrix}-2\\\\1\\\\0\\\\0\\end{pmatrix},\\quad \\vec u_2 = \\begin{pmatrix}-3\\\\0\\\\1\\\\0\\end{pmatrix},\\quad \\vec u_3 = \\begin{pmatrix}-4\\\\0\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p>Размерность подпространства равна $3$ (4 переменные минус 1 уравнение).</p>
        <p><strong>Шаг 3. Нормируем (требование задачи — единичные векторы).</strong></p>
        <ul>
          <li>$|\\vec u_1| = \\sqrt{4+1} = \\sqrt 5,$ значит $\\vec e_1 = \\dfrac{1}{\\sqrt 5}(-2,1,0,0)^{\\!\\top}.$</li>
          <li>$|\\vec u_2| = \\sqrt{9+1} = \\sqrt{10},$ значит $\\vec e_2 = \\dfrac{1}{\\sqrt{10}}(-3,0,1,0)^{\\!\\top}.$</li>
          <li>$|\\vec u_3| = \\sqrt{16+1} = \\sqrt{17},$ значит $\\vec e_3 = \\dfrac{1}{\\sqrt{17}}(-4,0,0,1)^{\\!\\top}.$</li>
        </ul>
        <p><strong>Шаг 4. Проверка линейной независимости.</strong> В матрице из $\\vec e_1,\\vec e_2,\\vec e_3$ столбцы 2, 3, 4 образуют диагональную подматрицу с ненулевыми элементами $\\tfrac{1}{\\sqrt 5},\\,\\tfrac{1}{\\sqrt{10}},\\,\\tfrac{1}{\\sqrt{17}};$ значит ранг $=3$</p>
        <p><strong>Ответ:</strong> $V = \\mathrm{span}(\\vec e_1,\\vec e_2,\\vec e_3),$ где
        $\\vec e_1 = \\tfrac{1}{\\sqrt 5}(-2,1,0,0)^{\\!\\top},$
        $\\vec e_2 = \\tfrac{1}{\\sqrt{10}}(-3,0,1,0)^{\\!\\top},$
        $\\vec e_3 = \\tfrac{1}{\\sqrt{17}}(-4,0,0,1)^{\\!\\top}.$</p>
      `
    },
    {
      id: 'kr1-2024-v1-q2',
      source: 'КР №1, 2024–2025, вариант 1, задача №2 (с развёрнутым решением)',
      questionLatex: `
        <p>Найди ортонормированный базис в подпространстве $\\mathbb{R}^3,$ перпендикулярном вектору $\\begin{pmatrix}2\\\\1\\\\-1\\end{pmatrix}.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Уравнение подпространства.</strong></p>
        <p>$$2x + y - z = 0\\;\\Longleftrightarrow\\; z = 2x + y.$$</p>
        <p>Свободные $x,y;$ обычный базис: $\\vec u_1 = (1,0,2),$ $\\vec u_2 = (0,1,1).$ Удобно (и эквивалентно) взять $\\vec u_1 = (-1,2,0),$ $\\vec u_2 = (1,0,2).$</p>
        <p>(Проверим: $2(-1) + 2 - 0 = 0$, $2\\cdot 1 + 0 - 2 = 0$)</p>
        <p><strong>Шаг 2. Грам–Шмидт. Сначала нормируем $\\vec u_1.$</strong></p>
        <p>$|\\vec u_1| = \\sqrt{1 + 4} = \\sqrt 5,\\quad \\vec e_1 = \\dfrac{1}{\\sqrt 5}(-1,2,0).$</p>
        <p><strong>Шаг 3. Ортогонализуем $\\vec u_2.$</strong></p>
        <p>$$\\langle\\vec u_2,\\vec e_1\\rangle = \\frac{1}{\\sqrt 5}(1\\cdot(-1) + 0\\cdot 2 + 2\\cdot 0) = -\\frac{1}{\\sqrt 5}.$$
        $$\\vec u_2' = \\vec u_2 - \\langle\\vec u_2,\\vec e_1\\rangle\\,\\vec e_1 = (1,0,2) + \\frac{1}{\\sqrt 5}\\cdot\\frac{1}{\\sqrt 5}(-1,2,0) = (1,0,2) + \\frac{1}{5}(-1,2,0) = \\Big(\\tfrac{4}{5},\\,\\tfrac{2}{5},\\,2\\Big).$$</p>
        <p>Удобно умножить на $5:$ $\\vec u_2' \\sim (4,\\,2,\\,10) = 2(2,1,5),$ т.е. направление $(2,1,5).$</p>
        <p><strong>Шаг 4. Нормируем.</strong> $|(2,1,5)| = \\sqrt{4+1+25} = \\sqrt{30}.$
        $$\\vec e_2 = \\frac{1}{\\sqrt{30}}(2,\\,1,\\,5).$$</p>
        <p><strong>Шаг 5. Проверка.</strong></p>
        <ul>
          <li>$\\vec e_2\\cdot(2,1,-1) = (4 + 1 - 5)/\\sqrt{30} = 0$</li>
          <li>$\\vec e_1\\cdot\\vec e_2 = \\dfrac{1}{\\sqrt{150}}((-1)\\cdot 2 + 2\\cdot 1 + 0\\cdot 5) = 0$</li>
          <li>$|\\vec e_1| = |\\vec e_2| = 1$</li>
        </ul>
        <p><strong>Ответ:</strong> ортонормированный базис
        $\\Big\\{\\vec e_1 = \\tfrac{1}{\\sqrt 5}(-1,2,0)^{\\!\\top},\\;\\vec e_2 = \\tfrac{1}{\\sqrt{30}}(2,1,5)^{\\!\\top}\\Big\\}.$</p>
      `
    },
    {
      id: 'kr1-2024-v2-q2',
      source: 'КР №1, 2024–2025, вариант 2, задача №2 (с развёрнутым решением)',
      questionLatex: `
        <p>Найди ортонормированный базис в подпространстве $\\mathbb{R}^3,$ перпендикулярном вектору $\\begin{pmatrix}1\\\\3\\\\2\\end{pmatrix}.$</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Уравнение подпространства.</strong></p>
        <p>$$x + 3y + 2z = 0\\;\\Longleftrightarrow\\; x = -3y - 2z.$$</p>
        <p>Базис: $\\vec u_1 = (-3,1,0),$ $\\vec u_2 = (-2,0,1).$</p>
        <p><strong>Шаг 2. Нормируем $\\vec u_1.$</strong></p>
        <p>$|\\vec u_1| = \\sqrt{9+1} = \\sqrt{10},\\quad \\vec e_1 = \\dfrac{1}{\\sqrt{10}}(-3,1,0).$</p>
        <p><strong>Шаг 3. Ортогонализуем $\\vec u_2.$</strong></p>
        <p>$$\\langle\\vec u_2,\\vec e_1\\rangle = \\frac{1}{\\sqrt{10}}\\big((-2)(-3) + 0\\cdot 1 + 1\\cdot 0\\big) = \\frac{6}{\\sqrt{10}}.$$
        $$\\vec u_2' = \\vec u_2 - \\frac{6}{\\sqrt{10}}\\,\\vec e_1 = (-2,0,1) - \\frac{6}{10}(-3,1,0) = (-2 + \\tfrac{18}{10},\\,-\\tfrac{6}{10},\\,1) = \\Big(-\\tfrac{1}{5},\\,-\\tfrac{3}{5},\\,1\\Big).$$</p>
        <p>Умножим на $5:$ $\\vec u_2' \\sim (-1,-3,5).$</p>
        <p><strong>Шаг 4. Нормируем.</strong> $|(-1,-3,5)| = \\sqrt{1+9+25} = \\sqrt{35}.$
        $$\\vec e_2 = \\frac{1}{\\sqrt{35}}(-1,-3,5).$$</p>
        <p><strong>Шаг 5. Проверка.</strong></p>
        <ul>
          <li>$\\vec e_2\\cdot(1,3,2) = (-1 - 9 + 10)/\\sqrt{35} = 0$</li>
          <li>$\\vec e_1\\cdot\\vec e_2 \\propto (-3)(-1) + 1\\cdot(-3) + 0\\cdot 5 = 3 - 3 = 0$</li>
        </ul>
        <p><strong>Ответ:</strong> ортонормированный базис
        $\\Big\\{\\vec e_1 = \\tfrac{1}{\\sqrt{10}}(-3,1,0)^{\\!\\top},\\;\\vec e_2 = \\tfrac{1}{\\sqrt{35}}(-1,-3,5)^{\\!\\top}\\Big\\}.$</p>
      `
    },
    {
      id: 'kr1-2024-v1-q4',
      source: 'КР №1, 2024–2025, вариант 1, задача №4 (с развёрнутым решением)',
      questionLatex: `
        <p>Пусть заданы подпространства:
        $$X = \\{(x_1;x_2;x_3;x_4)\\in\\mathbb{R}^4 :\\; x_2 - 2x_3 + x_4 = 0\\};$$
        $$Y = \\{(x_1;x_2;x_3;x_4)\\in\\mathbb{R}^4 :\\; x_1 + 3x_2 = 0,\\; x_3 = 0\\}.$$
        Найди базисы для $X,$ $Y$ и $X\\cap Y,$ а также укажи размерности этих подпространств.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Базис $X.$</strong> Уравнение: $x_2 = 2x_3 - x_4.$ Свободные: $x_1,x_3,x_4.$</p>
        <p>$$\\vec x = \\begin{pmatrix}x_1\\\\2x_3 - x_4\\\\x_3\\\\x_4\\end{pmatrix} = x_1\\begin{pmatrix}1\\\\0\\\\0\\\\0\\end{pmatrix} + x_3\\begin{pmatrix}0\\\\2\\\\1\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}0\\\\-1\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p>$\\dim X = 3,$ базис $\\{(1,0,0,0)^{\\!\\top},\\,(0,2,1,0)^{\\!\\top},\\,(0,-1,0,1)^{\\!\\top}\\}.$</p>
        <p><strong>Шаг 2. Базис $Y.$</strong> $x_1 = -3x_2,$ $x_3 = 0.$ Свободные: $x_2,x_4.$</p>
        <p>$$\\vec x = \\begin{pmatrix}-3x_2\\\\x_2\\\\0\\\\x_4\\end{pmatrix} = x_2\\begin{pmatrix}-3\\\\1\\\\0\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}0\\\\0\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p>$\\dim Y = 2,$ базис $\\{(-3,1,0,0)^{\\!\\top},\\,(0,0,0,1)^{\\!\\top}\\}.$</p>
        <p><strong>Шаг 3. Базис $X\\cap Y.$</strong> Объединяем все три уравнения:</p>
        <p>$$\\begin{cases}x_2 - 2x_3 + x_4 = 0,\\\\ x_1 + 3x_2 = 0,\\\\ x_3 = 0.\\end{cases}$$</p>
        <p>Из третьего $x_3 = 0;$ из первого тогда $x_4 = -x_2;$ из второго $x_1 = -3x_2.$ Свободная: $x_2.$</p>
        <p>$$\\vec x = \\begin{pmatrix}-3x_2\\\\x_2\\\\0\\\\-x_2\\end{pmatrix} = x_2\\begin{pmatrix}-3\\\\1\\\\0\\\\-1\\end{pmatrix}.$$</p>
        <p>$\\dim(X\\cap Y) = 1,$ базис $\\{(-3,1,0,-1)^{\\!\\top}\\}.$</p>
        <p><strong>Шаг 4. Сводка.</strong></p>
        <ul>
          <li>$\\dim X = 3,$ базис $\\{(1,0,0,0),\\,(0,2,1,0),\\,(0,-1,0,1)\\}$</li>
          <li>$\\dim Y = 2,$ базис $\\{(-3,1,0,0),\\,(0,0,0,1)\\}$</li>
          <li>$\\dim(X\\cap Y) = 1,$ базис $\\{(-3,1,0,-1)\\}$</li>
        </ul>
        <p><strong>Ответ:</strong> базисы и размерности приведены выше.</p>
      `
    },
    {
      id: 'kr1-2024-v2-q4',
      source: 'КР №1, 2024–2025, вариант 2, задача №4 (с развёрнутым решением)',
      questionLatex: `
        <p>Пусть заданы подпространства:
        $$X = \\{(x_1;x_2;x_3;x_4)\\in\\mathbb{R}^4 :\\; x_2 + x_3 - 3x_4 = 0\\};$$
        $$Y = \\{(x_1;x_2;x_3;x_4)\\in\\mathbb{R}^4 :\\; x_4 - 2x_2 = 0,\\; x_3 + x_1 = 0\\}.$$
        Найди базисы для $X,$ $Y$ и $X\\cap Y,$ а также укажи размерности этих подпространств.</p>
      `,
      solutionHtml: `
        <p><strong>Шаг 1. Базис $X.$</strong> $x_2 = -x_3 + 3x_4.$ Свободные: $x_1,x_3,x_4.$</p>
        <p>$$\\vec x = \\begin{pmatrix}x_1\\\\-x_3+3x_4\\\\x_3\\\\x_4\\end{pmatrix} = x_1\\begin{pmatrix}1\\\\0\\\\0\\\\0\\end{pmatrix} + x_3\\begin{pmatrix}0\\\\-1\\\\1\\\\0\\end{pmatrix} + x_4\\begin{pmatrix}0\\\\3\\\\0\\\\1\\end{pmatrix}.$$</p>
        <p>$\\dim X = 3.$</p>
        <p><strong>Шаг 2. Базис $Y.$</strong> $x_4 = 2x_2,$ $x_1 = -x_3.$ Свободные: $x_2,x_3.$</p>
        <p>$$\\vec x = \\begin{pmatrix}-x_3\\\\x_2\\\\x_3\\\\2x_2\\end{pmatrix} = x_2\\begin{pmatrix}0\\\\1\\\\0\\\\2\\end{pmatrix} + x_3\\begin{pmatrix}-1\\\\0\\\\1\\\\0\\end{pmatrix}.$$</p>
        <p>$\\dim Y = 2.$</p>
        <p><strong>Шаг 3. Базис $X\\cap Y.$</strong> Все три уравнения вместе:</p>
        <p>$$\\begin{cases}x_2 + x_3 - 3x_4 = 0,\\\\ x_4 = 2x_2,\\\\ x_1 = -x_3.\\end{cases}$$</p>
        <p>Подставим $x_4 = 2x_2$ в первое: $x_2 + x_3 - 6x_2 = 0\\Rightarrow x_3 = 5x_2.$ Тогда $x_1 = -5x_2,$ $x_4 = 2x_2.$ Свободная: $x_2.$</p>
        <p>$$\\vec x = \\begin{pmatrix}-5x_2\\\\x_2\\\\5x_2\\\\2x_2\\end{pmatrix} = x_2\\begin{pmatrix}-5\\\\1\\\\5\\\\2\\end{pmatrix}.$$</p>
        <p>$\\dim(X\\cap Y) = 1.$</p>
        <p><strong>Шаг 4. Проверка.</strong> Проверим $(-5,1,5,2)$ в условиях $Y:$ $x_4 - 2x_2 = 2 - 2 = 0$; $x_3 + x_1 = 5 - 5 = 0$ И в $X:$ $x_2 + x_3 - 3x_4 = 1 + 5 - 6 = 0$</p>
        <p><strong>Сводка:</strong></p>
        <ul>
          <li>$\\dim X = 3,$ базис $\\{(1,0,0,0),\\,(0,-1,1,0),\\,(0,3,0,1)\\}$</li>
          <li>$\\dim Y = 2,$ базис $\\{(0,1,0,2),\\,(-1,0,1,0)\\}$</li>
          <li>$\\dim(X\\cap Y) = 1,$ базис $\\{(-5,1,5,2)\\}$</li>
        </ul>
        <p><strong>Ответ:</strong> базисы и размерности приведены выше.</p>
      `
    }
  ];
})();
