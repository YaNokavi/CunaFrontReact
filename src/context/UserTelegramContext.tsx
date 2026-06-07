import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCleanUsername } from "../utils/getCleanUsername.ts";

const TelegramUserContext = createContext({
  userId: 2,
  username: "",
  userAvatarUrl: "",
});

export function TelegramUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userId, setUserId] = useState(535799793);
  // const [userId, setUserId] = useState(2);
  const [username, setUsername] = useState("Yan_Miracles");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    if (!tg) {
      // локальная разработка без Telegram
      setUserId(535799793);
      setUsername("DevUser");
      return;
    }
    tg.ready();
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
