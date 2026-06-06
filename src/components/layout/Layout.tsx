import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar.tsx";
import Header from "./Header/Header.tsx";

export default function Layout() {
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
