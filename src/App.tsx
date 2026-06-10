import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./providers/router.tsx";
import { TelegramUserContextProvider } from "./context/UserTelegramContext.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramUserContextProvider>
        <RouterProvider router={router} />
      </TelegramUserContextProvider>
    </QueryClientProvider>
  );
}
