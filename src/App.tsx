import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router.tsx";
import { TelegramUserContextProvider } from "./context/UserTelegramContext.tsx";

export default function App() {
  return (
    <TelegramUserContextProvider>
      <RouterProvider router={router} />
    </TelegramUserContextProvider>
  );
}
