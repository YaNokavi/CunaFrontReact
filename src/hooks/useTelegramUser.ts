import { useContext } from "react";

import TelegramUserContext from "../context/UserTelegramContext";

export default function useTelegramUser() {
  return useContext(TelegramUserContext);
}
