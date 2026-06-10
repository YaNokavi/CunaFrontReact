import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isMobile } from "../services/telegram.service";

const SWIPE_DISTANCE = 100;

// Свайп назад с левого края (как в iOS)
export function useTelegramSwipeBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      const moveX = e.touches[0].clientX;
      if (startX <= 15 && moveX - startX > SWIPE_DISTANCE) {
        navigate(-1);
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
