import { Link, useLocation } from "react-router-dom";
import { tabs } from "./tabs.data";

export default function NavigationBar() {
  const location = useLocation();

  function getClassName(path) {
    return location.pathname.startsWith(path) ? "tab-item active" : "tab-item";
  }

  return (
    <nav>
      {tabs.map(({ path, icon, title }) => {
        return (
          <Link key={path} to={path} className={getClassName(path)} replace>
            {icon}
            <div className="tab-label">{title}</div>
          </Link>
        );
      })}
    </nav>
  );
}
