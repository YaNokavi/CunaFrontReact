import { useEffect } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { isTelegram, hapticMedium } from "../services/telegram.service";

const tg = window.Telegram?.WebApp;

const ROUTES_WITH_BACK = [
  /^\/favorite\/[^/]+$/,
  /^\/favorite\/[^/]+\/rating$/,
  /^\/favorite\/[^/]+\/syllabus$/,
  /^\/favorite\/[^/]+\/syllabus\/[^/]+\/step\/\d+$/,
];

function shouldShowBack(pathname: string): boolean {
  return ROUTES_WITH_BACK.some((re) => re.test(pathname));
}

const STEP_ROUTE = "/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber";
const SYLLABUS_ROUTE = "/favorite/:courseId/syllabus";

function getBackPath(pathname: string): string | null {
  const stepMatch = matchPath(STEP_ROUTE, pathname);
  if (stepMatch) {
    const { courseId } = stepMatch.params as { courseId: string };
    return `/favorite/${courseId}/syllabus`;
  }
  const syllabusMatch = matchPath(SYLLABUS_ROUTE, pathname);
  if (syllabusMatch) {
    const { courseId } = syllabusMatch.params as { courseId: string };
    return `/favorite/${courseId}`;
  }
  return null;
}

// Полностью сбрасываем стек истории браузера и переходим на целевой путь
function navigateClearHistory(
  targetPath: string,
  navigate: ReturnType<typeof useNavigate>,
) {
  const steps = window.history.length - 1;
  if (steps <= 0) {
    navigate(targetPath, { replace: true });
    return;
  }

  // Сохраняем цель в sessionStorage
  sessionStorage.setItem("__nav_target", targetPath);

  // Идём назад на количество steps записей — это асинхронная операция,
  // поэтому переход делаем в обработчике popstate
  window.history.go(-steps);
}

export function useTelegramBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Обрабатываем popstate: после того как history.go отработало — делаем replace
  useEffect(() => {
    const onPopState = () => {
      const target = sessionStorage.getItem("__nav_target");
      if (!target) return;
      sessionStorage.removeItem("__nav_target");
      navigate(target, { replace: true });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [navigate]);

  useEffect(() => {
    if (!isTelegram || !tg) return;

    const show = shouldShowBack(location.pathname);
    if (show) {
      tg.BackButton.show();
    } else {
      tg.BackButton.hide();
    }

    const handler = () => {
      hapticMedium();
      const backPath = getBackPath(location.pathname);
      if (backPath) {
        navigateClearHistory(backPath, navigate);
      } else {
        navigate(-1);
      }
    };

    tg.BackButton.onClick(handler);
    return () => tg.BackButton.offClick(handler);
  }, [location.pathname]);
}
