/**
 * Задачи для типов 13-16 РешуМИА.
 *
 *   Тип 13 — собственные значения и векторы матрицы 2×2
 *   Тип 14 — интегрирование по частям (неопределённый/определённый)
 *   Тип 15 — определённый интеграл: замена и/или по частям
 *   Тип 16 — площади и объёмы тел вращения (диски/цилиндры)
 */
(function () {
  if (!window.TASK_BANK) return;
  const T = window.TASK_BANK;

  // ============================================================
  //   ТИП 13: собственные значения и собственные векторы 2×2
  // ============================================================
  T[13].tasks = [
    {
      id: 'exam2025-demo-q13',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `<p>Найди собственные значения и ортонормированный базис из собственных векторов матрицы:</p>$$A = \\begin{pmatrix} 1 & 3 \\\\ 1 & -1 \\end{pmatrix}.$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Составим характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 3 \\\\ 1 & -1-\\lambda \\end{pmatrix} = (1-\\lambda)(-1-\\lambda) - 3\\cdot 1.$$</p>
        <p>$$ = -(1-\\lambda)(1+\\lambda) - 3 = -(1-\\lambda^2) - 3 = \\lambda^2 - 4.$$</p>
        <p><strong>Шаг 2.</strong> Найдём собственные значения:</p>
        <p>$$\\lambda^2 - 4 = 0 \\;\\Longrightarrow\\; \\lambda_1 = 2,\\quad \\lambda_2 = -2.$$</p>
        <p><strong>Шаг 3.</strong> Собственный вектор для $\\lambda_1 = 2$. Решаем $(A-2I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A - 2I = \\begin{pmatrix} -1 & 3 \\\\ 1 & -3 \\end{pmatrix}.$$</p>
        <p>Получаем уравнение $-v_1 + 3v_2 = 0$, то есть $v_1 = 3v_2$. При $v_2 = 1$ получаем</p>
        <p>$$\\mathbf{v}_1 = \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix},\\qquad \\|\\mathbf{v}_1\\| = \\sqrt{9+1} = \\sqrt{10}.$$</p>
        <p>Нормируем: $\\;\\mathbf{e}_1 = \\dfrac{1}{\\sqrt{10}}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}.$</p>
        <p><strong>Шаг 4.</strong> Собственный вектор для $\\lambda_2 = -2$. Решаем $(A+2I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A + 2I = \\begin{pmatrix} 3 & 3 \\\\ 1 & 1 \\end{pmatrix}.$$</p>
        <p>Получаем $v_1 + v_2 = 0$, то есть $v_1 = -v_2$. При $v_2 = -1$:</p>
        <p>$$\\mathbf{v}_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix},\\qquad \\|\\mathbf{v}_2\\| = \\sqrt{1+1} = \\sqrt{2}.$$</p>
        <p>Нормируем: $\\;\\mathbf{e}_2 = \\dfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}.$</p>
        <p><strong>Шаг 5.</strong> Проверим ортогональность:</p>
        <p>$$\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = 3\\cdot 1 + 1\\cdot(-1) = 2 \\;\\neq\\; 0.$$</p>
        <p>Векторы <em>не ортогональны</em>: матрица $A$ <em>несимметрична</em>, и для несимметричной матрицы собственные векторы из разных собственных подпространств в общем случае не обязаны быть ортогональны. Поэтому строго ортонормированный базис из собственных векторов <em>не существует</em>; можно построить лишь нормированный базис.</p>
        <hr>
        <p><strong>Ответ:</strong> $\\lambda_1 = 2$, $\\lambda_2 = -2$. Нормированные собственные векторы $\\mathbf{e}_1 = \\frac{1}{\\sqrt{10}}\\bigl(3,\\,1\\bigr)^{\\!T}$, $\\mathbf{e}_2 = \\frac{1}{\\sqrt{2}}\\bigl(1,\\,-1\\bigr)^{\\!T}$. Они образуют базис $\\mathbb{R}^2$, но <em>не ортонормированный</em>: $\\mathbf{v}_1\\cdot\\mathbf{v}_2 = 2 \\neq 0$.</p>
      `,
    },

    {
      id: 'exam2025-v1-q13',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Найди собственные значения и нормированный базис из собственных векторов матрицы:</p>$$A = \\begin{pmatrix} 4 & 3 \\\\ -2 & -1 \\end{pmatrix}.$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = (4-\\lambda)(-1-\\lambda) - 3\\cdot(-2) = (4-\\lambda)(-1-\\lambda) + 6.$$</p>
        <p>$$= -4 - 4\\lambda + \\lambda + \\lambda^2 + 6 = \\lambda^2 - 3\\lambda + 2.$$</p>
        <p><strong>Шаг 2.</strong> Корни:</p>
        <p>$$\\lambda^2 - 3\\lambda + 2 = (\\lambda - 1)(\\lambda - 2) = 0 \\;\\Longrightarrow\\; \\lambda_1 = 2,\\;\\lambda_2 = 1.$$</p>
        <p><strong>Шаг 3.</strong> Для $\\lambda_1 = 2$ решаем $(A-2I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A - 2I = \\begin{pmatrix} 2 & 3 \\\\ -2 & -3 \\end{pmatrix}.$$</p>
        <p>Из $2v_1 + 3v_2 = 0$ получаем $v_2 = -\\tfrac{2}{3}v_1$. Берём $v_1 = 3$, $v_2 = -2$:</p>
        <p>$$\\mathbf{v}_1 = \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix},\\qquad \\|\\mathbf{v}_1\\| = \\sqrt{9+4} = \\sqrt{13}.$$</p>
        <p>$$\\mathbf{e}_1 = \\frac{1}{\\sqrt{13}}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}.$$</p>
        <p><strong>Шаг 4.</strong> Для $\\lambda_2 = 1$ решаем $(A-I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A - I = \\begin{pmatrix} 3 & 3 \\\\ -2 & -2 \\end{pmatrix}.$$</p>
        <p>Из $3v_1 + 3v_2 = 0$ получаем $v_2 = -v_1$. При $v_1 = 1$:</p>
        <p>$$\\mathbf{v}_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix},\\qquad \\|\\mathbf{v}_2\\| = \\sqrt{2}.$$</p>
        <p>$$\\mathbf{e}_2 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}.$$</p>
        <p><strong>Проверка.</strong> $A\\mathbf{v}_1 = (4\\cdot 3 + 3\\cdot(-2),\\;-2\\cdot 3 + (-1)\\cdot(-2)) = (6,-4) = 2\\mathbf{v}_1$. $A\\mathbf{v}_2 = (4-3,\\;-2+1) = (1,-1) = \\mathbf{v}_2$.</p>
        <hr>
        <p><strong>Ответ:</strong> $\\lambda_1 = 2,\\;\\lambda_2 = 1$. Нормированный базис: $\\mathbf{e}_1 = \\frac{1}{\\sqrt{13}}(3,\\,-2)^{T}$, $\\mathbf{e}_2 = \\frac{1}{\\sqrt{2}}(1,\\,-1)^{T}$.</p>
      `,
    },

    {
      id: 'exam2025-v2-q13',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Найди собственные значения и нормированный базис из собственных векторов матрицы:</p>$$A = \\begin{pmatrix} 3 & 2 \\\\ -2 & -2 \\end{pmatrix}.$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = (3-\\lambda)(-2-\\lambda) - 2\\cdot(-2) = (3-\\lambda)(-2-\\lambda) + 4.$$</p>
        <p>$$= -6 - 3\\lambda + 2\\lambda + \\lambda^2 + 4 = \\lambda^2 - \\lambda - 2.$$</p>
        <p><strong>Шаг 2.</strong> Корни:</p>
        <p>$$\\lambda^2 - \\lambda - 2 = (\\lambda - 2)(\\lambda + 1) = 0 \\;\\Longrightarrow\\; \\lambda_1 = 2,\\;\\lambda_2 = -1.$$</p>
        <p><strong>Шаг 3.</strong> Для $\\lambda_1 = 2$ решаем $(A-2I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A - 2I = \\begin{pmatrix} 1 & 2 \\\\ -2 & -4 \\end{pmatrix}.$$</p>
        <p>Из $v_1 + 2v_2 = 0$ получаем $v_1 = -2v_2$. При $v_2 = -1$:</p>
        <p>$$\\mathbf{v}_1 = \\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix},\\qquad \\|\\mathbf{v}_1\\| = \\sqrt{4+1} = \\sqrt{5}.$$</p>
        <p>$$\\mathbf{e}_1 = \\frac{1}{\\sqrt{5}}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}.$$</p>
        <p><strong>Шаг 4.</strong> Для $\\lambda_2 = -1$ решаем $(A+I)\\mathbf{v} = \\mathbf{0}$:</p>
        <p>$$A + I = \\begin{pmatrix} 4 & 2 \\\\ -2 & -1 \\end{pmatrix}.$$</p>
        <p>Из $4v_1 + 2v_2 = 0$ получаем $v_2 = -2v_1$. При $v_1 = 1$:</p>
        <p>$$\\mathbf{v}_2 = \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix},\\qquad \\|\\mathbf{v}_2\\| = \\sqrt{1+4} = \\sqrt{5}.$$</p>
        <p>$$\\mathbf{e}_2 = \\frac{1}{\\sqrt{5}}\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}.$$</p>
        <p><strong>Проверка.</strong> $A\\mathbf{v}_1 = (3\\cdot 2 + 2\\cdot(-1),\\;-2\\cdot 2 + (-2)\\cdot(-1)) = (4,-2) = 2\\mathbf{v}_1$. $A\\mathbf{v}_2 = (3 - 4,\\;-2 + 4) = (-1,2) = -\\mathbf{v}_2$.</p>
        <hr>
        <p><strong>Ответ:</strong> $\\lambda_1 = 2,\\;\\lambda_2 = -1$. Нормированный базис: $\\mathbf{e}_1 = \\frac{1}{\\sqrt{5}}(2,\\,-1)^{T}$, $\\mathbf{e}_2 = \\frac{1}{\\sqrt{5}}(1,\\,-2)^{T}$.</p>
      `,
    },

    {
      id: 'kr2-2024-demo-q11',
      source: 'Демо-вариант КР №2, 2024–2025, задача №11 (тест)',
      questionLatex: `<p>Найди собственные значения и собственные векторы матрицы:</p>$$A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}.$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Матрица $A$ симметрична — её собственные значения вещественны, а собственные векторы из разных собственных подпространств автоматически ортогональны.</p>
        <p>Характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = (2-\\lambda)^2 - 1\\cdot 1 = \\lambda^2 - 4\\lambda + 3.$$</p>
        <p><strong>Шаг 2.</strong> Корни:</p>
        <p>$$\\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) = 0 \\;\\Longrightarrow\\; \\lambda_1 = 3,\\;\\lambda_2 = 1.$$</p>
        <p><strong>Шаг 3.</strong> Для $\\lambda_1 = 3$:</p>
        <p>$$A - 3I = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\;\\Rightarrow\\; -v_1 + v_2 = 0 \\;\\Rightarrow\\; \\mathbf{v}_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}.$$</p>
        <p><strong>Шаг 4.</strong> Для $\\lambda_2 = 1$:</p>
        <p>$$A - I = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix} \\;\\Rightarrow\\; v_1 + v_2 = 0 \\;\\Rightarrow\\; \\mathbf{v}_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}.$$</p>
        <p><strong>Проверка ортогональности:</strong> $\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = 1\\cdot 1 + 1\\cdot(-1) = 0$ — векторы ортогональны (как и должно быть для симметричной матрицы).</p>
        <hr>
        <p><strong>Ответ:</strong> $\\lambda_1 = 3$ с собственным вектором $\\mathbf{v}_1 = (1,\\,1)^{T}$; $\\lambda_2 = 1$ с собственным вектором $\\mathbf{v}_2 = (1,\\,-1)^{T}$.</p>
      `,
    },

    {
      id: 'kr2-2024-v13-q17',
      source: 'КР №2, 2024–2025, варианты 1 и 3, задача №17 (тест)',
      questionLatex: `<p>Сколько различных собственных значений у матрицы</p>$$A = \\begin{pmatrix} 4 & -1 \\\\ 4 & 0 \\end{pmatrix}?$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = \\det\\begin{pmatrix} 4-\\lambda & -1 \\\\ 4 & -\\lambda \\end{pmatrix} = (4-\\lambda)(-\\lambda) - (-1)\\cdot 4.$$</p>
        <p>$$= -4\\lambda + \\lambda^2 + 4 = \\lambda^2 - 4\\lambda + 4.$$</p>
        <p><strong>Шаг 2.</strong> Замечаем полный квадрат:</p>
        <p>$$\\lambda^2 - 4\\lambda + 4 = (\\lambda - 2)^2.$$</p>
        <p><strong>Шаг 3.</strong> Уравнение $(\\lambda - 2)^2 = 0$ имеет единственный корень $\\lambda = 2$ кратности $2$.</p>
        <p>Дискриминант квадратного уравнения равен $D = 16 - 16 = 0$, что подтверждает единственный корень.</p>
        <hr>
        <p><strong>Ответ:</strong> $1$ различное собственное значение ($\\lambda = 2$ кратности $2$).</p>
      `,
    },

    {
      id: 'kr2-2024-v24-q17',
      source: 'КР №2, 2024–2025, варианты 2 и 4, задача №17 (тест)',
      questionLatex: `<p>Сколько различных собственных значений у матрицы</p>$$A = \\begin{pmatrix} 3 & -3 \\\\ 3 & 3 \\end{pmatrix}?$$`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Характеристический многочлен:</p>
        <p>$$\\det(A - \\lambda I) = (3-\\lambda)(3-\\lambda) - (-3)\\cdot 3 = (3-\\lambda)^2 + 9.$$</p>
        <p>$$= 9 - 6\\lambda + \\lambda^2 + 9 = \\lambda^2 - 6\\lambda + 18.$$</p>
        <p><strong>Шаг 2.</strong> Дискриминант:</p>
        <p>$$D = 36 - 4\\cdot 18 = 36 - 72 = -36 < 0.$$</p>
        <p>Поскольку $D < 0$, у уравнения $\\lambda^2 - 6\\lambda + 18 = 0$ нет вещественных корней.</p>
        <p><strong>Шаг 3.</strong> Альтернативно: $(3-\\lambda)^2 + 9 = 0 \\Rightarrow (3-\\lambda)^2 = -9$ — невозможно для вещественного $\\lambda$.</p>
        <p>(Над $\\mathbb{C}$ имеем $\\lambda = 3 \\pm 3i$ — две различные комплексные ветви.)</p>
        <hr>
        <p><strong>Ответ:</strong> $0$ вещественных собственных значений.</p>
      `,
    },
  ];

  // ============================================================
  //   ТИП 14: интегрирование по частям
  // ============================================================
  T[14].tasks = [
    {
      id: 'exam2025-demo-q14',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int x^2 e^{-x}\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Многочлен степени $2$ требует двух последовательных интегрирований по частям. Применим формулу $\\int u\\,dv = uv - \\int v\\,du$.</p>
        <p>Полагаем $u = x^2,\\;dv = e^{-x}\\,dx$. Тогда</p>
        <p>$$du = 2x\\,dx,\\qquad v = -e^{-x}.$$</p>
        <p>$$\\int x^2 e^{-x}\\,dx = -x^2 e^{-x} - \\int (-e^{-x})\\cdot 2x\\,dx = -x^2 e^{-x} + 2\\int x e^{-x}\\,dx.$$</p>
        <p><strong>Шаг 2.</strong> Снова интегрируем по частям интеграл $\\int x e^{-x}\\,dx$:</p>
        <p>Полагаем $u = x,\\;dv = e^{-x}\\,dx$, тогда $du = dx,\\;v = -e^{-x}$.</p>
        <p>$$\\int x e^{-x}\\,dx = -x e^{-x} - \\int (-e^{-x})\\,dx = -x e^{-x} + \\int e^{-x}\\,dx = -x e^{-x} - e^{-x} + C_1.$$</p>
        <p><strong>Шаг 3.</strong> Подставляем результат:</p>
        <p>$$\\int x^2 e^{-x}\\,dx = -x^2 e^{-x} + 2\\bigl(-x e^{-x} - e^{-x}\\bigr) + C = -x^2 e^{-x} - 2x e^{-x} - 2e^{-x} + C.$$</p>
        <p><strong>Шаг 4.</strong> Выносим общий множитель $-e^{-x}$:</p>
        <p>$$\\int x^2 e^{-x}\\,dx = -(x^2 + 2x + 2)\\,e^{-x} + C.$$</p>
        <p><strong>Проверка дифференцированием.</strong>
        $\\dfrac{d}{dx}\\!\\left[-(x^2 + 2x + 2)e^{-x}\\right] = -(2x+2)e^{-x} + (x^2+2x+2)e^{-x} = (x^2 - 0\\cdot x + 0)\\,e^{-x} \\cdot\\!\\!$ — после раскрытия получаем $x^2 e^{-x}$. ✓</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int x^2 e^{-x}\\,dx = -(x^2 + 2x + 2)\\,e^{-x} + C$.</p>
      `,
    },

    {
      id: 'exam2025-v1-q14',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int x^2 \\sin(2x)\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Двукратное интегрирование по частям. На первом шаге берём</p>
        <p>$$u = x^2,\\quad dv = \\sin(2x)\\,dx \\;\\Rightarrow\\; du = 2x\\,dx,\\quad v = -\\frac{\\cos(2x)}{2}.$$</p>
        <p>$$\\int x^2 \\sin(2x)\\,dx = -\\frac{x^2 \\cos(2x)}{2} - \\int\\!\\left(-\\frac{\\cos(2x)}{2}\\right)\\cdot 2x\\,dx = -\\frac{x^2 \\cos(2x)}{2} + \\int x\\cos(2x)\\,dx.$$</p>
        <p><strong>Шаг 2.</strong> Считаем $\\int x\\cos(2x)\\,dx$ — снова по частям:</p>
        <p>$$u = x,\\quad dv = \\cos(2x)\\,dx \\;\\Rightarrow\\; du = dx,\\quad v = \\frac{\\sin(2x)}{2}.$$</p>
        <p>$$\\int x\\cos(2x)\\,dx = \\frac{x\\sin(2x)}{2} - \\int \\frac{\\sin(2x)}{2}\\,dx = \\frac{x\\sin(2x)}{2} + \\frac{\\cos(2x)}{4} + C_1.$$</p>
        <p><strong>Шаг 3.</strong> Объединяем:</p>
        <p>$$\\int x^2 \\sin(2x)\\,dx = -\\frac{x^2\\cos(2x)}{2} + \\frac{x\\sin(2x)}{2} + \\frac{\\cos(2x)}{4} + C.$$</p>
        <p><strong>Проверка.</strong> Производная даёт</p>
        <p>$$-x\\cos(2x) + x^2\\sin(2x) + \\frac{\\sin(2x)}{2} + x\\cos(2x) - \\frac{\\sin(2x)}{2} = x^2 \\sin(2x).$$</p>
        <p style="color:var(--success);">✓ верно</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int x^2 \\sin(2x)\\,dx = -\\dfrac{x^2\\cos(2x)}{2} + \\dfrac{x\\sin(2x)}{2} + \\dfrac{\\cos(2x)}{4} + C$.</p>
      `,
    },

    {
      id: 'exam2025-v2-q14',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Вычисли неопределённый интеграл $\\displaystyle\\int x^2 \\cos(2x)\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Двукратное интегрирование по частям. Выбираем</p>
        <p>$$u = x^2,\\quad dv = \\cos(2x)\\,dx \\;\\Rightarrow\\; du = 2x\\,dx,\\quad v = \\frac{\\sin(2x)}{2}.$$</p>
        <p>$$\\int x^2 \\cos(2x)\\,dx = \\frac{x^2 \\sin(2x)}{2} - \\int \\frac{\\sin(2x)}{2}\\cdot 2x\\,dx = \\frac{x^2\\sin(2x)}{2} - \\int x\\sin(2x)\\,dx.$$</p>
        <p><strong>Шаг 2.</strong> Считаем $\\int x\\sin(2x)\\,dx$ по частям:</p>
        <p>$$u = x,\\quad dv = \\sin(2x)\\,dx \\;\\Rightarrow\\; du = dx,\\quad v = -\\frac{\\cos(2x)}{2}.$$</p>
        <p>$$\\int x\\sin(2x)\\,dx = -\\frac{x\\cos(2x)}{2} - \\int\\!\\left(-\\frac{\\cos(2x)}{2}\\right)\\,dx = -\\frac{x\\cos(2x)}{2} + \\frac{\\sin(2x)}{4} + C_1.$$</p>
        <p><strong>Шаг 3.</strong> Подставляем:</p>
        <p>$$\\int x^2\\cos(2x)\\,dx = \\frac{x^2 \\sin(2x)}{2} - \\!\\left(-\\frac{x\\cos(2x)}{2} + \\frac{\\sin(2x)}{4}\\right) + C.$$</p>
        <p>$$ = \\frac{x^2 \\sin(2x)}{2} + \\frac{x\\cos(2x)}{2} - \\frac{\\sin(2x)}{4} + C.$$</p>
        <p><strong>Проверка.</strong> Производная: $x\\sin(2x) + x^2\\cos(2x) + \\tfrac{\\cos(2x)}{2} - x\\sin(2x) - \\tfrac{\\cos(2x)}{2} = x^2 \\cos(2x).$ <span style="color:var(--success);">✓</span></p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int x^2 \\cos(2x)\\,dx = \\dfrac{x^2 \\sin(2x)}{2} + \\dfrac{x\\cos(2x)}{2} - \\dfrac{\\sin(2x)}{4} + C$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q5',
      source: 'Демо-вариант КР №3, 2024–2025, задача №5 (тест)',
      questionLatex: `<p>Найди значение $\\displaystyle\\int_0^1 x e^x\\, dx$, используя интегрирование по частям.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1.</strong> Применим формулу $\\int_a^b u\\,dv = uv\\Big|_a^b - \\int_a^b v\\,du$.</p>
        <p>Полагаем $u = x,\\;dv = e^x\\,dx$, тогда</p>
        <p>$$du = dx,\\quad v = e^x.$$</p>
        <p><strong>Шаг 2.</strong> По формуле:</p>
        <p>$$\\int_0^1 x e^x\\,dx = \\bigl[x e^x\\bigr]_0^1 - \\int_0^1 e^x\\,dx.$$</p>
        <p><strong>Шаг 3.</strong> Считаем по отдельности:</p>
        <p>$$\\bigl[x e^x\\bigr]_0^1 = 1\\cdot e^1 - 0\\cdot e^0 = e.$$</p>
        <p>$$\\int_0^1 e^x\\,dx = \\bigl[e^x\\bigr]_0^1 = e - 1.$$</p>
        <p><strong>Шаг 4.</strong> Объединяем:</p>
        <p>$$\\int_0^1 x e^x\\,dx = e - (e - 1) = 1.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_0^1 x e^x\\,dx = 1$.</p>
      `,
    },
  ];

  // ============================================================
  //   ТИП 15: определённый интеграл — замена и/или по частям
  // ============================================================
  T[15].tasks = [
    {
      id: 'exam2025-demo-q15',
      source: 'Демо летнего экзамена, 2025',
      questionLatex: `<p>Вычисли определённый интеграл $\\displaystyle\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Замена.</strong> Положим $t = \\sqrt{x}$, тогда $x = t^2$ и $dx = 2t\\,dt$.</p>
        <p>Пересчитаем пределы: при $x = 0$ имеем $t = 0$; при $x = \\pi^2$ — $t = \\pi$.</p>
        <p>$$\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\,dx = \\int_0^{\\pi} \\sin(t)\\cdot 2t\\,dt = 2\\int_0^{\\pi} t\\sin(t)\\,dt.$$</p>
        <p><strong>Шаг 2. Интегрирование по частям.</strong> Полагаем $u = t,\\;dv = \\sin(t)\\,dt$, тогда $du = dt,\\;v = -\\cos(t)$.</p>
        <p>$$\\int_0^{\\pi} t\\sin(t)\\,dt = \\bigl[-t\\cos(t)\\bigr]_0^{\\pi} - \\int_0^{\\pi} (-\\cos(t))\\,dt = \\bigl[-t\\cos(t)\\bigr]_0^{\\pi} + \\int_0^{\\pi}\\cos(t)\\,dt.$$</p>
        <p><strong>Шаг 3. Подставляем пределы.</strong></p>
        <p>$$\\bigl[-t\\cos(t)\\bigr]_0^{\\pi} = -\\pi\\cos(\\pi) - (-0\\cdot\\cos 0) = -\\pi\\cdot(-1) - 0 = \\pi.$$</p>
        <p>$$\\int_0^{\\pi}\\cos(t)\\,dt = \\bigl[\\sin(t)\\bigr]_0^{\\pi} = \\sin\\pi - \\sin 0 = 0.$$</p>
        <p>Значит, $\\int_0^{\\pi} t\\sin(t)\\,dt = \\pi + 0 = \\pi$.</p>
        <p><strong>Шаг 4.</strong> Возвращаемся к исходному интегралу:</p>
        <p>$$\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\,dx = 2 \\cdot \\pi = 2\\pi.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\,dx = 2\\pi$.</p>
      `,
    },

    {
      id: 'exam2025-v1-q15',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Вычисли определённый интеграл $\\displaystyle\\int_1^{8} \\dfrac{e^{x^{1/3}}}{x^{1/3}}\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Замена.</strong> Положим $t = x^{1/3}$, тогда $x = t^3$ и $dx = 3t^2\\,dt$. При этом $x^{1/3} = t$.</p>
        <p>Пересчитаем пределы: при $x = 1$ имеем $t = 1$; при $x = 8$ — $t = 2$.</p>
        <p>$$\\int_1^{8} \\frac{e^{x^{1/3}}}{x^{1/3}}\\,dx = \\int_1^{2} \\frac{e^{t}}{t}\\cdot 3t^2\\,dt = 3\\int_1^{2} t\\,e^{t}\\,dt.$$</p>
        <p><strong>Шаг 2. Интегрирование по частям.</strong> Полагаем $u = t,\\;dv = e^t\\,dt$, тогда $du = dt,\\;v = e^t$.</p>
        <p>$$\\int t\\,e^t\\,dt = t e^t - \\int e^t\\,dt = t e^t - e^t + C = (t-1)e^t + C.$$</p>
        <p><strong>Шаг 3. Подставляем пределы.</strong></p>
        <p>$$3\\int_1^{2} t\\,e^t\\,dt = 3\\bigl[(t-1)e^t\\bigr]_1^{2} = 3\\bigl((2-1)e^2 - (1-1)e^1\\bigr) = 3\\bigl(e^2 - 0\\bigr) = 3e^2.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_1^{8} \\dfrac{e^{x^{1/3}}}{x^{1/3}}\\,dx = 3e^2$.</p>
      `,
    },

    {
      id: 'exam2025-v2-q15',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Вычисли определённый интеграл $\\displaystyle\\int_1^{16} \\dfrac{e^{x^{1/4}}}{x^{1/2}}\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Замена.</strong> Положим $t = x^{1/4}$, тогда $x = t^4$ и $dx = 4t^3\\,dt$. При этом $x^{1/2} = (x^{1/4})^2 = t^2$.</p>
        <p>Пересчитаем пределы: при $x = 1$ имеем $t = 1$; при $x = 16$ — $t = 2$.</p>
        <p>$$\\int_1^{16} \\frac{e^{x^{1/4}}}{x^{1/2}}\\,dx = \\int_1^{2} \\frac{e^{t}}{t^2}\\cdot 4t^3\\,dt = 4\\int_1^{2} t\\,e^{t}\\,dt.$$</p>
        <p><strong>Шаг 2. Интегрирование по частям.</strong> $u = t,\\;dv = e^t\\,dt \\Rightarrow du = dt,\\;v = e^t$.</p>
        <p>$$\\int t\\,e^t\\,dt = t e^t - e^t + C = (t-1)e^t + C.$$</p>
        <p><strong>Шаг 3. Подставляем пределы.</strong></p>
        <p>$$4\\int_1^{2} t\\,e^t\\,dt = 4\\bigl[(t-1)e^t\\bigr]_1^{2} = 4\\bigl(1\\cdot e^2 - 0\\cdot e\\bigr) = 4e^2.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_1^{16} \\dfrac{e^{x^{1/4}}}{x^{1/2}}\\,dx = 4e^2$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q4',
      source: 'Демо-вариант КР №3, 2024–2025, задача №4 (тест)',
      questionLatex: `<p>Найди значение $\\displaystyle\\int_0^{\\sqrt{\\pi/2}} 2x \\sin(x^2)\\, dx$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Замена.</strong> Заметим, что под интегралом стоит выражение вида $f(x^2)\\cdot 2x$, что подсказывает замену $t = x^2$. Тогда $dt = 2x\\,dx$, и сама конструкция $2x\\,dx$ полностью «съедается» дифференциалом.</p>
        <p>Пересчитаем пределы: при $x = 0$ имеем $t = 0$; при $x = \\sqrt{\\pi/2}$ — $t = \\pi/2$.</p>
        <p>$$\\int_0^{\\sqrt{\\pi/2}} 2x\\sin(x^2)\\,dx = \\int_0^{\\pi/2} \\sin(t)\\,dt.$$</p>
        <p><strong>Шаг 2. Считаем оставшийся интеграл.</strong></p>
        <p>$$\\int_0^{\\pi/2} \\sin(t)\\,dt = \\bigl[-\\cos(t)\\bigr]_0^{\\pi/2} = -\\cos\\frac{\\pi}{2} + \\cos 0 = 0 + 1 = 1.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_0^{\\sqrt{\\pi/2}} 2x\\sin(x^2)\\,dx = 1$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q16',
      source: 'Демо-вариант КР №3, 2024–2025, задача №16 (тест)',
      questionLatex: `<p>Известно, что $\\displaystyle\\int_1^{2} \\sin(x^2)\\, dx \\approx \\dfrac{1}{2}$. Чему равен $\\displaystyle\\int_1^{4} \\dfrac{\\sin x}{\\sqrt{x}}\\, dx$?</p>`,
      solutionHtml: `
        <p><strong>Идея.</strong> Сводим второй интеграл к первому подходящей заменой. В данном случае хочется получить под синусом квадрат, поэтому естественная замена — $x = t^2$.</p>
        <p><strong>Шаг 1. Замена $x = t^2$ во втором интеграле.</strong> Тогда $dx = 2t\\,dt$ и $\\sqrt{x} = t$.</p>
        <p>Пределы: при $x = 1$ получаем $t = 1$; при $x = 4$ — $t = 2$.</p>
        <p>$$\\int_1^{4} \\frac{\\sin x}{\\sqrt{x}}\\,dx = \\int_1^{2} \\frac{\\sin(t^2)}{t}\\cdot 2t\\,dt = 2\\int_1^{2} \\sin(t^2)\\,dt.$$</p>
        <p><strong>Шаг 2. Подставляем известное значение.</strong> Поскольку $\\int_1^{2} \\sin(t^2)\\,dt \\approx \\dfrac{1}{2}$, получаем</p>
        <p>$$\\int_1^{4} \\frac{\\sin x}{\\sqrt{x}}\\,dx = 2 \\cdot \\frac{1}{2} = 1.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_1^{4} \\dfrac{\\sin x}{\\sqrt{x}}\\,dx \\approx 1$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q13',
      source: 'Демо-вариант КР №3, 2024–2025, задача №13 (тест) — упрощение',
      questionLatex: `<p>Найди значение</p>$$2\\int_1^{e} \\ln\\!\\left(\\dfrac{1}{x}\\right) dx + \\int_1^{e}\\!\\left(2x + \\ln(x^2)\\right) dx.$$`,
      solutionHtml: `
        <p><strong>Шаг 1. Используем свойства логарифма.</strong></p>
        <p>$$\\ln\\!\\left(\\frac{1}{x}\\right) = -\\ln x,\\qquad \\ln(x^2) = 2\\ln x.$$</p>
        <p><strong>Шаг 2. Подставляем и группируем.</strong></p>
        <p>$$2\\int_1^{e} (-\\ln x)\\,dx + \\int_1^{e} \\bigl(2x + 2\\ln x\\bigr)\\,dx$$</p>
        <p>$$= -2\\int_1^{e} \\ln x\\,dx + \\int_1^{e} 2x\\,dx + 2\\int_1^{e} \\ln x\\,dx.$$</p>
        <p><strong>Шаг 3. Слагаемые с $\\int \\ln x\\,dx$ сокращаются.</strong></p>
        <p>$$\\bigl(-2 + 2\\bigr)\\int_1^{e} \\ln x\\,dx + \\int_1^{e} 2x\\,dx = \\int_1^{e} 2x\\,dx.$$</p>
        <p><strong>Шаг 4. Считаем оставшийся простой интеграл.</strong></p>
        <p>$$\\int_1^{e} 2x\\,dx = \\bigl[x^2\\bigr]_1^{e} = e^2 - 1.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $e^2 - 1$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q18',
      source: 'Демо-вариант КР №3, 2024–2025, задача №18 (тест) — теоретическая',
      questionLatex: `<p>Пусть $F(x)$ — первообразная $f(x)$ на промежутке $[a;\\,b]$. Чему равно значение</p>$$\\int_a^b F(x) f(x)\\, dx?$$`,
      solutionHtml: `
        <p><strong>Шаг 1. Ключевое наблюдение.</strong> По условию $F'(x) = f(x)$, поэтому</p>
        <p>$$F(x)\\,f(x) = F(x)\\cdot F'(x) = \\frac{1}{2}\\bigl(F(x)^2\\bigr)'.$$</p>
        <p>Это видно из формулы $\\bigl(F^2\\bigr)' = 2F\\cdot F' = 2F f$.</p>
        <p><strong>Шаг 2. Применяем формулу Ньютона–Лейбница.</strong></p>
        <p>$$\\int_a^b F(x)\\,f(x)\\,dx = \\int_a^b \\frac{1}{2}\\bigl(F^2(x)\\bigr)'\\,dx = \\frac{1}{2}\\bigl[F^2(x)\\bigr]_a^b = \\frac{F^2(b) - F^2(a)}{2}.$$</p>
        <p><strong>Альтернативный вывод</strong> через замену: положим $u = F(x)$, тогда $du = f(x)\\,dx$. Пределы переходят в $F(a)$ и $F(b)$:</p>
        <p>$$\\int_a^b F(x)\\,f(x)\\,dx = \\int_{F(a)}^{F(b)} u\\,du = \\frac{u^2}{2}\\bigg|_{F(a)}^{F(b)} = \\frac{F^2(b) - F^2(a)}{2}.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $\\displaystyle\\int_a^b F(x)\\,f(x)\\,dx = \\dfrac{F^2(b) - F^2(a)}{2}$.</p>
      `,
    },
  ];

  // ============================================================
  //   ТИП 16: площади и объёмы тел вращения
  // ============================================================
  T[16].tasks = [
    {
      id: 'exam2025-v1-q16',
      source: 'Летний экзамен, 2025, вариант 1',
      questionLatex: `<p>Вычисли объём фигуры, полученной при вращении графика $f(x) = \\cos x$ вокруг оси $OY$ при $x \\in [0;\\,\\pi/2]$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Выбор формулы.</strong> Область — криволинейная трапеция между графиком $y = \\cos x$ ($\\geq 0$ на $[0,\\pi/2]$) и осью $OX$. Вращаем вокруг оси $OY$. Удобнее всего <em>метод цилиндрических оболочек</em>, поскольку $x$ играет роль радиуса:</p>
        <p>$$V = 2\\pi \\int_a^b x\\,|f(x)|\\,dx.$$</p>
        <p><strong>Шаг 2. Запись интеграла.</strong></p>
        <p>$$V = 2\\pi \\int_0^{\\pi/2} x\\cos x\\,dx.$$</p>
        <p><strong>Шаг 3. Интегрирование по частям.</strong> Полагаем $u = x,\\;dv = \\cos x\\,dx$, тогда $du = dx,\\;v = \\sin x$.</p>
        <p>$$\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x + \\cos x + C.$$</p>
        <p><strong>Шаг 4. Подставляем пределы.</strong></p>
        <p>$$\\bigl[x\\sin x + \\cos x\\bigr]_0^{\\pi/2} = \\!\\left(\\frac{\\pi}{2}\\sin\\frac{\\pi}{2} + \\cos\\frac{\\pi}{2}\\right) - \\bigl(0\\cdot\\sin 0 + \\cos 0\\bigr) = \\frac{\\pi}{2} - 1.$$</p>
        <p><strong>Шаг 5.</strong> Объём:</p>
        <p>$$V = 2\\pi \\cdot \\!\\left(\\frac{\\pi}{2} - 1\\right) = \\pi^2 - 2\\pi.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $V = \\pi^2 - 2\\pi$.</p>
      `,
    },

    {
      id: 'exam2025-v2-q16',
      source: 'Летний экзамен, 2025, вариант 2',
      questionLatex: `<p>Вычисли объём фигуры, полученной при вращении графика $y = \\sin x$ вокруг оси $OY$ при $x \\in [0;\\,\\pi]$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Выбор формулы.</strong> На $[0,\\pi]$ имеем $\\sin x \\geq 0$. Вращаем вокруг $OY$ — применяем метод цилиндрических оболочек:</p>
        <p>$$V = 2\\pi \\int_a^b x\\,|f(x)|\\,dx = 2\\pi \\int_0^{\\pi} x\\sin x\\,dx.$$</p>
        <p><strong>Шаг 2. Интегрирование по частям.</strong> Полагаем $u = x,\\;dv = \\sin x\\,dx$, тогда $du = dx,\\;v = -\\cos x$.</p>
        <p>$$\\int x\\sin x\\,dx = -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C.$$</p>
        <p><strong>Шаг 3. Подставляем пределы.</strong></p>
        <p>$$\\bigl[-x\\cos x + \\sin x\\bigr]_0^{\\pi} = \\bigl(-\\pi\\cos\\pi + \\sin\\pi\\bigr) - \\bigl(0 + \\sin 0\\bigr) = -\\pi\\cdot(-1) + 0 = \\pi.$$</p>
        <p><strong>Шаг 4.</strong> Объём:</p>
        <p>$$V = 2\\pi \\cdot \\pi = 2\\pi^2.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $V = 2\\pi^2$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q6',
      source: 'Демо-вариант КР №3, 2024–2025, задача №6 (тест)',
      questionLatex: `<p>Рассмотрим область $A$, лежащую между осью $OX$ и графиком функции $y = x^3$ на промежутке $[-\\sqrt{2};\\,2]$. Найди площадь $A$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Анализ знака.</strong> Функция $y = x^3$ отрицательна на $[-\\sqrt{2},\\,0]$ и положительна на $[0,\\,2]$. Площадь — это интеграл от <em>модуля</em>, поэтому промежуток нужно разбить:</p>
        <p>$$S = \\int_{-\\sqrt{2}}^{2} |x^3|\\,dx = \\int_{-\\sqrt{2}}^{0} (-x^3)\\,dx + \\int_{0}^{2} x^3\\,dx.$$</p>
        <p><strong>Шаг 2. Считаем первое слагаемое.</strong></p>
        <p>$$\\int_{-\\sqrt{2}}^{0} (-x^3)\\,dx = -\\!\\left[\\frac{x^4}{4}\\right]_{-\\sqrt{2}}^{0} = -\\!\\left(0 - \\frac{(-\\sqrt{2})^4}{4}\\right) = -\\!\\left(-\\frac{4}{4}\\right) = 1.$$</p>
        <p>(Здесь $(-\\sqrt{2})^4 = ((\\sqrt{2})^2)^2 = 2^2 = 4$.)</p>
        <p><strong>Шаг 3. Считаем второе слагаемое.</strong></p>
        <p>$$\\int_{0}^{2} x^3\\,dx = \\left[\\frac{x^4}{4}\\right]_{0}^{2} = \\frac{16}{4} - 0 = 4.$$</p>
        <p><strong>Шаг 4. Складываем.</strong></p>
        <p>$$S = 1 + 4 = 5.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $S = 5$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q11',
      source: 'Демо-вариант КР №3, 2024–2025, задача №11 (тест)',
      questionLatex: `<p>Найди площадь области между графиками $y = 2x$ и $y = 4x^3 - 4$ на промежутке $[0;\\,1]$.</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Какой график выше?</strong> Сравним функции на концах:</p>
        <ul>
          <li>при $x = 0$: $y_1 = 0$, $y_2 = -4$ — значит $y_1 > y_2$;</li>
          <li>при $x = 1$: $y_1 = 2$, $y_2 = 0$ — снова $y_1 > y_2$.</li>
        </ul>
        <p>Проверим, не пересекаются ли графики на $(0,1)$. Из $2x = 4x^3 - 4$ получаем $4x^3 - 2x - 4 = 0$, то есть $2x^3 - x - 2 = 0$. При $x = 0$: $-2 < 0$; при $x = 1$: $2 - 1 - 2 = -1 < 0$. Значение остаётся отрицательным, корней на $[0,1]$ нет — значит $y_1 - y_2 > 0$ на всём $[0,1]$.</p>
        <p><strong>Шаг 2. Запись интеграла.</strong></p>
        <p>$$S = \\int_0^1 \\bigl[(2x) - (4x^3 - 4)\\bigr]\\,dx = \\int_0^1 \\bigl(2x - 4x^3 + 4\\bigr)\\,dx.$$</p>
        <p><strong>Шаг 3. Считаем.</strong></p>
        <p>$$S = \\bigl[x^2 - x^4 + 4x\\bigr]_0^{1} = (1 - 1 + 4) - 0 = 4.$$</p>
        <hr>
        <p><strong>Ответ:</strong> $S = 4$.</p>
      `,
    },

    {
      id: 'kr3-2024-demo-q20',
      source: 'Демо-вариант КР №3, 2024–2025, задача №20 (тест) — распознавание объёма',
      questionLatex: `<p>Интеграл $\\displaystyle 2\\pi \\int_0^1 x^2 e^{2x}\\, dx$ соответствует объёму тела, полученного вращением некоторой области вокруг одной из осей координат. Определи, какой именно области и вокруг какой оси (укажи функцию $y(x)$ и ось вращения).</p>`,
      solutionHtml: `
        <p><strong>Шаг 1. Сравним с двумя стандартными формулами.</strong></p>
        <ul>
          <li><strong>Метод дисков (вращение вокруг $OX$):</strong> $V = \\pi \\int_a^b [f(x)]^2\\,dx$. Множитель — $\\pi$, под интегралом — квадрат.</li>
          <li><strong>Метод цилиндрических оболочек (вращение вокруг $OY$):</strong> $V = 2\\pi \\int_a^b x\\cdot |f(x)|\\,dx$. Множитель — $2\\pi$, под интегралом — $x\\cdot f(x)$.</li>
        </ul>
        <p>В нашем интеграле стоит именно множитель $2\\pi$, что напрямую указывает на <em>метод цилиндрических оболочек</em>.</p>
        <p><strong>Шаг 2. Определим $f(x)$.</strong> Подынтегральное выражение $x^2 e^{2x}$ должно совпасть с $x\\cdot f(x)$:</p>
        <p>$$x \\cdot f(x) = x^2 e^{2x} \\;\\Longrightarrow\\; f(x) = x\\,e^{2x}.$$</p>
        <p>На отрезке $[0;\\,1]$ функция $f(x) = x e^{2x} \\geq 0$, что согласуется с формулой объёма (модуль не нужен).</p>
        <p><strong>Шаг 3. Опишем область.</strong> Область ограничена сверху графиком $y = x e^{2x}$, снизу — осью $OX$ ($y = 0$), слева — прямой $x = 0$ (но при $x=0$ кривая сама обращается в ноль), справа — прямой $x = 1$. То есть это криволинейная трапеция $\\{0 \\leq x \\leq 1,\\;0 \\leq y \\leq x e^{2x}\\}$.</p>
        <p><strong>Шаг 4. Ось вращения.</strong> Поскольку радиус оболочки равен $x$ (расстояние от точки до оси), вращение происходит <em>вокруг оси $OY$</em>.</p>
        <p><strong>Краткая проверка формулы.</strong> $V = 2\\pi \\int_0^1 x \\cdot \\underbrace{(x e^{2x})}_{=\\,f(x)}\\,dx = 2\\pi \\int_0^1 x^2 e^{2x}\\,dx$. ✓</p>
        <hr>
        <p><strong>Ответ:</strong> область — криволинейная трапеция под графиком $y = x\\,e^{2x}$ на $[0;\\,1]$ (то есть $0 \\leq y \\leq x e^{2x}$); ось вращения — $OY$. Использован метод цилиндрических оболочек.</p>
      `,
    },
  ];
})();
