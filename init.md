# CunaEdu → CunaFrontReact: Project Init

> Этот файл предназначен для быстрого погружения в проект при работе с нейросетью.
> Обновляй его после каждого значимого изменения.

---

## Общая информация

| Параметр             | Значение                                      |
| -------------------- | --------------------------------------------- |
| Старая версия (прод) | https://github.com/YaNokavi/CunaEdu           |
| Новая версия (React) | https://github.com/YaNokavi/CunaFrontReact    |
| Сервер API           | `https://cryptunatest-anderm.amvera.io/v1/`   |
| Тип приложения       | Telegram Mini App (WebApp)                    |
| Авторизация          | Через `X-User-Id` заголовок (Telegram userId) |

---

## Стек

### Старая версия (CunaEdu)

- Vanilla JS + HTML + CSS
- Один файл на страницу (`.html` + `.js`)
- `DOMPurify` для санитизации
- Деплой через GitHub pages

### Новая версия (CunaFrontReact)

- React 18 + TypeScript + Vite
- React Router v6 (browser router)
- TanStack Query v5 (react-query) — для серверного состояния
- CSS Modules + глобальные стили (`styles.css`, `index.css`)

---

## Архитектура React-проекта

```
src/
├── App.tsx                        # TelegramUserContextProvider + RouterProvider
├── main.tsx                       # QueryClientProvider + StrictMode
├── providers/
│   └── router.tsx                 # Все маршруты
├── context/
│   └── UserTelegramContext.tsx    # userId, username, userAvatarUrl (из Telegram WebApp)
├── pages/                         # Страницы (тонкие, логика в компонентах/хуках)
│   ├── FavoritePage.tsx           # Главная — список курсов + ежедневный тест
│   ├── CoursePage.tsx             # Страница курса
│   ├── SyllabusPage.tsx           # Содержание курса
│   ├── StepPage.tsx               # Шаг обучения
│   ├── ReviewsPage.tsx            # Отзывы
│   └── ProfilePage.tsx            # Профиль пользователя
├── components/                    # Компоненты, разбиты по страницам
│   ├── layout/
│   │   ├── Layout.tsx             # Общий лейаут (Header + Outlet + NavigationBar)
│   │   ├── Header/
│   │   └── NavigationBar/
│   ├── DailyTestModal/            # Модалка ежедневного теста
│   ├── CoursePage/
│   ├── StepPage/
│   │   ├── StepContent.tsx
│   │   ├── StepSwitching/         # Кнопки назад/вперёд
│   │   └── TestContent/           # Тест внутри шага
│   ├── SyllabusPage/
│   ├── ReviewsPage/
│   └── ProfilePage/
├── hooks/
│   ├── useTelegramUser.ts         # Хук для получения userId из контекста
│   ├── useExpand.ts
│   ├── useReactionHandler.ts      # Лайки/дизлайки отзывов
│   ├── useStepButtonLink.ts       # Логика кнопок перехода по шагам
│   └── queries/                   # TanStack Query хуки (по страницам)
│       ├── FavoritePage/
│       │   ├── useCoursesFavorite.ts   # GET course/all
│       │   └── useSendUserInfo.ts      # POST user/login-and-daily-test
│       ├── CoursePage/
│       ├── SyllabusPage/
│       ├── StepPage/
│       ├── ReviewsPage/
│       └── ProfilePage/
├── services/                      # Классы-сервисы, обёртки над fetchData
│   ├── CustomFetch.ts             # Базовый fetch с retry (3 попытки)
│   ├── favorite.service.ts        # sendUserInfo, getAllCourses
│   ├── course.service.ts
│   ├── syllabus.service.ts
│   ├── step.service.ts
│   ├── reviews.service.ts
│   ├── profile.service.ts
│   └── dailyTest.service.ts
├── UI/                            # Переиспользуемые UI-компоненты
│   ├── CourseBaseInfoBlock/       # Карточка курса в списке
│   ├── Loader/
│   └── ...
├── types/
│   └── CourseTypes/course.types.ts
└── utils/
    └── getCleanUsername.ts        # DOMPurify санитизация username
```

---

## Маршруты

| Путь                                                         | Страница     | Старый файл     |
| ------------------------------------------------------------ | ------------ | --------------- |
| `/favorite`                                                  | FavoritePage | `favorite.html` |
| `/favorite/:courseId`                                        | CoursePage   | `courses.html`  |
| `/favorite/:courseId/rating`                                 | ReviewsPage  | `rating.html`   |
| `/favorite/:courseId/syllabus`                               | SyllabusPage | `syllabus.html` |
| `/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber` | StepPage     | `step.html`     |
| `/profile`                                                   | ProfilePage  | `profile.html`  |

---

## Ключевые механизмы

### Инициализация (точка входа)

**Старая версия:** `index.html` → `index.js`:

1. Очищает localStorage
2. Читает `tgWebAppStartParam` из URL → сохраняет в `localStorage.referallId`
3. Устанавливает `localStorage.flagFirstJoin = true`
4. Редиректит на `favorite.html`

**Новая версия:** Аналога `index.js` нет. `flagFirstJoin` и `referallId` должны устанавливаться в `UserTelegramContext.tsx` внутри `useEffect` при инициализации Telegram WebApp.

### Авторизация

Каждый запрос к API передаёт заголовок `X-User-Id: <userId>` (число — Telegram user id).
Дополнительно `user/login-and-daily-test` требует `X-User-Ip` и `X-User-Device-Id` (сейчас хардкод `"111"`).

### Ежедневный тест (DailyTest)

Запрос: `POST user/login-and-daily-test` с телом `{ username, avatarUrl, referrerId }`.
Ответ: если есть `{ contentUrl, testStartDate }` → показать модалку теста.
Отправка результата: `POST user/daily-test-result` с `{ isSuccess, testStartDate }`.

**Условие запуска:** `localStorage.flagFirstJoin === true` при монтировании `FavoritePage`.

### CustomFetch

- Базовый URL: `https://cryptunatest-anderm.amvera.io/v1/`
- Retry: 3 попытки, 500ms \* attempt между попытками
- 4xx → бросает HttpError сразу без retry
- ⚠️ **Баг:** сетевые ошибки (не HttpError) молча глотаются — функция возвращает `undefined` вместо того чтобы бросить исключение

---

## Статус миграции

### ✅ Реализовано

- Все основные страницы: FavoritePage, CoursePage, SyllabusPage, StepPage, ReviewsPage, ProfilePage
- TanStack Query для всех запросов
- Базовая навигация через React Router
- Компонент DailyTestModal
- Лайки/дизлайки отзывов (useReactionHandler)
- Кнопки переключения шагов (useStepButtonLink)
- Базовый CustomFetch с retry

### ❌ Не реализовано / Требует доработки

#### Критично для прода

- **Ежедневный тест не запускается** — `flagFirstJoin` не устанавливается при запуске из Telegram. Нужно добавить в `UserTelegramContext.tsx`:
  ```ts
  localStorage.setItem("flagFirstJoin", "true");
  localStorage.setItem("referallId", JSON.stringify(startParam));
  ```
- **`avatarUrl: ""` вызывает 400** — сервер не принимает пустую строку. В `favorite.service.ts` нужно: `avatarUrl: avatarUrl || null`
- **CustomFetch глотает сетевые ошибки** — в `catch` блоке для не-HttpError нужно добавить `throw error` при последней попытке
- **`alert()` в сервисах** — все `alert(...)` в `favorite.service.ts`, `course.service.ts` и других нужно заменить на нормальную обработку ошибок

#### UI/UX

- **Шаг помечается как пройденный сразу при входе** — логика отправки прогресса срабатывает при монтировании, а не при действии пользователя
- **Фокус на кнопках после закрытия модалок** — кнопка остаётся в фокусе после удаления отзыва и, возможно, в других модалках
- **Нет отображения ошибки валидации в форме отзыва** — при неполном заполнении нет inline-ошибки
- **Username в отзыве приходит как строка** — нужно проверить типизацию
- **Перерендер UI после отправки отзыва не совсем красивый** — прыгают компоненты
- **Отступы таб-бара снизу** — не проверено на реальном устройстве

#### Функциональность

- **Анимации в содержании (SyllabusPage)** — в старой версии были анимации раскрытия модулей
- **Фото/изображения в шагах** — поддержка просмотра изображений внутри контента шага не реализована. Ранее использовалась jquery файл с данной функцией
- **Светлая тема** — только тёмная тема, светлая не реализована

#### Telegram-интеграция (для деплоя)

- **Кнопка "Назад" Telegram** — `tg.BackButton` не подключена
- **Отступы под платформу** — `tg.safeAreaInset`, `tg.contentSafeAreaInset`
- **Expand** — `tg.expand()` при запуске

---

## Известные баги (активные)

| Баг                             | Файл                           | Описание                               |
| ------------------------------- | ------------------------------ | -------------------------------------- |
| Сетевые ошибки глотаются        | `CustomFetch.ts`               | `catch` не бросает не-HttpError ошибки |
| `avatarUrl: ""` → 400           | `favorite.service.ts`          | Нужно `avatarUrl \|\| null`            |
| `flagFirstJoin` не ставится     | `UserTelegramContext.tsx`      | Нет аналога `index.js`                 |
| `alert` вместо UI-ошибок        | Все сервисы                    | `alert(...)` нужно заменить            |
| Шаг сразу помечается пройденным | `StepPage` / `step.service.ts` | Прогресс отправляется при входе        |

---

## Локальная разработка

В `UserTelegramContext.tsx` при отсутствии Telegram (`!tg.initDataUnsafe?.user`) используется фолбэк:

```ts
setUserId(535799793); // реальный Telegram ID для тестов
setUsername("DevUser");
```

Для тестирования ежедневного теста локально выполни в консоли браузера:

```js
localStorage.setItem("flagFirstJoin", "true");
```

Затем перезагрузи страницу.

---

## API эндпоинты (актуальные)

| Метод  | URL                                            | Заголовки                                    | Описание                  |
| ------ | ---------------------------------------------- | -------------------------------------------- | ------------------------- |
| GET    | `course/all`                                   | `X-User-Id`                                  | Все курсы пользователя    |
| POST   | `user/login-and-daily-test`                    | `X-User-Id`, `X-User-Ip`, `X-User-Device-Id` | Логин + получение теста   |
| POST   | `user/daily-test-result`                       | `X-User-Id`                                  | Отправка результата теста |
| GET    | `course/:id/info`                              | `X-User-Id`                                  | Информация о курсе        |
| GET    | `course/:id/modules`                           | `X-User-Id`                                  | Модули курса (syllabus)   |
| GET    | `submodule-step/:submoduleId/step/:stepNumber` | `X-User-Id`                                  | Шаг                       |
| POST   | `submodule-step/:stepId/user-completed-step`   | `X-User-Id`                                  | Отметить шаг пройденным   |
| GET    | `course/:id/review`                            | `X-User-Id`                                  | Отзывы курса              |
| POST   | `course/:id/review`                            | `X-User-Id`                                  | Создать отзыв             |
| PUT    | `course/:id/review`                            | `X-User-Id`                                  | Изменить отзыв            |
| DELETE | `course/:id/review/:reviewId`                  | `X-User-Id`                                  | Удалить отзыв             |
| POST   | `course/:id/review/:reviewId/reaction`         | `X-User-Id`                                  | Лайк/дизлайк              |
| GET    | `user/profile`                                 | `X-User-Id`                                  | Профиль пользователя      |
