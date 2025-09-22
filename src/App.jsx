import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { TelegramUserContextProvider } from "./context/UserTelegramContext";

export default function App() {
  return (
    <TelegramUserContextProvider>
      <RouterProvider router={router} />
    </TelegramUserContextProvider>
  );
}
