export const pageTitles = [
  { path: "/friends", title: "Друзья" },
  { path: "/experts", title: "Знатоки" },
  { path: "/catalog", title: "Каталог" },
  { path: "/catalog/:courseId", title: "Курс" },
  { path: "/catalog/:courseId/rating", title: "Отзывы" },
  { path: "/catalog/:courseId/syllabus", title: "Содержание" },
  {
    path: "/catalog/:courseId/syllabus/:submoduleId/step/:stepNumber",
    title: "Шаг",
  },
  { path: "/favorite", title: "Мои курсы" },
  { path: "/favorite/:courseId", title: "Курс" },
  { path: "/favorite/:courseId/rating", title: "Отзывы" },
  {
    path: "/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber",
    title: "Шаг",
  },
  { path: "/profile", title: "Профиль" },
];
