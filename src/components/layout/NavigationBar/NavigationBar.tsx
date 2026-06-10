import { Link, useLocation } from "react-router-dom";
import { tabs } from "./tabs.data.tsx";
import styles from "./styles.module.scss";
import { hapticMedium } from "../../../services/telegram.service.ts";

export default function NavigationBar() {
  const location = useLocation();

  function getItemClassName(path: string) {
    const isActive = location.pathname.startsWith(path);
    return isActive ? styles.tabItemActive : "";
  }

  return (
    <nav className={styles.tabbar}>
      {tabs.map(({ path, icon, title }) => (
        <Link
          key={path}
          className={getItemClassName(path)}
          to={path}
          replace
          onClick={hapticMedium}
        >
          {icon}
          {title}
        </Link>
      ))}
    </nav>
  );
}
