import { useEffect } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { isMobile } from "../services/telegram.service";

const SWIPE_DISTANCE = 100;
const STEP_ROUTE =
  "/favorite/:courseId/syllabus/:submoduleId/step/:stepNumber";
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
        const backPath = getBackPath(location.pathname);
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
