import { useEffect, useMemo, useRef, useState } from "react";
import useTelegramUser from "../../../../../hooks/useTelegramUser";
import AnimateIcons from "./AnimateIcons";

export default function CopyButton({ isReferrals }) {
  const { userId } = useTelegramUser();
  const timeoutRef = useRef(null);
  const [iconState, setIconState] = useState("default");

  const link = useMemo(
    () => `https://t.me/cunaedu_bot/CunaEdu?startapp=${userId}`,
    [userId]
  );

  const handleClick = async () => {
    if (iconState !== "default") return;

    try {
      await navigator.clipboard.writeText(link);
      setIconState("fadeOut");

      //TODO потом проверить вибрацию
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("success");
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(
        () => setIconState("fadeOutCopied"),
        1200
      );
    } catch (error) {
      console.error("Ошибка копирования: ", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      className={`friends-block-button ${isReferrals ? "link-not-null" : ""}`}
      onClick={handleClick}
    >
      {!isReferrals && (
        <div className="friends-block-button-text">Скопировать ссылку</div>
      )}
      <AnimateIcons iconState={iconState} setIconState={setIconState} />
    </button>
  );
}
