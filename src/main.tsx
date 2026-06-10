import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.getElementById("root");
if (!root) throw new Error("Корневой элемент не найден");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry уже есть в CustomFetch — здесь отключаем повторные попытки React Query
      retry: 0,
      // Данные считаются актуальными 5 минут — не дёргаем API при каждом переходе назад
      staleTime: 5 * 60 * 1000,
      // Не рефетчим при возвращении фокуса (Telegram WebApp часто сворачивается)
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
