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
    { id: 25, num: 25, title: 'Функция многих переменных', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.21_Функция многих переменных.mp4') },
    { id: 26, num: 26, title: 'Визуализация скалярной функции многих переменных', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.22_Визуализация скалярной функции многих переменных.mp4') },
    { id: 27, num: 27, title: 'Композиция функций', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E04/CU_lesson_S1E4.23_Композиция функций.mp4') },
    { id: 28, num: 28, title: 'Производная функции и понятие экстремума', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_1. Производная функции и понятие экстремума.mp4') },
    { id: 29, num: 29, title: 'Частные производные', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_2. Частные производные.mp4') },
    { id: 30, num: 30, title: 'Геометрический смысл частных производных', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_3. Геометрический смысл частных производных.mp4') },
    { id: 31, num: 31, title: 'Частные производные второго порядка', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 9 Частные производные/Лекция 9_4. Частные производные второго порядка.mp4') },
    { id: 32, num: 32, title: 'Стационарные (критические) точки', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_1. Стационарные (критические) точки.mp4') },
    { id: 33, num: 33, title: 'Виды стационарных точек', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_ 2. Виды стационарных точек.mp4') },
    { id: 34, num: 34, title: 'Экстремум на границе', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 10 Экстремумы функций многих переменных/Лекция 10_ 3. Экстремум на границе.mp4') },

    // ─── МАТАН — градиент и Лагранж ──────────────────────────────────
    { id: 35, num: 35, title: 'Градиент', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 11 Градиент. Градиентный спуск/Лекция 11_2. Градиент-.mp4') },
    { id: 36, num: 36, title: 'Градиентный спуск', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E05/Лекция 11 Градиент. Градиентный спуск/Лекция 11_3. Градиентный спуск.mp4') },
    { id: 37, num: 37, title: 'Метод множителей Лагранжа', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E06/12_Условные экстремумы/12_1.2. Метод множителей Лагранжа.mp4') },
    { id: 38, num: 38, title: 'Примеры решения задач на условный экстремум', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E06/12_Условные экстремумы/12_1.3. Примеры решения задач.mp4') },

    // ─── ЛИНАЛ — матрицы ────────────────────────────────────────────
    { id: 39, num: 39, title: 'Линейные функции и матрицы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_1. Линейные функции и матрицы.mp4') },
    { id: 40, num: 40, title: 'Геометрический смысл столбцов матрицы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_2. Геометрический смысл столбцов матрицы.mp4') },
    { id: 41, num: 41, title: 'Линейная аппроксимация вектор-функций', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E06/13_Матрицы/13_3. Линейная аппроксимация вектор-функций.mp4') },
    { id: 42, num: 42, title: 'Матрица линейного преобразования', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.1_Матрица линейного преобразования.mp4') },
    { id: 43, num: 43, title: 'Основные примеры матриц преобразований', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.2_Основные примеры матриц преобразований.mp4') },
    { id: 44, num: 44, title: 'Композиция линейных преобразований и умножение матриц', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/14_Матрица линейного преобразования/14.3_Композиция линейных преобразований и  умножение матриц.mp4') },
    // 45 пропущен (в исходном списке не было ссылки на «Алгебра матриц»)

    // ─── МАТАН — производная сложной функции многих переменных ───────
    { id: 46, num: 46, title: 'Производная сложной скалярной функции многих переменных', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.1_Производная сложной скалярной функции многих переменных.mp4') },
    { id: 47, num: 47, title: 'Производная сложной векторной функции многих переменных', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.2_Производная сложной векторной функции многих переменных.mp4') },
    { id: 48, num: 48, title: 'Примеры и задачи (производная композиции)', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/16_Производная сложной функции многих переменных/16.3_Примеры и задачи.mp4') },

    // ─── ЛИНАЛ — свойства матриц ─────────────────────────────────────
    { id: 49, num: 49, title: 'Обратная матрица', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.2_Обратная матрица.mp4') },
    { id: 50, num: 50, title: 'Определитель матрицы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.3_Определитель матрицы.mp4') },
    { id: 51, num: 51, title: 'Транспонирование матриц', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E07/15_Свойства матриц/15.4_Транспонирование матриц.mp4') },

    // ─── ЛИНАЛ — квадратичные формы ──────────────────────────────────
    { id: 52, num: 52, title: 'Квадратичные функции и их матричная форма', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.1. Квадратичные функции и их матричная форма.mp4') },
    { id: 53, num: 53, title: 'Знакопостоянные и знакопеременные квадратичные функции', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },

    // ─── ЛИНАЛ — СЛАУ ────────────────────────────────────────────────
    { id: 54, num: 54, title: 'Решение систем линейных уравнений методом Гаусса', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E09/1.1_Решение систем линейных уравнений методом Гаусса.mp4') },
    { id: 55, num: 55, title: 'Структура множества решений систем линейных уравнений', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E09/1.2_Структура множества решений систем линейных уравнений.mp4') },
    { id: 56, num: 56, title: 'Ранг матрицы и пространство образов', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E09/2.1_Ранг матрицы и пространство образов.mp4') },
    { id: 57, num: 57, title: 'Ядро отображения', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E09/2.2_Ядро отображения.mp4') },
    { id: 58, num: 58, title: 'QR-разложение', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E10/1.2. QR разложение.mp4') },
    { id: 59, num: 59, title: 'LU-разложение', category: 'linalg', semester: 2,
      yandex: F('/CU_lesson_S2E10/1.1. LU разложение.mp4') },

    // ─── ЛИНАЛ — собственные векторы ─────────────────────────────────
    { id: 60, num: 60, title: 'Собственные векторы и собственные значения', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.1. Собственные векторы и собственные значения.mp4') },
    { id: 61, num: 61, title: 'Алгоритм поиска собственных векторов', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.2. Алгоритм поиска собственных векторов.mp4') },
    { id: 62, num: 62, title: 'Диагональные и треугольные матрицы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.3. Диагональные и треугольные матрицы.mp4') },
    { id: 63, num: 63, title: 'Спектральная теорема', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/1. Собственные векторы/1.4. Спектральная теорема.mp4') },

    // ─── ЛИНАЛ — квадратичные формы (повтор) и матрица Гессе ─────────
    { id: 64, num: 64, title: 'Квадратичные функции и их матричные формы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.1. Квадратичные функции и их матричная форма.mp4') },
    { id: 65, num: 65, title: 'Знакопостоянные и знакопеременные квадратичные формы', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },
    { id: 66, num: 66, title: 'Собственные векторы матрицы квадратичной функции', category: 'linalg', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.2. Знакопостоянные и знакопеременные квадратичные функции.mp4') },
    { id: 67, num: 67, title: 'Матрица Гессе', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/2. Квадратичные функции и матрица Гессе/2.4. Матрица Гессе.mp4') },
    { id: 68, num: 68, title: 'Квадратичная аппроксимация функции с помощью матрицы Гессе', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/3. Применение матрицы Гессе/3.1. Квадратичная аппроксимация функции с помощью матрицы Гессе.mp4') },
    { id: 69, num: 69, title: 'Алгоритм поиска локальных экстремумов функции', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E08/3. Применение матрицы Гессе/3.2. Алгоритм поиска локальных экстремумов функции.mp4') },

    // ─── МАТАН — интегралы ──────────────────────────────────────────
    { id: 70, num: 70, title: 'Первообразная — определение', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/1. Первообразная /1.1. Определение первообразной.mp4') },
    { id: 71, num: 71, title: 'Первообразная — примеры решения задач', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/1. Первообразная /1.2. Примеры решения задач.mp4') },
    { id: 72, num: 72, title: 'Площадь под графиком функции', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/2. Определённый интеграл/2.1. Площадь под графиком функции.mp4') },
    { id: 73, num: 73, title: 'Определённый интеграл', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/2. Определённый интеграл/2.2. Определённый интеграл.mp4') },
    { id: 74, num: 74, title: 'Интеграл с переменным верхним пределом', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/3. Формула Ньютона-Лейбница/3.1. Интеграл с переменным верхним пределом.mp4') },
    { id: 75, num: 75, title: 'Формула Ньютона–Лейбница', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E09/3. Формула Ньютона-Лейбница/3.2. Формула Ньютона-Лейбница.mp4') },
    { id: 76, num: 76, title: 'Неопределённый интеграл', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.1. Неопределенный интеграл.mp4') },
    { id: 77, num: 77, title: 'Интегрирование методом замены переменной', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.2. Интегрирование методом замены переменных.mp4') },
    { id: 78, num: 78, title: 'Интегрирование по частям', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.3. Интегрирование по частям.mp4') },
    { id: 79, num: 79, title: 'Интегрирование тригонометрических функций', category: 'calculus', semester: 2,
      yandex: F('/S1/CU_lesson_S1E10/1. Неопределенный интеграл/1.4. Интегрирование тригонометрических функций.mp4') },
  ];

  // Конспекты по каждому из 20 типов (см. правила в site/NOTES_STYLE_GUIDE.md)
  const notes = {
    1: { html: `
<div class="note-root">

  <h2 class="note-h2">Скалярное произведение, норма, косинус угла</h2>
  <p class="note-intro">
    Самый базовый номер экзамена. Даны один-два вектора (либо их нормы и углы между ними) — нужно посчитать длину, угол или небольшое производное от них выражение. Всё сводится к трём операциям: <strong>скалярное произведение</strong>, <strong>норма</strong>, <strong>косинус угла</strong>. Если умеешь работать с этими тремя штуками — номер даёт 1 балл почти автоматически.
  </p>

  <!-- ═══ СУТЬ ═══ -->
  <section class="note-section pastel-peach">
    <h3 class="note-h3">Геометрический смысл</h3>
    <p>
      Скалярное произведение $\\langle \\vec a, \\vec b\\rangle$ — это число, в котором «зашит» угол между векторами и их длины. Формула
      $\\langle \\vec a, \\vec b\\rangle = \\|\\vec a\\|\\,\\|\\vec b\\|\\cos\\varphi$
      позволяет одним числом понять сразу <em>три вещи</em>:
    </p>
    <p>
      — знак произведения говорит, острый угол или тупой (плюс / минус);<br>
      — ноль означает перпендикулярность ($\\vec a \\perp \\vec b$);<br>
      — модуль показывает, насколько векторы «тянут в одну сторону».
    </p>
  </section>

  <!-- ═══ ОПРЕДЕЛЕНИЯ ═══ -->
  <section class="note-section pastel-mint">
    <h3 class="note-h3">Три определения</h3>

    <p><strong>1. Скалярное произведение.</strong> Для $\\vec a = (a_1, \\dots, a_n)$ и $\\vec b = (b_1, \\dots, b_n)$:</p>
    <div class="note-formula">
      $$\\langle \\vec a, \\vec b\\rangle \\;=\\; a_1 b_1 + a_2 b_2 + \\dots + a_n b_n.$$
    </div>

    <p><strong>2. Норма (длина).</strong> Это корень из скалярного произведения вектора самого на себя:</p>
    <div class="note-formula">
      $$\\|\\vec a\\| \\;=\\; \\sqrt{\\langle \\vec a, \\vec a\\rangle} \\;=\\; \\sqrt{a_1^2 + a_2^2 + \\dots + a_n^2}.$$
    </div>

    <p><strong>3. Косинус угла.</strong> Главная формула номера:</p>
    <div class="note-formula">
      $$\\cos\\varphi \\;=\\; \\dfrac{\\langle \\vec a, \\vec b\\rangle}{\\|\\vec a\\|\\cdot\\|\\vec b\\|}.$$
    </div>
  </section>

  <!-- ═══ ВИЗУАЛИЗАЦИЯ ═══ -->
  <svg class="note-svg" viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="nt1-arr-mint"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#6aab9c"/>
      </marker>
      <marker id="nt1-arr-peach" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#e89f85"/>
      </marker>
      <marker id="nt1-arr-axis"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/>
      </marker>
    </defs>
    <line x1="30" y1="300" x2="420" y2="300" stroke="#1a1a1a" stroke-width="1" marker-end="url(#nt1-arr-axis)"/>
    <line x1="60" y1="330" x2="60"  y2="20"  stroke="#1a1a1a" stroke-width="1" marker-end="url(#nt1-arr-axis)"/>
    <text x="425" y="304" font-size="12" fill="#333">x</text>
    <text x="50"  y="18"  font-size="12" fill="#333">y</text>
    <text x="46"  y="318" font-size="12" fill="#333">O</text>
    <line x1="60" y1="300" x2="380" y2="100" stroke="#6aab9c" stroke-width="3.5" marker-end="url(#nt1-arr-mint)"/>
    <text x="245" y="185" font-size="17" fill="#2e5f55" font-weight="600" font-style="italic">a</text>
    <line x1="60" y1="300" x2="160" y2="40"  stroke="#e89f85" stroke-width="3.5" marker-end="url(#nt1-arr-peach)"/>
    <text x="88"  y="160" font-size="17" fill="#8a4b38" font-weight="600" font-style="italic">b</text>
    <path d="M 102.4 273.5 A 50 50 0 0 0 77.9 253.3" stroke="#9882c3" stroke-width="2.2" fill="rgba(152,130,195,0.18)"/>
    <text x="88"  y="274" font-size="15" fill="#4e3d7d" font-style="italic">φ</text>
  </svg>

  <!-- ═══ СВОЙСТВА ═══ -->
  <section class="note-section pastel-mint">
    <h3 class="note-h3">Свойства скалярного произведения</h3>
    <div class="note-formula-list">
      <div><span class="note-label">симметрия</span>         $\\langle \\vec a, \\vec b\\rangle = \\langle \\vec b, \\vec a\\rangle$</div>
      <div><span class="note-label">линейность</span>        $\\langle \\alpha\\vec a + \\beta\\vec b,\\; \\vec c\\rangle = \\alpha\\langle \\vec a,\\vec c\\rangle + \\beta\\langle \\vec b,\\vec c\\rangle$</div>
      <div><span class="note-label">связь с нормой</span>    $\\langle \\vec a, \\vec a\\rangle = \\|\\vec a\\|^2 \\ge 0$</div>
      <div><span class="note-label">перпендикулярность</span>$\\vec a \\perp \\vec b \\iff \\langle \\vec a, \\vec b\\rangle = 0$</div>
      <div><span class="note-label">неравенство КБШ</span>   $|\\langle \\vec a, \\vec b\\rangle| \\le \\|\\vec a\\|\\,\\|\\vec b\\|$</div>
    </div>
  </section>

  <!-- ═══ ГЛАВНЫЕ ТОЖДЕСТВА ═══ -->
  <section class="note-section pastel-sky">
    <h3 class="note-h3">Три тождества, которые нужно знать наизусть</h3>
    <p>Из симметрии и линейности разом вытекают три формулы — они закрывают почти 80% задач типа №1:</p>
    <div class="note-formula">
      $$\\|\\vec a \\pm \\vec b\\|^2 \\;=\\; \\|\\vec a\\|^2 \\;\\pm\\; 2\\langle \\vec a, \\vec b\\rangle \\;+\\; \\|\\vec b\\|^2.$$
    </div>
    <div class="note-formula">
      $$\\langle \\vec a, \\vec b\\rangle \\;=\\; \\tfrac{1}{2}\\bigl(\\|\\vec a + \\vec b\\|^2 - \\|\\vec a\\|^2 - \\|\\vec b\\|^2\\bigr).$$
    </div>
    <div class="note-formula">
      $$S_{\\text{параллелограмма}} \\;=\\; \\|\\vec a\\|\\,\\|\\vec b\\|\\,\\sin\\varphi \\;=\\; \\sqrt{\\|\\vec a\\|^2\\|\\vec b\\|^2 - \\langle \\vec a, \\vec b\\rangle^2}.$$
    </div>
    <p>
      Первая формула — <span class="note-hl-sky">обобщённая теорема Пифагора</span>: если известны нормы $\\|\\vec a\\|, \\|\\vec b\\|, \\|\\vec a \\pm \\vec b\\|$, то скалярное произведение находится в одну строку.
    </p>
  </section>

  <!-- ═══ АЛГОРИТМ ═══ -->
  <section class="note-section pastel-lavender">
    <h3 class="note-h3">Алгоритм решения</h3>
    <p>Смотри на то, что дано:</p>
    <ol class="note-steps">
      <li class="note-step"><strong>Даны координаты векторов?</strong> Считай $\\langle \\vec a, \\vec b\\rangle$ покоординатно и $\\|\\vec a\\|$ через корень из суммы квадратов.</li>
      <li class="note-step"><strong>Даны нормы и нужен cos угла?</strong> Раскладывай $\\|\\vec a \\pm \\vec b\\|^2$ — получишь $\\langle \\vec a, \\vec b\\rangle$, а дальше формула косинуса.</li>
      <li class="note-step"><strong>Спрашивают норму сложного выражения</strong> $\\|\\alpha\\vec a + \\beta\\vec b\\|$? Возведи в квадрат и раскрой как $\\langle \\cdot, \\cdot\\rangle$ — всё сведётся к известным $\\|\\vec a\\|, \\|\\vec b\\|, \\langle \\vec a, \\vec b\\rangle$.</li>
      <li class="note-step"><strong>Спрашивают площадь параллелограмма / треугольника?</strong> $S = \\|\\vec a\\|\\|\\vec b\\|\\sin\\varphi$, где $\\sin\\varphi$ достань из $\\sin^2 + \\cos^2 = 1$.</li>
      <li class="note-step"><strong>В конце</strong> упрости дробь ($\\tfrac{1}{\\sqrt 3} \\to \\tfrac{\\sqrt 3}{3}$, сократи общие множители): за неупрощённый ответ снимают $-0{,}2$.</li>
    </ol>
  </section>

  <!-- ═══ ПОДВОДНЫЕ КАМНИ ═══ -->
  <section class="note-section pastel-rose">
    <h3 class="note-h3">Типичные ошибки</h3>
    <div class="note-pitfall"><strong>⚠</strong> $\\|\\vec a - \\vec b\\|^2 \\ne \\|\\vec a\\|^2 - \\|\\vec b\\|^2$. В середине сидит $-2\\langle \\vec a, \\vec b\\rangle$.</div>
    <div class="note-pitfall"><strong>⚠</strong> Если задача говорит про угол между $\\vec a$ и $\\vec a - \\vec b$ (а не между $\\vec a$ и $\\vec b$) — сначала построй новый вектор $\\vec c = \\vec a - \\vec b$ и ищи угол между $\\vec a$ и $\\vec c$.</div>
    <div class="note-pitfall"><strong>⚠</strong> $\\sqrt{a^2} = |a|$, а не $a$. Если под корнем вылез знак — не забудь про модуль.</div>
    <div class="note-pitfall"><strong>⚠</strong> Не теряй знак: $\\langle \\vec a, \\vec b\\rangle$ может быть отрицательным, но $\\|\\vec a\\| \\ge 0$ всегда.</div>
  </section>

  <!-- ═══ ПРИМЕР 1 ═══ -->
  <section class="note-section note-example pastel-sage">
    <span class="note-example__label">Пример 1 · Демо летнего экзамена, 2025</span>
    <p><strong>Условие.</strong> Пусть $\\vec a = (1,\\,0,\\,3)$, $\\vec b = (2,\\,-3,\\,-1)$. Найти $\\|\\vec a - \\langle \\vec a, \\vec b\\rangle\\,\\vec b\\|$.</p>

    <p><strong>Шаг 1.</strong> Считаем скалярное произведение:</p>
    <p>$\\langle \\vec a, \\vec b\\rangle = 1\\cdot 2 + 0\\cdot(-3) + 3\\cdot(-1) = $ <span class="note-hl-mint">$-1$</span>.</p>

    <p><strong>Шаг 2.</strong> Подставляем в выражение и получаем новый вектор:</p>
    <p>$\\vec a - (-1)\\cdot \\vec b = \\vec a + \\vec b = (1+2,\\; 0-3,\\; 3-1) = (3,\\,-3,\\,2).$</p>

    <p><strong>Шаг 3.</strong> Считаем норму:</p>
    <p>$\\|(3,-3,2)\\| = \\sqrt{3^2 + (-3)^2 + 2^2} = \\sqrt{9+9+4} = $ <span class="note-hl-mint">$\\sqrt{22}$</span>.</p>

    <p class="note-answer">Ответ: $\\sqrt{22}$</p>
  </section>

  <!-- ═══ ПРИМЕР 2 ═══ -->
  <section class="note-section note-example pastel-sage">
    <span class="note-example__label">Пример 2 · Летний экзамен, 2025, вариант 1</span>
    <p><strong>Условие.</strong> Пусть $\\vec a = (1,\\,1,\\,1)$, $\\vec b = (1,\\,-2,\\,1)$. Найти косинус угла между $\\vec a$ и $\\vec a - \\vec b$.</p>

    <p><strong>Шаг 1.</strong> Строим вспомогательный вектор:</p>
    <p>$\\vec c = \\vec a - \\vec b = (1-1,\\; 1-(-2),\\; 1-1) = (0,\\,3,\\,0).$</p>

    <p><strong>Шаг 2.</strong> Скалярное произведение $\\vec a$ и $\\vec c$:</p>
    <p>$\\langle \\vec a, \\vec c\\rangle = 1\\cdot 0 + 1\\cdot 3 + 1\\cdot 0 = $ <span class="note-hl-mint">$3$</span>.</p>

    <p><strong>Шаг 3.</strong> Нормы:</p>
    <p>$\\|\\vec a\\| = \\sqrt{1+1+1} = \\sqrt{3}, \\qquad \\|\\vec c\\| = \\sqrt{0+9+0} = 3.$</p>

    <p><strong>Шаг 4.</strong> Формула косинуса и упрощение:</p>
    <p>$\\cos\\varphi = \\dfrac{3}{\\sqrt{3}\\cdot 3} = \\dfrac{1}{\\sqrt{3}} = $ <span class="note-hl-mint">$\\dfrac{\\sqrt{3}}{3}$</span>.</p>

    <p class="note-answer">Ответ: $\\dfrac{\\sqrt 3}{3}$</p>
  </section>

  <!-- ═══ ПРИМЕР 3 ═══ -->
  <section class="note-section note-example pastel-sage">
    <span class="note-example__label">Пример 3 · Демо контрольной №1, 2024–2025</span>
    <p><strong>Условие.</strong> Известно, что $\\|\\vec a\\| = 3$, $\\|\\vec b\\| = 13$, $\\|\\vec a + \\vec b\\| = \\sqrt{208}$. Найти площадь параллелограмма, натянутого на $\\vec a$ и $\\vec b$.</p>

    <p>Координат у векторов нет — работаем через нормы. Это классическая ловушка, где без <em>обобщённой теоремы Пифагора</em> не выжить.</p>

    <p><strong>Шаг 1.</strong> Возводим в квадрат данную норму суммы:</p>
    <p>$\\|\\vec a + \\vec b\\|^2 = \\|\\vec a\\|^2 + 2\\langle \\vec a, \\vec b\\rangle + \\|\\vec b\\|^2.$</p>
    <p>$208 = 9 + 2\\langle \\vec a, \\vec b\\rangle + 169 \\;\\Rightarrow\\; 2\\langle \\vec a, \\vec b\\rangle = 30 \\;\\Rightarrow\\; \\langle \\vec a, \\vec b\\rangle = $ <span class="note-hl-mint">$15$</span>.</p>

    <p><strong>Шаг 2.</strong> Находим косинус:</p>
    <p>$\\cos\\varphi = \\dfrac{15}{3\\cdot 13} = \\dfrac{5}{13}.$</p>

    <p><strong>Шаг 3.</strong> Синус — из основного тригонометрического тождества ($\\sin\\varphi \\ge 0$, угол между векторами в $[0,\\pi]$):</p>
    <p>$\\sin^2\\varphi = 1 - \\dfrac{25}{169} = \\dfrac{144}{169} \\;\\Rightarrow\\; \\sin\\varphi = \\dfrac{12}{13}.$</p>

    <p><strong>Шаг 4.</strong> Площадь параллелограмма:</p>
    <p>$S = \\|\\vec a\\|\\,\\|\\vec b\\|\\sin\\varphi = 3 \\cdot 13 \\cdot \\dfrac{12}{13} = $ <span class="note-hl-mint">$36$</span>.</p>

    <p>Эквивалентно — одной формулой через <em>матричный</em> способ:</p>
    <p>$S = \\sqrt{\\|\\vec a\\|^2\\|\\vec b\\|^2 - \\langle \\vec a, \\vec b\\rangle^2} = \\sqrt{9\\cdot 169 - 225} = \\sqrt{1521 - 225} = \\sqrt{1296} = 36.$</p>

    <p class="note-answer">Ответ: $36$</p>
  </section>

  <!-- ═══ ПОДСКАЗКА НА БУДУЩЕЕ ═══ -->
  <section class="note-section pastel-sand">
    <h3 class="note-h3">Что запомнить в итоге</h3>
    <p>
      Почти все задачи типа №1 решаются по схеме: <em>скалярное произведение → нормы → косинус → добить формулой</em>. Если в условии нет координат — значит, нужно использовать
      $\\|\\vec a \\pm \\vec b\\|^2 = \\|\\vec a\\|^2 \\pm 2\\langle \\vec a, \\vec b\\rangle + \\|\\vec b\\|^2$
      и выжимать скалярное произведение из того, что есть.
    </p>
  </section>

</div>
` },
    2:  { html: '' }, 3:  { html: '' }, 4:  { html: '' },
    5:  { html: '' }, 6:  { html: '' }, 7:  { html: '' }, 8:  { html: '' },
    9:  { html: '' }, 10: { html: '' }, 11: { html: '' }, 12: { html: '' },
    13: { html: '' }, 14: { html: '' }, 15: { html: '' }, 16: { html: '' },
    17: { html: '' }, 18: { html: '' }, 19: { html: '' }, 20: { html: '' }
  };

  return { lectures, notes };
})();
