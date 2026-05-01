/**
 * Данные раздела «Обучение и повторение» РешуМИА.
 *
 *   window.LEARN_DATA.lectures — массив лекций курса
 *   window.LEARN_DATA.notes — конспекты по каждому из 20 типов задач
 *
 * Каждая лекция имеет:
 *   id:        уникальный номер
 *   num:       порядковый номер в списке пользователя
 *   title:     название (можно с LaTeX через $...$)
 *   category:  'linalg' | 'calculus'
 *   semester:  1 | 2
 *   yandex:    { url: '...' }                     — для одиночной ссылки /i/...
 *           |  { folder: '...', path: '/...' }    — для файла внутри папки /d/...
 *
 * Видео воспроизводится прямо на сайте (HTML5 <video>) —
 * прямая ссылка на .mp4 берётся через публичный API Яндекс.Диска:
 *   https://cloud-api.yandex.net/v1/disk/public/resources/download
 */
window.LEARN_DATA = (function () {
  // общая публичная папка со всеми лекциями курса
  const FOLDER = 'https://disk.yandex.ru/d/FUPZqUaeMAfOLA';

  // короткий хелпер для лекций из общей папки (чтобы не повторять folder)
  function F(path) { return { folder: FOLDER, path: path }; }
  function U(url)  { return { url: url }; }

  const lectures = [
    // ─── ЛИНЕЙНАЯ АЛГЕБРА ──────────────────────────────────────────
    // (для первых двух заменил /i/… на путь в общей папке — API Яндекс.Диска
    //  не выдаёт прямую ссылку по одиночным /i/… публикациям из-за капчи)
    { id:  1, num:  1, title: 'Проекция точки на прямую в $\\mathbb{R}^n$', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.1.1_Проекция точки на прямую в R^n.mp4'),
      fallbackUrl: 'https://disk.yandex.ru/i/NVe2IateQp_AfQ' },
    { id:  2, num:  2, title: 'Проекция вектора на подпространство в $\\mathbb{R}^n$', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.1.2_Проекция вектора на подпространство в R^n.mp4'),
      fallbackUrl: 'https://disk.yandex.ru/i/RNr9HRGS-RPKFA' },
    { id:  3, num:  3, title: 'Линейная независимость', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E02/1.1. Линейная независимость.mp4') },
    { id:  4, num:  4, title: 'Метод ортогонализации Грама–Шмидта', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E02/1.2. Метод ортогонализации Грама-Шмидта.mp4') },

    // ─── МАТЕМАТИЧЕСКИЙ АНАЛИЗ — основы функций ────────────────────
    { id:  5, num:  5, title: 'Функции и их основные свойства', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E01/01_1_Функции_и_их_основные_свойства.mp4') },
    { id:  6, num:  6, title: 'Основы математического моделирования', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E01/01_2_Основы_математического_моделирования.mp4') },
    { id:  7, num:  7, title: 'Основные преобразования функций', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E01/2.1. Основные преобразования функций.mp4') },
    { id:  8, num:  8, title: 'Обратная функция', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E01/2.2. Обратная функция.mp4') },

    // ─── МАТАН — производная (одной переменной) ─────────────────────
    { id:  9, num:  9, title: 'Наклон касательной и определение производной', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/2.1. Наклон касательной и определение производной.mp4') },
    { id: 10, num: 10, title: 'Физический смысл производной', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/2.2. Физический смысл производной.mp4') },
    { id: 11, num: 11, title: 'Свойства производной', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/3.2. Свойства производной.mp4') },
    { id: 12, num: 12, title: 'Свойства производной (повтор)', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/3.2. Свойства производной.mp4') },
    { id: 13, num: 13, title: 'Производные высших порядков', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/3.1. Производные высших порядков.mp4') },
    { id: 14, num: 14, title: 'Производная произведения', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/1.1. Производная произведения.mp4') },
    { id: 15, num: 15, title: 'Производная частного', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/1.2. Производная частного.mp4') },
    { id: 16, num: 16, title: 'Производная тригонометрических функций', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/2.1. Производная тригонометрических функций.mp4') },
    { id: 17, num: 17, title: 'Производная сложной функции', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/3.1. Производная сложной функции.mp4') },
    { id: 18, num: 18, title: 'Производная функции, заданной неявно', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/3.2. Производная неявной функции.mp4') },
    { id: 19, num: 19, title: 'Обратные тригонометрические функции и их производные', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/4.1. Обратные тригонометрические функции.mp4') },
    { id: 20, num: 20, title: 'Число $e$ как предел', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E05/4.2. Число е как предел.mp4') },
    { id: 21, num: 21, title: 'Линейное приближение', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E06/1.1. Линейное приближение.mp4') },
    { id: 22, num: 22, title: 'Производная в естественных науках', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E04/2.2. Физический смысл производной.mp4') },
    { id: 23, num: 23, title: 'Понятие экстремума функции', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E06/2.1. Понятие экстремума функции.mp4') },
    { id: 24, num: 24, title: 'Необходимое условие экстремума', category: 'calculus', semester: 1,
      yandex: F('/CU_lesson_S2E06/2.2. Необходимое условие экстремума.mp4') },

    // ─── МАТАН — функции многих переменных, частные производные ─────
    { id: 25, num: 25, title: 'Функция многих переменных', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.21_Функция многих переменных.mp4') },
    { id: 26, num: 26, title: 'Визуализация скалярной функции многих переменных', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.22_Визуализация скалярной функции многих переменных.mp4') },
    { id: 27, num: 27, title: 'Композиция функций', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.23_Композиция функций.mp4') },
    { id: 28, num: 28, title: 'Производная функции и понятие экстремума', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_1. Производная функции и понятие экстремума.mp4') },
    { id: 29, num: 29, title: 'Частные производные', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_2. Частные производные.mp4') },
    { id: 30, num: 30, title: 'Геометрический смысл частных производных', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_3. Геометрический смысл частных производных.mp4') },
    { id: 31, num: 31, title: 'Частные производные второго порядка', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_4. Частные производные второго порядка.mp4') },
    { id: 32, num: 32, title: 'Стационарные (критические) точки', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_1. Стационарные (критические) точки.mp4') },
    { id: 33, num: 33, title: 'Виды стационарных точек', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_ 2. Виды стационарных точек.mp4') },
    { id: 34, num: 34, title: 'Экстремум на границе', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_ 3. Экстремум на границе.mp4') },

    // ─── МАТАН — градиент и Лагранж ──────────────────────────────────
    { id: 35, num: 35, title: 'Градиент', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 11 Градиент. Градиентный спуск/Лекция 11_2. Градиент-.mp4') },
    { id: 36, num: 36, title: 'Градиентный спуск', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 11 Градиент. Градиентный спуск/Лекция 11_3. Градиентный спуск.mp4') },
    { id: 37, num: 37, title: 'Метод множителей Лагранжа', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E06/12_Условные экстремумы/12_1.2. Метод множителей Лагранжа.mp4') },
    { id: 38, num: 38, title: 'Примеры решения задач на условный экстремум', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E06/12_Условные экстремумы/12_1.3. Примеры решения задач.mp4') },

    // ─── ЛИНАЛ — матрицы ────────────────────────────────────────────
    { id: 39, num: 39, title: 'Линейные функции и матрицы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_1. Линейные функции и матрицы.mp4') },
    { id: 40, num: 40, title: 'Геометрический смысл столбцов матрицы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_2. Геометрический смысл столбцов матрицы.mp4') },
    { id: 41, num: 41, title: 'Линейная аппроксимация вектор-функций', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_3. Линейная аппроксимация вектор-функций.mp4') },
    { id: 42, num: 42, title: 'Матрица линейного преобразования', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.1_Матрица линейного преобразования.mp4') },
    { id: 43, num: 43, title: 'Основные примеры матриц преобразований', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.2_Основные примеры матриц преобразований.mp4') },
    { id: 44, num: 44, title: 'Композиция линейных преобразований и умножение матриц', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.3_Композиция линейных преобразований и  умножение матриц.mp4') },
    // 45 пропущен (в исходном списке не было ссылки на «Алгебра матриц»)

    // ─── МАТАН — производная сложной функции многих переменных ───────
    { id: 46, num: 46, title: 'Производная сложной скалярной функции многих переменных', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.1_Производная сложной скалярной функции многих переменных.mp4') },
    { id: 47, num: 47, title: 'Производная сложной векторной функции многих переменных', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.2_Производная сложной векторной функции многих переменных.mp4') },
    { id: 48, num: 48, title: 'Примеры и задачи (производная композиции)', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.3_Примеры и задачи.mp4') },

    // ─── ЛИНАЛ — свойства матриц ─────────────────────────────────────
    { id: 49, num: 49, title: 'Обратная матрица', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.2_Обратная матрица.mp4') },
    { id: 50, num: 50, title: 'Определитель матрицы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.3_Определитель матрицы.mp4') },
    { id: 51, num: 51, title: 'Транспонирование матриц', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.4_Транспонирование матриц.mp4') },

    // ─── ЛИНАЛ — квадратичные формы ──────────────────────────────────
    { id: 52, num: 52, title: 'Квадратичные функции и их матричная форма', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.1. Квадратичные функции и их матричная форма.mp4') },
    { id: 53, num: 53, title: 'Знакопостоянные и знакопеременные квадратичные функции', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },

    // ─── ЛИНАЛ — СЛАУ ────────────────────────────────────────────────
    { id: 54, num: 54, title: 'Решение систем линейных уравнений методом Гаусса', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E09/1.1_Решение систем линейных уравнений методом Гаусса.mp4') },
    { id: 55, num: 55, title: 'Структура множества решений систем линейных уравнений', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E09/1.2_Структура множества решений систем линейных уравнений.mp4') },
    { id: 56, num: 56, title: 'Ранг матрицы и пространство образов', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E09/2.1_Ранг матрицы и пространство образов.mp4') },
    { id: 57, num: 57, title: 'Ядро отображения', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E09/2.2_Ядро отображения.mp4') },
    { id: 58, num: 58, title: 'QR-разложение', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E10/1.2. QR разложение.mp4') },
    { id: 59, num: 59, title: 'LU-разложение', category: 'linalg', semester: 1,
      yandex: F('/CU_lesson_S2E10/1.1. LU разложение.mp4') },

    // ─── ЛИНАЛ — собственные векторы ─────────────────────────────────
    { id: 60, num: 60, title: 'Собственные векторы и собственные значения', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.1. Собственные векторы и собственные значения.mp4') },
    { id: 61, num: 61, title: 'Алгоритм поиска собственных векторов', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.2. Алгоритм поиска собственных векторов.mp4') },
    { id: 62, num: 62, title: 'Диагональные и треугольные матрицы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.3. Диагональные и треугольные матрицы.mp4') },
    { id: 63, num: 63, title: 'Спектральная теорема', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.4. Спектральная теорема.mp4') },

    // ─── ЛИНАЛ — квадратичные формы (повтор) и матрица Гессе ─────────
    { id: 64, num: 64, title: 'Квадратичные функции и их матричные формы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.1. Квадратичные функции и их матричная форма.mp4') },
    { id: 65, num: 65, title: 'Знакопостоянные и знакопеременные квадратичные формы', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },
    { id: 66, num: 66, title: 'Собственные векторы матрицы квадратичной функции', category: 'linalg', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },
    { id: 67, num: 67, title: 'Матрица Гессе', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.4. Матрица Гессе.mp4') },
    { id: 68, num: 68, title: 'Квадратичная аппроксимация функции с помощью матрицы Гессе', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/3. Применение матрицы Гессе/3.1. Квадратичная аппроксимация функции с помощью матрицы Гессе.mp4') },
    { id: 69, num: 69, title: 'Алгоритм поиска локальных экстремумов функции', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E08/3. Применение матрицы Гессе/3.2. Алгоритм поиска локальных экстремумов функции.mp4') },

    // ─── МАТАН — интегралы ──────────────────────────────────────────
    { id: 70, num: 70, title: 'Первообразная — определение', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/1. Первообразная /1.1. Определение первообразной.mp4') },
    { id: 71, num: 71, title: 'Первообразная — примеры решения задач', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/1. Первообразная /1.2. Примеры решения задач.mp4') },
    { id: 72, num: 72, title: 'Площадь под графиком функции', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/2. Определённый интеграл/2.1. Площадь под графиком функции.mp4') },
    { id: 73, num: 73, title: 'Определённый интеграл', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/2. Определённый интеграл/2.2. Определённый интеграл.mp4') },
    { id: 74, num: 74, title: 'Интеграл с переменным верхним пределом', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/3. Формула Ньютона-Лейбница/3.1. Интеграл с переменным верхним пределом.mp4') },
    { id: 75, num: 75, title: 'Формула Ньютона–Лейбница', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E09/3. Формула Ньютона-Лейбница/3.2. Формула Ньютона-Лейбница.mp4') },
    { id: 76, num: 76, title: 'Неопределённый интеграл', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.1. Неопределенный интеграл.mp4') },
    { id: 77, num: 77, title: 'Интегрирование методом замены переменной', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.2. Интегрирование методом замены переменных.mp4') },
    { id: 78, num: 78, title: 'Интегрирование по частям', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.3. Интегрирование по частям.mp4') },
    { id: 79, num: 79, title: 'Интегрирование тригонометрических функций', category: 'calculus', semester: 1,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.4. Интегрирование тригонометрических функций.mp4') },
  ];

  // Конспекты по каждому из 20 типов (пока пустые, заполни по мере)
  const notes = {
    1:  { html: '' }, 2:  { html: '' }, 3:  { html: '' }, 4:  { html: '' },
    5:  { html: '' }, 6:  { html: '' }, 7:  { html: '' }, 8:  { html: '' },
    9:  { html: '' }, 10: { html: '' }, 11: { html: '' }, 12: { html: '' },
    13: { html: '' }, 14: { html: '' }, 15: { html: '' }, 16: { html: '' },
    17: { html: '' }, 18: { html: '' }, 19: { html: '' }, 20: { html: '' }
  };

  return { lectures, notes };
})();
