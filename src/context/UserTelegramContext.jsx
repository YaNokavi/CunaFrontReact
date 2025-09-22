import { createContext, useEffect, useState } from "react";
import { getCleanUsername } from "../utils/getCleanUsername";

const TelegramUserContext = createContext({
  userId: 1,
  username: "",
  userAvatarUrl: "",
});

export function TelegramUserContextProvider({ children }) {
  // const [userId, setUserId] = useState(535799793);
  const [userId, setUserId] = useState(1);
  const [username, setUsername] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg) return;
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
