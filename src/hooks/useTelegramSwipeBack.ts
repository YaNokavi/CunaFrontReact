import { useEffect } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { isMobile } from "../services/telegram.service";

const SWIPE_DISTANCE = 100;
const STEP_ROUTE = "/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber";

function getStepBackPath(pathname: string): string | null {
  const match = matchPath(STEP_ROUTE, pathname);
  if (!match) return null;
  const { courseId } = match.params as { courseId: string };
  return `/favorite/${courseId}/syllabus`;
}

// Свайп назад с левого края (как в iOS)
export function useTelegramSwipeBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;
    let triggered = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      triggered = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (triggered) return;
      const moveX = e.touches[0].clientX;
      if (startX <= 15 && moveX - startX > SWIPE_DISTANCE) {
        triggered = true;
        const backPath = getStepBackPath(location.pathname);
        if (backPath) {
          navigate(backPath, { replace: true });
        } else {
          navigate(-1);
        }
      }
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [location.pathname]);
}
