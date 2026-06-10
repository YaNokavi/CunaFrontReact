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
      const backPath = getBackPath(location.pathname);
      if (backPath) {
        navigate(backPath, { replace: true });
      } else {
        navigate(-1);
      }
    };

    tg.BackButton.onClick(handler);
    return () => tg.BackButton.offClick(handler);
  }, [location.pathname]);
}
