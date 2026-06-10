import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCleanUsername } from "../utils/getCleanUsername.ts";

const TelegramUserContext = createContext({
  userId: 0,
  username: "",
  userAvatarUrl: "",
});

export function TelegramUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // const [userId, setUserId] = useState(535799793);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("Yan_Miracles");
  const [userAvatarUrl, setUserAvatarUrl] = useState("none");

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (!tg) {
      // локальная разработка без Telegram
      setUserId(10);
      setUsername("DevUser");
      localStorage.setItem("flagFirstJoin", "true");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const referallId = urlParams.get("tgWebAppStartParam") || "";
      localStorage.setItem("referallId", referallId);
      return;
    }
    tg.ready();

    // Устанавливаем flagFirstJoin и referallId при каждом запуске из Telegram
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const referallId = urlParams.get("tgWebAppStartParam") || "";
    localStorage.setItem("referallId", referallId);
    localStorage.setItem("flagFirstJoin", "true");

    if (tg.initDataUnsafe?.user) {
      setUserAvatarUrl(tg.initDataUnsafe.user.photo_url || "");
      setUserId(tg.initDataUnsafe.user.id || 0);
      const rawUsername = tg.initDataUnsafe?.user?.username;
      setUsername(rawUsername ? getCleanUsername(rawUsername) : "User");
    }
  }, []);

  return (
    <TelegramUserContext.Provider value={{ userId, username, userAvatarUrl }}>
      {children}
    </TelegramUserContext.Provider>
  );
}

export default TelegramUserContext;
