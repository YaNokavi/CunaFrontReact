import { Outlet } from "react-router-dom";

import NavigationBar from "./NavigationBar/NavigationBar";
import Header from "./Header/Header";

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
