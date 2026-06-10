import { useEffect } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { isTelegram, hapticMedium } from "../services/telegram.service";

const tg = window.Telegram?.WebApp;

// Роуты где BackButton должен быть виден
const ROUTES_WITH_BACK = [
  /^\/favorite\/[^/]+$/,                              // /favorite/:courseId
  /^\/favorite\/[^/]+\/rating$/,                      // /favorite/:courseId/rating
  /^\/favorite\/[^/]+\/syllabus$/,                    // /favorite/:courseId/syllabus
  /^\/favorite\/[^/]+\/syllabus\/[^/]+\/step\/\d+$/, // /favorite/:courseId/syllabus/:submoduleId/step/:stepNumber
];

function shouldShowBack(pathname: string): boolean {
  return ROUTES_WITH_BACK.some((re) => re.test(pathname));
}

const STEP_ROUTE = "/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber";

function getStepBackPath(pathname: string): string | null {
  const match = matchPath(STEP_ROUTE, pathname);
  if (!match) return null;
  const { courseId } = match.params as { courseId: string };
  return `/favorite/${courseId}/syllabus`;
}

export function useTelegramBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

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
      const backPath = getStepBackPath(location.pathname);
      if (backPath) {
        navigate(backPath, { replace: true });
      } else {
        navigate(-1);
      }
    };

    tg.BackButton.onClick(handler);
    return () => {
      tg.BackButton.offClick(handler);
    };
  }, [location.pathname]);
}
