import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar.tsx";
import Header from "./Header/Header.tsx";
import { useTelegramBackButton } from "../../hooks/useTelegramBackButton.ts";
import { useTelegramSwipeBack } from "../../hooks/useTelegramSwipeBack.ts";

export default function Layout() {
  useTelegramBackButton();
  useTelegramSwipeBack();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <NavigationBar />
    </>
  );
}
