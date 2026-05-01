/**
 * РешуМИА — банк задач, часть 2 (типы 5–8).
 *
 *   5: Производные сложной функции, правило цепочки (chain rule)
 *   6: Линейное приближение функции в точке, оценка значения
 *   7: Применение матрицы через собственные векторы, степени матрицы
 *   8: Неопределённый интеграл методом замены переменной
 *
 * Источник задач: летний экзамен 2025 (демо + варианты 1,2),
 * КР №2 и КР №3 2024–2025 (демо + варианты).
 */
(function () {
  if (!window.TASK_BANK) return;
  const T = window.TASK_BANK;

  // =====================================================================
  //  ТИП 5: ПРОИЗВОДНЫЕ СЛОЖНОЙ ФУНКЦИИ (CHAIN RULE)
  // =====================================================================
  T[5].tasks = [
    {
      id: "exam2025-demo-q5",
      source: "Демо летнего экзамена, 2025 / КР №2, 2024–2025, варианты 1 и 3, задача №13 (тест)",
      questionLatex: `<p>Дана функция $u(x;\\,y) = e^{xy}$, где $x = e^{ts}$, $y = t + s$. Найди частную производную $\\dfrac{\\partial u}{\\partial s}$ при $s = 0,\\; t = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Запишем формулу цепного правила для функции $u\\bigl(x(t,s),\\, y(t,s)\\bigr)$:</p>
<p>$$\\frac{\\partial u}{\\partial s} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{\\partial x}{\\partial s} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{\\partial y}{\\partial s}.$$</p>

<p><strong>Шаг 2.</strong> Найдём частные производные внешней функции $u(x,y)=e^{xy}$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = y\\,e^{xy}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = x\\,e^{xy}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Найдём частные производные внутренних функций $x=e^{ts}$, $y=t+s$ по $s$:</p>
<ul>
  <li>$\\dfrac{\\partial x}{\\partial s} = t\\,e^{ts}$,</li>
  <li>$\\dfrac{\\partial y}{\\partial s} = 1$.</li>
</ul>

<p><strong>Шаг 4.</strong> Подставим $s=0,\\;t=0$. Тогда $x = e^{0}=1$, $y = 0+0 = 0$, $e^{xy} = e^{0} = 1$. Значит:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x}\\Big|_{(1,0)} = 0\\cdot 1 = 0$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y}\\Big|_{(1,0)} = 1\\cdot 1 = 1$,</li>
  <li>$\\dfrac{\\partial x}{\\partial s}\\Big|_{(0,0)} = 0\\cdot 1 = 0$,</li>
  <li>$\\dfrac{\\partial y}{\\partial s}\\Big|_{(0,0)} = 1$.</li>
</ul>

<p><strong>Шаг 5.</strong> Соберём:</p>
<p>$$\\frac{\\partial u}{\\partial s}\\bigg|_{(0,0)} = 0\\cdot 0 + 1\\cdot 1 = 1.$$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{\\partial u}{\\partial s}\\Big|_{s=t=0} = 1$.</p>
      `
    },

    {
      id: "exam2025-v1-q5",
      source: "Летний экзамен, 2025, вариант 1",
      questionLatex: `<p>Дана функция $u(x;\\,y) = \\ln(x^2 + y)$, где $x = e^{s-t}$, $y = e^{s+t}$. Найди частную производную $\\dfrac{\\partial u}{\\partial t}$ при $s = 0,\\; t = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> По правилу цепочки для $u\\bigl(x(s,t),\\,y(s,t)\\bigr)$:</p>
<p>$$\\frac{\\partial u}{\\partial t} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{\\partial x}{\\partial t} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{\\partial y}{\\partial t}.$$</p>

<p><strong>Шаг 2.</strong> Производные внешней функции $u = \\ln(x^2+y)$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = \\dfrac{2x}{x^2+y}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = \\dfrac{1}{x^2+y}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Производные внутренних функций по $t$:</p>
<ul>
  <li>$\\dfrac{\\partial x}{\\partial t} = -e^{s-t}$,</li>
  <li>$\\dfrac{\\partial y}{\\partial t} = e^{s+t}$.</li>
</ul>

<p><strong>Шаг 4.</strong> Подставим $s = t = 0$. Тогда $x = e^{0} = 1$, $y = e^{0} = 1$, $x^2 + y = 2$. Значит:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = \\dfrac{2\\cdot 1}{2} = 1$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = \\dfrac{1}{2}$,</li>
  <li>$\\dfrac{\\partial x}{\\partial t} = -1$,</li>
  <li>$\\dfrac{\\partial y}{\\partial t} = 1$.</li>
</ul>

<p><strong>Шаг 5.</strong> Подставляем в формулу:</p>
<p>$$\\frac{\\partial u}{\\partial t}\\bigg|_{(0,0)} = 1\\cdot(-1) + \\frac{1}{2}\\cdot 1 = -1 + \\frac{1}{2} = -\\frac{1}{2}.$$</p>

<hr>
<p><strong>Ответ:</strong> $-\\dfrac{1}{2}$.</p>
      `
    },

    {
      id: "exam2025-v2-q5",
      source: "Летний экзамен, 2025, вариант 2",
      questionLatex: `<p>Дана функция $u(x;\\,y) = \\ln(x + y^2)$, где $x = e^{s-t}$, $y = e^{s+t}$. Найди частную производную $\\dfrac{\\partial u}{\\partial t}$ при $s = 0,\\; t = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Цепное правило:</p>
<p>$$\\frac{\\partial u}{\\partial t} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{\\partial x}{\\partial t} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{\\partial y}{\\partial t}.$$</p>

<p><strong>Шаг 2.</strong> Внешние производные $u = \\ln(x+y^2)$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = \\dfrac{1}{x+y^2}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = \\dfrac{2y}{x+y^2}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Внутренние производные по $t$:</p>
<ul>
  <li>$\\dfrac{\\partial x}{\\partial t} = -e^{s-t}$,</li>
  <li>$\\dfrac{\\partial y}{\\partial t} = e^{s+t}$.</li>
</ul>

<p><strong>Шаг 4.</strong> При $s=t=0$ имеем $x = 1$, $y = 1$, $x+y^2 = 2$. Тогда:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = \\dfrac{1}{2}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = \\dfrac{2}{2} = 1$,</li>
  <li>$\\dfrac{\\partial x}{\\partial t} = -1$,</li>
  <li>$\\dfrac{\\partial y}{\\partial t} = 1$.</li>
</ul>

<p><strong>Шаг 5.</strong> Окончательно:</p>
<p>$$\\frac{\\partial u}{\\partial t}\\bigg|_{(0,0)} = \\frac{1}{2}\\cdot(-1) + 1\\cdot 1 = -\\frac{1}{2} + 1 = \\frac{1}{2}.$$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{1}{2}$.</p>
      `
    },

    {
      id: "kr2-2024-demo-q5",
      source: "Демо-вариант КР №2, 2024–2025, задача №10 (тест)",
      questionLatex: `<p>Найди $\\dfrac{dz}{dt}$, если $z = e^{xy}$, $x = t^2$ и $y = \\sin t$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Здесь $z$ зависит от одной переменной $t$ через $x$ и $y$, поэтому используется обыкновенная производная. Цепное правило:</p>
<p>$$\\frac{dz}{dt} \\;=\\; \\frac{\\partial z}{\\partial x}\\cdot \\frac{dx}{dt} \\;+\\; \\frac{\\partial z}{\\partial y}\\cdot \\frac{dy}{dt}.$$</p>

<p><strong>Шаг 2.</strong> Производные внешней функции $z = e^{xy}$:</p>
<ul>
  <li>$\\dfrac{\\partial z}{\\partial x} = y\\,e^{xy}$,</li>
  <li>$\\dfrac{\\partial z}{\\partial y} = x\\,e^{xy}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Производные внутренних функций по $t$:</p>
<ul>
  <li>$\\dfrac{dx}{dt} = 2t$,</li>
  <li>$\\dfrac{dy}{dt} = \\cos t$.</li>
</ul>

<p><strong>Шаг 4.</strong> Соберём всё вместе:</p>
<p>$$\\frac{dz}{dt} = y\\,e^{xy}\\cdot 2t + x\\,e^{xy}\\cdot \\cos t = e^{xy}\\bigl(2t\\,y + x\\cos t\\bigr).$$</p>

<p><strong>Шаг 5.</strong> Подставим $x = t^2$, $y = \\sin t$:</p>
<p>$$\\frac{dz}{dt} = e^{t^2\\sin t}\\bigl(2t\\sin t + t^2\\cos t\\bigr).$$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{dz}{dt} = e^{t^2\\sin t}\\bigl(2t\\sin t + t^2\\cos t\\bigr)$.</p>
      `
    },

    {
      id: "kr2-2024-v13-q5",
      source: "КР №2, 2024–2025, варианты 1 и 3, задача №12 (тест)",
      questionLatex: `<p>Дана функция $u(x;\\,y) = x\\,e^{y}$, где $x = t^2$, $y = 1 - t$. Найди производную $\\dfrac{du}{dt}$ при $t = 1$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Цепное правило для функции одной переменной $t$:</p>
<p>$$\\frac{du}{dt} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{dx}{dt} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{dy}{dt}.$$</p>

<p><strong>Шаг 2.</strong> Внешние производные $u = x\\,e^{y}$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = e^{y}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = x\\,e^{y}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Внутренние производные:</p>
<ul>
  <li>$\\dfrac{dx}{dt} = 2t$,</li>
  <li>$\\dfrac{dy}{dt} = -1$.</li>
</ul>

<p><strong>Шаг 4.</strong> При $t = 1$ получаем $x = 1$, $y = 0$, $e^{y} = 1$. Значит:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = 1$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = 1\\cdot 1 = 1$,</li>
  <li>$\\dfrac{dx}{dt} = 2$,</li>
  <li>$\\dfrac{dy}{dt} = -1$.</li>
</ul>

<p><strong>Шаг 5.</strong> Окончательно:</p>
<p>$$\\frac{du}{dt}\\bigg|_{t=1} = 1\\cdot 2 + 1\\cdot(-1) = 2 - 1 = 1.$$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{du}{dt}\\Big|_{t=1} = 1$.</p>
      `
    },

    {
      id: "kr2-2024-v24-q5",
      source: "КР №2, 2024–2025, варианты 2 и 4, задача №12 (тест)",
      questionLatex: `<p>Дана функция $u(x;\\,y) = y\\,e^{x}$, где $x = t^2$, $y = 1 - t$. Найди производную $\\dfrac{du}{dt}$ при $t = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Используем цепное правило:</p>
<p>$$\\frac{du}{dt} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{dx}{dt} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{dy}{dt}.$$</p>

<p><strong>Шаг 2.</strong> Производные $u = y\\,e^{x}$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = y\\,e^{x}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = e^{x}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Производные $x$ и $y$ по $t$:</p>
<ul>
  <li>$\\dfrac{dx}{dt} = 2t$,</li>
  <li>$\\dfrac{dy}{dt} = -1$.</li>
</ul>

<p><strong>Шаг 4.</strong> При $t = 0$: $x = 0$, $y = 1$, $e^{x} = 1$.</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = 1\\cdot 1 = 1$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = 1$,</li>
  <li>$\\dfrac{dx}{dt} = 0$,</li>
  <li>$\\dfrac{dy}{dt} = -1$.</li>
</ul>

<p><strong>Шаг 5.</strong> Подстановка:</p>
<p>$$\\frac{du}{dt}\\bigg|_{t=0} = 1\\cdot 0 + 1\\cdot(-1) = -1.$$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{du}{dt}\\Big|_{t=0} = -1$.</p>
      `
    },

    {
      id: "kr2-2024-v24-q5b",
      source: "КР №2, 2024–2025, варианты 2 и 4, задача №13 (тест)",
      questionLatex: `<p>Дана функция $u(x;\\,y) = e^{x+y}$, где $x = e^{t+s}$, $y = ts$. Найди частную производную $\\dfrac{\\partial u}{\\partial s}$ при $s = 0,\\; t = 0$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> По цепному правилу:</p>
<p>$$\\frac{\\partial u}{\\partial s} \\;=\\; \\frac{\\partial u}{\\partial x}\\cdot \\frac{\\partial x}{\\partial s} \\;+\\; \\frac{\\partial u}{\\partial y}\\cdot \\frac{\\partial y}{\\partial s}.$$</p>

<p><strong>Шаг 2.</strong> Производные $u = e^{x+y}$:</p>
<ul>
  <li>$\\dfrac{\\partial u}{\\partial x} = e^{x+y}$,</li>
  <li>$\\dfrac{\\partial u}{\\partial y} = e^{x+y}$.</li>
</ul>

<p><strong>Шаг 3.</strong> Производные $x = e^{t+s}$, $y = ts$ по $s$:</p>
<ul>
  <li>$\\dfrac{\\partial x}{\\partial s} = e^{t+s}$,</li>
  <li>$\\dfrac{\\partial y}{\\partial s} = t$.</li>
</ul>

<p><strong>Шаг 4.</strong> При $s = t = 0$: $x = e^{0} = 1$, $y = 0\\cdot 0 = 0$, $x+y = 1$, $e^{x+y} = e$. Также $\\dfrac{\\partial x}{\\partial s} = e^{0} = 1$, $\\dfrac{\\partial y}{\\partial s} = 0$.</p>

<p><strong>Шаг 5.</strong> Соберём:</p>
<p>$$\\frac{\\partial u}{\\partial s}\\bigg|_{(0,0)} = e\\cdot 1 + e\\cdot 0 = e.$$</p>

<hr>
<p><strong>Ответ:</strong> $e$.</p>
      `
    }
  ];

  // =====================================================================
  //  ТИП 6: ЛИНЕЙНОЕ ПРИБЛИЖЕНИЕ ФУНКЦИИ В ТОЧКЕ
  // =====================================================================
  T[6].tasks = [
    {
      id: "exam2025-demo-q6",
      source: "Демо летнего экзамена, 2025 / КР №2, 2024–2025, варианты 1 и 3, задача №4 (тест)",
      questionLatex: `<p>Найди линейное приближение функции $f(x;\\,y) = x^3 y$ в точке $(-1;\\,2)$ и используй его для оценки значения этой функции в точке $(-0{,}99;\\,1{,}98)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Формула линейного приближения функции в точке $(x_0,y_0)$:</p>
<p>$$L(x,y) \\;=\\; f(x_0,y_0) + f_x(x_0,y_0)\\,(x-x_0) + f_y(x_0,y_0)\\,(y-y_0).$$</p>

<p><strong>Шаг 2.</strong> Значение функции в точке $(-1;\\,2)$:</p>
<p>$$f(-1,2) = (-1)^3\\cdot 2 = -2.$$</p>

<p><strong>Шаг 3.</strong> Частные производные:</p>
<ul>
  <li>$f_x(x,y) = 3x^2 y \\;\\Rightarrow\\; f_x(-1,2) = 3\\cdot 1\\cdot 2 = 6$,</li>
  <li>$f_y(x,y) = x^3 \\;\\Rightarrow\\; f_y(-1,2) = -1$.</li>
</ul>

<p><strong>Шаг 4.</strong> Подставляем в формулу:</p>
<p>$$L(x,y) = -2 + 6\\,(x + 1) - (y - 2).$$</p>

<p><strong>Шаг 5.</strong> Оценим $f(-0{,}99;\\,1{,}98)$. Здесь $\\Delta x = -0{,}99 - (-1) = 0{,}01$, $\\Delta y = 1{,}98 - 2 = -0{,}02$. Тогда:</p>
<p>$$L(-0{,}99;\\,1{,}98) = -2 + 6\\cdot 0{,}01 - (-0{,}02) = -2 + 0{,}06 + 0{,}02 = -1{,}92.$$</p>

<hr>
<p><strong>Ответ:</strong> $L(x,y) = -2 + 6(x+1) - (y-2)$; $\\;f(-0{,}99;\\,1{,}98) \\approx -1{,}92$.</p>
      `
    },

    {
      id: "exam2025-v1-q6",
      source: "Летний экзамен, 2025, вариант 1",
      questionLatex: `<p>Найди линейное приближение функции $f(x;\\,y) = \\ln(\\sqrt{xy})$ в точке $(1;\\,1)$ и оцени $f(1{,}04;\\,0{,}98)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Упростим функцию (область $xy > 0$):</p>
<p>$$f(x,y) = \\ln\\sqrt{xy} = \\tfrac{1}{2}\\ln(xy) = \\tfrac{1}{2}\\bigl(\\ln x + \\ln y\\bigr).$$</p>

<p><strong>Шаг 2.</strong> Значение в точке $(1;\\,1)$:</p>
<p>$$f(1,1) = \\tfrac{1}{2}(\\ln 1 + \\ln 1) = 0.$$</p>

<p><strong>Шаг 3.</strong> Частные производные:</p>
<ul>
  <li>$f_x = \\dfrac{1}{2x} \\;\\Rightarrow\\; f_x(1,1) = \\dfrac{1}{2}$,</li>
  <li>$f_y = \\dfrac{1}{2y} \\;\\Rightarrow\\; f_y(1,1) = \\dfrac{1}{2}$.</li>
</ul>

<p><strong>Шаг 4.</strong> Линейное приближение:</p>
<p>$$L(x,y) = 0 + \\tfrac{1}{2}(x-1) + \\tfrac{1}{2}(y-1).$$</p>

<p><strong>Шаг 5.</strong> Оценим $f(1{,}04;\\,0{,}98)$: $\\Delta x = 0{,}04$, $\\Delta y = -0{,}02$.</p>
<p>$$L(1{,}04;\\,0{,}98) = \\tfrac{1}{2}\\cdot 0{,}04 + \\tfrac{1}{2}\\cdot(-0{,}02) = 0{,}02 - 0{,}01 = 0{,}01.$$</p>

<hr>
<p><strong>Ответ:</strong> $L(x,y) = \\tfrac{1}{2}(x-1) + \\tfrac{1}{2}(y-1)$; $\\;f(1{,}04;\\,0{,}98) \\approx 0{,}01$.</p>
      `
    },

    {
      id: "exam2025-v2-q6",
      source: "Летний экзамен, 2025, вариант 2",
      questionLatex: `<p>Найди линейное приближение функции $f(x;\\,y) = \\ln(\\sqrt{x^2 + y})$ в точке $(1;\\,0)$ и оцени $f(1{,}01;\\,-0{,}02)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Упростим: $f(x,y) = \\tfrac{1}{2}\\ln(x^2+y)$ (область $x^2+y > 0$).</p>

<p><strong>Шаг 2.</strong> Значение в точке $(1;\\,0)$. Здесь $x^2+y = 1$, поэтому:</p>
<p>$$f(1,0) = \\tfrac{1}{2}\\ln 1 = 0.$$</p>

<p><strong>Шаг 3.</strong> Частные производные:</p>
<ul>
  <li>$f_x = \\dfrac{1}{2}\\cdot \\dfrac{2x}{x^2+y} = \\dfrac{x}{x^2+y} \\;\\Rightarrow\\; f_x(1,0) = \\dfrac{1}{1} = 1$,</li>
  <li>$f_y = \\dfrac{1}{2}\\cdot \\dfrac{1}{x^2+y} = \\dfrac{1}{2(x^2+y)} \\;\\Rightarrow\\; f_y(1,0) = \\dfrac{1}{2}$.</li>
</ul>

<p><strong>Шаг 4.</strong> Линейное приближение:</p>
<p>$$L(x,y) = 0 + 1\\cdot(x-1) + \\tfrac{1}{2}\\cdot(y-0) = (x-1) + \\tfrac{y}{2}.$$</p>

<p><strong>Шаг 5.</strong> Оценим $f(1{,}01;\\,-0{,}02)$: $\\Delta x = 0{,}01$, $y = -0{,}02$.</p>
<p>$$L(1{,}01;\\,-0{,}02) = 0{,}01 + \\frac{-0{,}02}{2} = 0{,}01 - 0{,}01 = 0.$$</p>

<hr>
<p><strong>Ответ:</strong> $L(x,y) = (x-1) + \\tfrac{y}{2}$; $\\;f(1{,}01;\\,-0{,}02) \\approx 0$.</p>
      `
    },

    {
      id: "kr2-2024-demo-q6",
      source: "Демо-вариант КР №2, 2024–2025, задача №5 (тест)",
      questionLatex: `<p>Вычисли линейное приближение функции $f(x;\\,y) = x^2 + 3y^2$ в окрестности точки $(1;\\,2)$ и используй его для оценки значения $f(1{,}1;\\,2{,}05)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Формула:</p>
<p>$$L(x,y) = f(x_0,y_0) + f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0).$$</p>

<p><strong>Шаг 2.</strong> $f(1,2) = 1^2 + 3\\cdot 2^2 = 1 + 12 = 13$.</p>

<p><strong>Шаг 3.</strong> Частные производные:</p>
<ul>
  <li>$f_x = 2x \\;\\Rightarrow\\; f_x(1,2) = 2$,</li>
  <li>$f_y = 6y \\;\\Rightarrow\\; f_y(1,2) = 12$.</li>
</ul>

<p><strong>Шаг 4.</strong> Линейное приближение:</p>
<p>$$L(x,y) = 13 + 2(x-1) + 12(y-2).$$</p>

<p><strong>Шаг 5.</strong> Оценим $f(1{,}1;\\,2{,}05)$: $\\Delta x = 0{,}1$, $\\Delta y = 0{,}05$.</p>
<p>$$L(1{,}1;\\,2{,}05) = 13 + 2\\cdot 0{,}1 + 12\\cdot 0{,}05 = 13 + 0{,}2 + 0{,}6 = 13{,}8.$$</p>

<p>Для сравнения, точное значение: $f(1{,}1;\\,2{,}05) = 1{,}21 + 3\\cdot 4{,}2025 = 1{,}21 + 12{,}6075 = 13{,}8175$ — совпадает с линейной оценкой с точностью до $0{,}02$.</p>

<hr>
<p><strong>Ответ:</strong> $L(x,y) = 13 + 2(x-1) + 12(y-2)$; $\\;f(1{,}1;\\,2{,}05) \\approx 13{,}8$.</p>
      `
    },

    {
      id: "kr2-2024-v24-q6",
      source: "КР №2, 2024–2025, варианты 2 и 4, задача №4 (тест)",
      questionLatex: `<p>Найди линейное приближение функции $f(x;\\,y) = x y^3$ в точке $(-1;\\,2)$ и используй его для оценки значения этой функции в точке $(-0{,}98;\\,2{,}01)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> $f(-1,2) = (-1)\\cdot 8 = -8$.</p>

<p><strong>Шаг 2.</strong> Частные производные:</p>
<ul>
  <li>$f_x = y^3 \\;\\Rightarrow\\; f_x(-1,2) = 8$,</li>
  <li>$f_y = 3xy^2 \\;\\Rightarrow\\; f_y(-1,2) = 3\\cdot(-1)\\cdot 4 = -12$.</li>
</ul>

<p><strong>Шаг 3.</strong> Линейное приближение:</p>
<p>$$L(x,y) = -8 + 8\\,(x+1) - 12\\,(y-2).$$</p>

<p><strong>Шаг 4.</strong> Оценим в точке $(-0{,}98;\\,2{,}01)$: $\\Delta x = 0{,}02$, $\\Delta y = 0{,}01$.</p>
<p>$$L(-0{,}98;\\,2{,}01) = -8 + 8\\cdot 0{,}02 - 12\\cdot 0{,}01 = -8 + 0{,}16 - 0{,}12 = -7{,}96.$$</p>

<hr>
<p><strong>Ответ:</strong> $L(x,y) = -8 + 8(x+1) - 12(y-2)$; $\\;f(-0{,}98;\\,2{,}01) \\approx -7{,}96$.</p>
      `
    }
  ];

  // =====================================================================
  //  ТИП 7: ПРИМЕНЕНИЕ МАТРИЦЫ ЧЕРЕЗ СОБСТВЕННЫЕ ВЕКТОРЫ
  // =====================================================================
  T[7].tasks = [
    {
      id: "exam2025-demo-q7",
      source: "Демо летнего экзамена, 2025",
      questionLatex: `<p>Известно, что у матрицы $A$ есть собственные векторы $\\vec{v}_1 = (1;\\,1)$ и $\\vec{v}_2 = (1;\\,-1)$ с собственными значениями $\\lambda_1 = -1$ и $\\lambda_2 = 2$. Вычисли $A^5 \\vec{x}$, где $\\vec{x} = (3;\\,1)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1. Идея.</strong> Если $\\vec{x} = c_1\\vec{v}_1 + c_2\\vec{v}_2$, то по линейности и свойству собственных векторов:</p>
<p>$$A^k\\vec{x} = c_1\\,\\lambda_1^k\\,\\vec{v}_1 + c_2\\,\\lambda_2^k\\,\\vec{v}_2.$$</p>

<p><strong>Шаг 2. Разложение.</strong> Найдём $c_1,c_2$ из системы $c_1\\vec{v}_1 + c_2\\vec{v}_2 = \\vec{x}$:</p>
<p>$$\\begin{cases} c_1 + c_2 = 3, \\\\ c_1 - c_2 = 1. \\end{cases}$$</p>
<p>Складываем: $2c_1 = 4 \\Rightarrow c_1 = 2$. Тогда $c_2 = 1$.</p>

<p><strong>Шаг 3. Степени.</strong> $\\lambda_1^5 = (-1)^5 = -1$, $\\;\\lambda_2^5 = 2^5 = 32$.</p>

<p><strong>Шаг 4. Сборка.</strong></p>
<p>$$A^5\\vec{x} = 2\\cdot(-1)\\cdot(1;\\,1) + 1\\cdot 32\\cdot(1;\\,-1) = (-2;\\,-2) + (32;\\,-32) = (30;\\,-34).$$</p>

<hr>
<p><strong>Ответ:</strong> $A^5\\vec{x} = \\begin{pmatrix}30\\\\-34\\end{pmatrix}$.</p>
      `
    },

    {
      id: "exam2025-v1-q7",
      source: "Летний экзамен, 2025, вариант 1",
      questionLatex: `<p>Известно, что $\\vec{v}_1 = \\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix},\\; \\vec{v}_2 = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix},\\; \\vec{v}_3 = \\begin{pmatrix}1\\\\-1\\\\-2\\end{pmatrix}$ — собственные векторы матрицы $A$ с собственными значениями $\\lambda_1 = 3,\\; \\lambda_2 = 2,\\; \\lambda_3 = -6$. Найди $A\\vec{a}$, где $\\vec{a} = \\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Разложим $\\vec{a}$ по базису из собственных векторов: $\\vec{a} = c_1\\vec{v}_1 + c_2\\vec{v}_2 + c_3\\vec{v}_3$. Это даёт систему</p>
<p>$$\\begin{cases} c_1 + c_2 + c_3 = 3, \\\\ -c_1 + c_2 - c_3 = 2, \\\\ c_1 + 0\\cdot c_2 - 2c_3 = 1. \\end{cases}$$</p>

<p><strong>Шаг 2.</strong> Сложим первые два уравнения:</p>
<p>$$2c_2 = 5 \\;\\Rightarrow\\; c_2 = \\tfrac{5}{2}.$$</p>

<p>Вычтем третье из первого: $c_2 + 3c_3 = 2$, то есть $\\tfrac{5}{2} + 3c_3 = 2 \\Rightarrow c_3 = -\\tfrac{1}{6}$.</p>

<p>Из третьего: $c_1 = 1 + 2c_3 = 1 - \\tfrac{1}{3} = \\tfrac{2}{3}$.</p>

<p><strong>Шаг 3. Проверка.</strong> $c_1 + c_2 + c_3 = \\tfrac{2}{3} + \\tfrac{5}{2} - \\tfrac{1}{6} = \\tfrac{4 + 15 - 1}{6} = \\tfrac{18}{6} = 3$</p>

<p><strong>Шаг 4.</strong> Применяем матрицу:</p>
<p>$$A\\vec{a} = c_1\\lambda_1\\vec{v}_1 + c_2\\lambda_2\\vec{v}_2 + c_3\\lambda_3\\vec{v}_3.$$</p>
<p>Коэффициенты: $c_1\\lambda_1 = \\tfrac{2}{3}\\cdot 3 = 2$, $\\;c_2\\lambda_2 = \\tfrac{5}{2}\\cdot 2 = 5$, $\\;c_3\\lambda_3 = -\\tfrac{1}{6}\\cdot(-6) = 1$.</p>

<p><strong>Шаг 5. Сборка вектора.</strong></p>
<p>$$A\\vec{a} = 2\\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix} + 5\\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix} + 1\\begin{pmatrix}1\\\\-1\\\\-2\\end{pmatrix} = \\begin{pmatrix}2+5+1\\\\-2+5-1\\\\2+0-2\\end{pmatrix} = \\begin{pmatrix}8\\\\2\\\\0\\end{pmatrix}.$$</p>

<hr>
<p><strong>Ответ:</strong> $A\\vec{a} = \\begin{pmatrix}8\\\\2\\\\0\\end{pmatrix}$.</p>
      `
    },

    {
      id: "exam2025-v2-q7",
      source: "Летний экзамен, 2025, вариант 2",
      questionLatex: `<p>Известно, что $\\vec{v}_1 = \\begin{pmatrix}1\\\\-1\\\\-1\\end{pmatrix},\\; \\vec{v}_2 = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix},\\; \\vec{v}_3 = \\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix}$ — собственные векторы матрицы $A$ с собственными значениями $\\lambda_1 = 3,\\; \\lambda_2 = -2,\\; \\lambda_3 = 6$. Найди $A\\vec{a}$, где $\\vec{a} = \\begin{pmatrix}3\\\\-2\\\\1\\end{pmatrix}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Разложим $\\vec{a} = c_1\\vec{v}_1 + c_2\\vec{v}_2 + c_3\\vec{v}_3$:</p>
<p>$$\\begin{cases} c_1 + c_2 + c_3 = 3, \\\\ -c_1 + c_2 - c_3 = -2, \\\\ -c_1 + 0 + 2c_3 = 1. \\end{cases}$$</p>

<p><strong>Шаг 2.</strong> Сложим первые два уравнения: $2c_2 = 1 \\Rightarrow c_2 = \\tfrac{1}{2}$.</p>

<p>Вычтем второе из первого: $2c_1 + 2c_3 = 5 \\Rightarrow c_1 + c_3 = \\tfrac{5}{2}$.</p>

<p>Из третьего: $c_1 - 2c_3 = -1$. Вычтем его из $c_1 + c_3 = \\tfrac{5}{2}$:</p>
<p>$$3c_3 = \\tfrac{7}{2} \\;\\Rightarrow\\; c_3 = \\tfrac{7}{6}, \\quad c_1 = \\tfrac{5}{2} - \\tfrac{7}{6} = \\tfrac{15 - 7}{6} = \\tfrac{4}{3}.$$</p>

<p><strong>Шаг 3. Проверка.</strong> $c_1 + c_2 + c_3 = \\tfrac{4}{3} + \\tfrac{1}{2} + \\tfrac{7}{6} = \\tfrac{8+3+7}{6} = 3$</p>

<p><strong>Шаг 4.</strong> Применяем $A$:</p>
<p>$$A\\vec{a} = c_1\\lambda_1\\vec{v}_1 + c_2\\lambda_2\\vec{v}_2 + c_3\\lambda_3\\vec{v}_3.$$</p>
<p>Коэффициенты: $c_1\\lambda_1 = \\tfrac{4}{3}\\cdot 3 = 4$, $\\;c_2\\lambda_2 = \\tfrac{1}{2}\\cdot(-2) = -1$, $\\;c_3\\lambda_3 = \\tfrac{7}{6}\\cdot 6 = 7$.</p>

<p><strong>Шаг 5. Сборка.</strong></p>
<p>$$A\\vec{a} = 4\\begin{pmatrix}1\\\\-1\\\\-1\\end{pmatrix} - \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix} + 7\\begin{pmatrix}1\\\\-1\\\\2\\end{pmatrix} = \\begin{pmatrix}4-1+7\\\\-4-1-7\\\\-4-0+14\\end{pmatrix} = \\begin{pmatrix}10\\\\-12\\\\10\\end{pmatrix}.$$</p>

<hr>
<p><strong>Ответ:</strong> $A\\vec{a} = \\begin{pmatrix}10\\\\-12\\\\10\\end{pmatrix}$.</p>
      `
    },

    {
      id: "kr2-2024-v13-q7",
      source: "КР №2, 2024–2025, варианты 1 и 3, задача №19 (тест)",
      questionLatex: `<p>Известно, что у матрицы $A$ есть собственные векторы $\\vec{v}_1 = (1;\\,1)$ и $\\vec{v}_2 = (1;\\,-1)$ с собственными значениями $\\lambda_1 = -1$ и $\\lambda_2 = 1$. Вычисли $A^{1001} \\vec{x}$, где $\\vec{x} = (3;\\,1)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Разложим $\\vec{x} = c_1\\vec{v}_1 + c_2\\vec{v}_2$:</p>
<p>$$\\begin{cases} c_1 + c_2 = 3, \\\\ c_1 - c_2 = 1, \\end{cases} \\;\\Rightarrow\\; c_1 = 2,\\; c_2 = 1.$$</p>

<p><strong>Шаг 2. Степени.</strong> $\\lambda_1^{1001} = (-1)^{1001} = -1$ (показатель нечётный). $\\;\\lambda_2^{1001} = 1^{1001} = 1$.</p>

<p><strong>Шаг 3.</strong> Применяем формулу $A^k\\vec{x} = c_1\\lambda_1^k\\vec{v}_1 + c_2\\lambda_2^k\\vec{v}_2$:</p>
<p>$$A^{1001}\\vec{x} = 2\\cdot(-1)\\cdot(1;\\,1) + 1\\cdot 1\\cdot(1;\\,-1) = (-2;\\,-2) + (1;\\,-1) = (-1;\\,-3).$$</p>

<hr>
<p><strong>Ответ:</strong> $A^{1001}\\vec{x} = \\begin{pmatrix}-1\\\\-3\\end{pmatrix}$.</p>
      `
    },

    {
      id: "kr2-2024-v24-q7",
      source: "КР №2, 2024–2025, варианты 2 и 4, задача №19 (тест)",
      questionLatex: `<p>Известно, что у матрицы $A$ есть собственные векторы $\\vec{v}_1 = (1;\\,1)$ и $\\vec{v}_2 = (1;\\,-1)$ с собственными значениями $\\lambda_1 = 1$ и $\\lambda_2 = -1$. Вычисли $A^{1001} \\vec{x}$, где $\\vec{x} = (4;\\,2)$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Разложим $\\vec{x} = c_1\\vec{v}_1 + c_2\\vec{v}_2$:</p>
<p>$$\\begin{cases} c_1 + c_2 = 4, \\\\ c_1 - c_2 = 2, \\end{cases} \\;\\Rightarrow\\; c_1 = 3,\\; c_2 = 1.$$</p>

<p><strong>Шаг 2. Степени.</strong> $\\lambda_1^{1001} = 1$, $\\;\\lambda_2^{1001} = (-1)^{1001} = -1$.</p>

<p><strong>Шаг 3.</strong> По формуле:</p>
<p>$$A^{1001}\\vec{x} = 3\\cdot 1\\cdot(1;\\,1) + 1\\cdot(-1)\\cdot(1;\\,-1) = (3;\\,3) + (-1;\\,1) = (2;\\,4).$$</p>

<hr>
<p><strong>Ответ:</strong> $A^{1001}\\vec{x} = \\begin{pmatrix}2\\\\4\\end{pmatrix}$.</p>
      `
    },

    {
      id: "kr2-2024-v13-q7b",
      source: "КР №2, 2024–2025, варианты 1 и 3, задача №18 (тест)",
      questionLatex: `<p>Дана матрица
$$B = \\begin{pmatrix}0 & 1 & 1 & 1 \\\\ 1 & 0 & 1 & 1 \\\\ 1 & 1 & 0 & 1 \\\\ 1 & 1 & 1 & 0\\end{pmatrix}$$
и базис из её собственных векторов: $\\vec{v}_1 = (1;\\,0;\\,0;\\,-1)$, $\\vec{v}_2 = (-1;\\,0;\\,1;\\,0)$, $\\vec{v}_3 = (1;\\,-1;\\,0;\\,0)$, $\\vec{v}_4 = (1;\\,1;\\,1;\\,1)$. Укажи наибольшее собственное значение матрицы $B$.</p>`,
      solutionHtml: `
<p><strong>Идея.</strong> Если $\\vec{v}_i$ — собственный вектор матрицы $B$, то $B\\vec{v}_i = \\lambda_i\\vec{v}_i$. Чтобы найти $\\lambda_i$, перемножим $B$ на $\\vec{v}_i$ и сравним с $\\vec{v}_i$ покомпонентно.</p>

<p><strong>Шаг 1.</strong> Заметим, что $\\vec{v}_4 = (1;\\,1;\\,1;\\,1)$ — вектор из единиц. Каждая строка $B$ содержит ровно три единицы, поэтому:</p>
<p>$$B\\vec{v}_4 = (3;\\,3;\\,3;\\,3) = 3\\,\\vec{v}_4 \\;\\Rightarrow\\; \\lambda_4 = 3.$$</p>

<p><strong>Шаг 2.</strong> Проверим $\\vec{v}_1 = (1;\\,0;\\,0;\\,-1)$:</p>
<ul>
  <li>1-я компонента: $0\\cdot 1 + 1\\cdot 0 + 1\\cdot 0 + 1\\cdot(-1) = -1$;</li>
  <li>2-я: $1 + 0 + 0 + (-1) = 0$;</li>
  <li>3-я: $1 + 0 + 0 + (-1) = 0$;</li>
  <li>4-я: $1 + 0 + 0 + 0 = 1$.</li>
</ul>
<p>Получили $B\\vec{v}_1 = (-1;\\,0;\\,0;\\,1) = -1\\cdot\\vec{v}_1$, то есть $\\lambda_1 = -1$.</p>

<p><strong>Шаг 3.</strong> Аналогично можно убедиться, что $\\lambda_2 = \\lambda_3 = -1$ (проверка для $\\vec{v}_2,\\vec{v}_3$ даст $B\\vec{v}_i = -\\vec{v}_i$).</p>

<p><strong>Шаг 4.</strong> Спектр $B$: $\\{-1,-1,-1,3\\}$. Это согласуется со следом: $\\operatorname{tr} B = 0 = -1-1-1+3$</p>

<p>Наибольшее собственное значение — это значение, соответствующее «постоянному» собственному вектору $\\vec{v}_4$.</p>

<hr>
<p><strong>Ответ:</strong> наибольшее собственное значение $\\lambda_{\\max} = 3$.</p>
      `
    },

    {
      id: "kr2-2024-v24-q7b",
      source: "КР №2, 2024–2025, варианты 2 и 4, задача №18 (тест)",
      questionLatex: `<p>Дана матрица
$$B = \\begin{pmatrix}1 & 1 & 1 & 0 \\\\ 1 & 1 & 0 & 1 \\\\ 1 & 0 & 1 & 1 \\\\ 0 & 1 & 1 & 1\\end{pmatrix}$$
и базис из её собственных векторов: $\\vec{v}_1 = (1;\\,-1;\\,-1;\\,1)$, $\\vec{v}_2 = (0;\\,-1;\\,1;\\,0)$, $\\vec{v}_3 = (-1;\\,0;\\,0;\\,1)$, $\\vec{v}_4 = (1;\\,1;\\,1;\\,1)$. Укажи наибольшее собственное значение матрицы $B$.</p>`,
      solutionHtml: `
<p><strong>Идея.</strong> Чтобы найти собственное значение, умножим $B$ на каждый $\\vec{v}_i$ и сравним результат с $\\vec{v}_i$.</p>

<p><strong>Шаг 1.</strong> Для $\\vec{v}_4 = (1;\\,1;\\,1;\\,1)$. В каждой строке $B$ ровно три единицы, поэтому:</p>
<p>$$B\\vec{v}_4 = (3;\\,3;\\,3;\\,3) = 3\\,\\vec{v}_4 \\;\\Rightarrow\\; \\lambda_4 = 3.$$</p>

<p><strong>Шаг 2.</strong> Проверим $\\vec{v}_1 = (1;\\,-1;\\,-1;\\,1)$:</p>
<ul>
  <li>1-я: $1\\cdot 1 + 1\\cdot(-1) + 1\\cdot(-1) + 0\\cdot 1 = -1$;</li>
  <li>2-я: $1 + (-1) + 0 + 1 = 1$;</li>
  <li>3-я: $1 + 0 + (-1) + 1 = 1$;</li>
  <li>4-я: $0 + (-1) + (-1) + 1 = -1$.</li>
</ul>
<p>Получили $B\\vec{v}_1 = (-1;\\,1;\\,1;\\,-1) = -1\\cdot\\vec{v}_1$, то есть $\\lambda_1 = -1$.</p>

<p><strong>Шаг 3.</strong> Проверим $\\vec{v}_2 = (0;\\,-1;\\,1;\\,0)$:</p>
<ul>
  <li>1-я: $0 + (-1) + 1 + 0 = 0$;</li>
  <li>2-я: $0 + (-1) + 0 + 0 = -1$;</li>
  <li>3-я: $0 + 0 + 1 + 0 = 1$;</li>
  <li>4-я: $0 + (-1) + 1 + 0 = 0$.</li>
</ul>
<p>$B\\vec{v}_2 = (0;\\,-1;\\,1;\\,0) = 1\\cdot\\vec{v}_2$, то есть $\\lambda_2 = 1$.</p>

<p><strong>Шаг 4.</strong> Аналогично для $\\vec{v}_3 = (-1;\\,0;\\,0;\\,1)$ получится $\\lambda_3 = 1$.</p>

<p><strong>Шаг 5.</strong> Спектр $B$: $\\{-1,\\,1,\\,1,\\,3\\}$ (проверка по следу: $\\operatorname{tr} B = 4$ и $-1+1+1+3 = 4$). Максимум — $3$.</p>

<hr>
<p><strong>Ответ:</strong> $\\lambda_{\\max} = 3$.</p>
      `
    },
    {
      id: 'kr2-s2-25-26-q7-slau-rank-ker',
      source: 'КР №2, 2 сем. 2025–2026, 1 балл',
      questionLatex: `<p>Реши систему линейных уравнений $A\\vec{x} = \\vec{b}$, где</p>
<p>$$A = \\begin{pmatrix} 1 & 1 & 2 & 3 \\\\ 2 & 3 & 5 & 7 \\\\ 3 & 4 & 7 & 10 \\end{pmatrix}, \\qquad \\vec{b} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}.$$</p>
<p>Найди ранг и ядро матрицы $A$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1.</strong> Записываем расширенную матрицу и приводим к ступенчатому виду элементарными преобразованиями строк.</p>
<p>$$[A\\,|\\,\\vec{b}] = \\begin{pmatrix} 1 & 1 & 2 & 3 & |& 1 \\\\ 2 & 3 & 5 & 7 &|& 2 \\\\ 3 & 4 & 7 & 10 &|& 3 \\end{pmatrix}.$$</p>

<p>$R_2 \\leftarrow R_2 - 2R_1$, $R_3 \\leftarrow R_3 - 3R_1$:</p>
<p>$$\\begin{pmatrix} 1 & 1 & 2 & 3 & |& 1 \\\\ 0 & 1 & 1 & 1 &|& 0 \\\\ 0 & 1 & 1 & 1 &|& 0 \\end{pmatrix}.$$</p>

<p>$R_3 \\leftarrow R_3 - R_2$:</p>
<p>$$\\begin{pmatrix} 1 & 1 & 2 & 3 & |& 1 \\\\ 0 & 1 & 1 & 1 &|& 0 \\\\ 0 & 0 & 0 & 0 &|& 0 \\end{pmatrix}.$$</p>

<p><strong>Шаг 2. Ранг и совместность.</strong> В ступенчатой форме два ненулевых ряда, поэтому $\\operatorname{rank} A = 2$. Последний ряд $(0\\,0\\,0\\,0\\,|\\,0)$ даёт $0 = 0$, то есть система <em>совместна</em>: $\\operatorname{rank}(A|\\vec{b}) = 2 = \\operatorname{rank} A$.</p>

<p><strong>Шаг 3. Параметризация.</strong> Ведущие переменные — $x_1, x_2$; свободные — $x_3 = s$, $x_4 = t$. Из второй строки:</p>
<p>$$x_2 + s + t = 0 \\;\\Rightarrow\\; x_2 = -s - t.$$</p>
<p>Из первой строки:</p>
<p>$$x_1 + x_2 + 2s + 3t = 1 \\;\\Rightarrow\\; x_1 = 1 - (-s-t) - 2s - 3t = 1 - s - 2t.$$</p>

<p><strong>Шаг 4. Общее решение.</strong></p>
<p>$$\\vec{x} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix} + s \\begin{pmatrix} -1 \\\\ -1 \\\\ 1 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} -2 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix}, \\qquad s,t \\in \\mathbb{R}.$$</p>

<p><strong>Шаг 5. Ядро.</strong> Векторы при свободных параметрах — это как раз базис ядра:</p>
<p>$$\\ker A = \\operatorname{span}\\left\\{ \\begin{pmatrix} -1 \\\\ -1 \\\\ 1 \\\\ 0 \\end{pmatrix},\\; \\begin{pmatrix} -2 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\}, \\qquad \\dim \\ker A = 4 - 2 = 2.$$</p>

<p>Проверим: $A\\cdot(-1,-1,1,0)^{\\!\\top} = (-1-1+2+0,\\; -2-3+5+0,\\; -3-4+7+0)^{\\!\\top} = \\vec{0}$ — верно.</p>

<hr>
<p><strong>Ответы:</strong></p>
<ul>
  <li>$\\operatorname{rank} A = 2$,&nbsp; $\\dim \\ker A = 2$;</li>
  <li>частное решение $\\vec{x}_0 = (1,\\,0,\\,0,\\,0)^{\\!\\top}$;</li>
  <li>базис ядра: $(-1,\\,-1,\\,1,\\,0)^{\\!\\top}$ и $(-2,\\,-1,\\,0,\\,1)^{\\!\\top}$.</li>
</ul>
      `
    },
    {
      id: 'kr2-s2-25-26-lu-solve',
      source: 'КР №2, 2 сем. 2025–2026, 0.5 балла',
      questionLatex: `<p>Реши систему уравнений $LU\\vec{x} = \\vec{b}$, где</p>
<p>$$L = \\begin{pmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 2 & 4 & 1 \\end{pmatrix},\\quad U = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 3 & 1 \\\\ 0 & 0 & 4 \\end{pmatrix},\\quad \\vec{b} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 6 \\end{pmatrix}.$$</p>`,
      solutionHtml: `
<p><strong>Идея.</strong> Когда $A = LU$ уже известно, решение $A\\vec{x} = \\vec{b}$ распадается на два треугольных шага: <em>прямой ход</em> $L\\vec{y} = \\vec{b}$ и <em>обратный ход</em> $U\\vec{x} = \\vec{y}$. Оба решаются подстановкой сверху-вниз / снизу-вверх.</p>

<p><strong>Шаг 1. Прямой ход: $L\\vec{y} = \\vec{b}$.</strong></p>
<p>$$\\begin{pmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 2 & 4 & 1 \\end{pmatrix} \\begin{pmatrix} y_1 \\\\ y_2 \\\\ y_3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 6 \\end{pmatrix}.$$</p>
<p>Построчно:</p>
<ul>
  <li>$y_1 = 1$;</li>
  <li>$3 y_1 + y_2 = 2 \\;\\Rightarrow\\; y_2 = 2 - 3 = -1$;</li>
  <li>$2 y_1 + 4 y_2 + y_3 = 6 \\;\\Rightarrow\\; y_3 = 6 - 2 - 4\\cdot(-1) = 6 - 2 + 4 = 8$.</li>
</ul>
<p>Итого $\\vec{y} = (1,\\,-1,\\,8)^{\\!\\top}$.</p>

<p><strong>Шаг 2. Обратный ход: $U\\vec{x} = \\vec{y}$.</strong></p>
<p>$$\\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 3 & 1 \\\\ 0 & 0 & 4 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 8 \\end{pmatrix}.$$</p>
<p>Снизу вверх:</p>
<ul>
  <li>$4 x_3 = 8 \\;\\Rightarrow\\; x_3 = 2$;</li>
  <li>$3 x_2 + x_3 = -1 \\;\\Rightarrow\\; 3 x_2 = -3 \\;\\Rightarrow\\; x_2 = -1$;</li>
  <li>$2 x_1 + x_2 = 1 \\;\\Rightarrow\\; 2 x_1 = 2 \\;\\Rightarrow\\; x_1 = 1$.</li>
</ul>

<hr>
<p><strong>Ответ:</strong> $\\vec{x} = (1,\\,-1,\\,2)^{\\!\\top}$.</p>
      `
    }
  ];

  // =====================================================================
  //  ТИП 8: НЕОПРЕДЕЛЁННЫЙ ИНТЕГРАЛ МЕТОДОМ ЗАМЕНЫ
  // =====================================================================
  T[8].tasks = [
    {
      id: "exam2025-demo-q8",
      source: "Демо летнего экзамена, 2025",
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int x\\,\\sin(x^2)\\,dx$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1. Замена.</strong> В подынтегральной функции есть «удобная пара»: $x^2$ внутри синуса и множитель $x$ снаружи. Положим</p>
<p>$$u = x^2 \\;\\Rightarrow\\; du = 2x\\,dx \\;\\Rightarrow\\; x\\,dx = \\tfrac{1}{2}\\,du.$$</p>

<p><strong>Шаг 2. Подстановка.</strong></p>
<p>$$\\int x\\sin(x^2)\\,dx \\;=\\; \\int \\sin(u)\\cdot \\tfrac{1}{2}\\,du \\;=\\; \\tfrac{1}{2}\\int \\sin u\\,du.$$</p>

<p><strong>Шаг 3. Первообразная.</strong> $\\displaystyle\\int \\sin u\\,du = -\\cos u + C$, поэтому</p>
<p>$$\\tfrac{1}{2}\\int \\sin u\\,du = -\\tfrac{1}{2}\\cos u + C.$$</p>

<p><strong>Шаг 4. Обратная подстановка.</strong> Возвращаем $u = x^2$:</p>
<p>$$\\int x\\sin(x^2)\\,dx = -\\tfrac{1}{2}\\cos(x^2) + C.$$</p>

<p><strong>Проверка.</strong> $\\dfrac{d}{dx}\\left[-\\tfrac{1}{2}\\cos(x^2)\\right] = -\\tfrac{1}{2}\\cdot(-\\sin(x^2))\\cdot 2x = x\\sin(x^2)$</p>

<hr>
<p><strong>Ответ:</strong> $-\\dfrac{1}{2}\\cos(x^2) + C$.</p>
      `
    },

    {
      id: "exam2025-v1-q8",
      source: "Летний экзамен, 2025, вариант 1",
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int \\dfrac{(\\ln x)^3}{x}\\,dx$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1. Замена.</strong> Заметим, что $\\dfrac{1}{x}\\,dx$ — это в точности $d(\\ln x)$. Положим</p>
<p>$$u = \\ln x \\;\\Rightarrow\\; du = \\dfrac{dx}{x}.$$</p>

<p><strong>Шаг 2. Подстановка.</strong></p>
<p>$$\\int \\frac{(\\ln x)^3}{x}\\,dx = \\int u^3\\,du.$$</p>

<p><strong>Шаг 3. Первообразная степенной функции.</strong></p>
<p>$$\\int u^3\\,du = \\dfrac{u^4}{4} + C.$$</p>

<p><strong>Шаг 4. Обратная подстановка.</strong></p>
<p>$$\\int \\frac{(\\ln x)^3}{x}\\,dx = \\dfrac{(\\ln x)^4}{4} + C.$$</p>

<p><strong>Проверка.</strong> $\\dfrac{d}{dx}\\left[\\dfrac{(\\ln x)^4}{4}\\right] = \\dfrac{4(\\ln x)^3}{4}\\cdot \\dfrac{1}{x} = \\dfrac{(\\ln x)^3}{x}$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{(\\ln x)^4}{4} + C$.</p>
      `
    },

    {
      id: "exam2025-v2-q8",
      source: "Летний экзамен, 2025, вариант 2",
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int \\dfrac{dx}{x\\,(\\ln x)^2}$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1. Замена.</strong> Снова используем $du = dx/x$:</p>
<p>$$u = \\ln x \\;\\Rightarrow\\; du = \\dfrac{dx}{x}.$$</p>

<p><strong>Шаг 2. Подстановка.</strong></p>
<p>$$\\int \\dfrac{dx}{x\\,(\\ln x)^2} = \\int \\dfrac{du}{u^2} = \\int u^{-2}\\,du.$$</p>

<p><strong>Шаг 3. Первообразная.</strong> $\\displaystyle\\int u^{-2}\\,du = \\dfrac{u^{-1}}{-1} + C = -\\dfrac{1}{u} + C$.</p>

<p><strong>Шаг 4. Обратная подстановка.</strong></p>
<p>$$\\int \\dfrac{dx}{x\\,(\\ln x)^2} = -\\dfrac{1}{\\ln x} + C.$$</p>

<p><strong>Проверка.</strong> $\\dfrac{d}{dx}\\left[-\\dfrac{1}{\\ln x}\\right] = \\dfrac{1}{(\\ln x)^2}\\cdot \\dfrac{1}{x} = \\dfrac{1}{x(\\ln x)^2}$</p>

<hr>
<p><strong>Ответ:</strong> $-\\dfrac{1}{\\ln x} + C$.</p>
      `
    },

    {
      id: "kr3-2024-demo-q8",
      source: "Демо-вариант КР №3, 2024–2025, задача №3 (тест)",
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int \\dfrac{x}{1 + x^2}\\,dx$.</p>`,
      solutionHtml: `
<p><strong>Шаг 1. Замена.</strong> В числителе стоит $x\\,dx$, а в знаменателе — $1 + x^2$, производная которого как раз $2x$. Положим</p>
<p>$$u = 1 + x^2 \\;\\Rightarrow\\; du = 2x\\,dx \\;\\Rightarrow\\; x\\,dx = \\tfrac{1}{2}\\,du.$$</p>

<p><strong>Шаг 2. Подстановка.</strong></p>
<p>$$\\int \\dfrac{x\\,dx}{1+x^2} = \\int \\dfrac{1}{u}\\cdot \\tfrac{1}{2}\\,du = \\tfrac{1}{2}\\int \\dfrac{du}{u}.$$</p>

<p><strong>Шаг 3. Первообразная.</strong> $\\displaystyle\\int \\dfrac{du}{u} = \\ln|u| + C$. Поскольку $u = 1+x^2 > 0$, модуль можно опустить.</p>
<p>$$\\tfrac{1}{2}\\ln|u| + C = \\tfrac{1}{2}\\ln(1+x^2) + C.$$</p>

<p><strong>Шаг 4. Обратная подстановка.</strong></p>
<p>$$\\int \\dfrac{x}{1 + x^2}\\,dx = \\tfrac{1}{2}\\ln(1+x^2) + C.$$</p>

<p><strong>Проверка.</strong> $\\dfrac{d}{dx}\\left[\\tfrac{1}{2}\\ln(1+x^2)\\right] = \\tfrac{1}{2}\\cdot \\dfrac{2x}{1+x^2} = \\dfrac{x}{1+x^2}$</p>

<hr>
<p><strong>Ответ:</strong> $\\dfrac{1}{2}\\ln(1+x^2) + C$.</p>
      `
    }
  ];

})();
