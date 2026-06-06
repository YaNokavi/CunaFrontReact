// import { Link, useLocation } from "react-router-dom";
// import { tabs } from "./tabs.data";
// import styles from "./styles.module.scss";

// export default function NavigationBar() {
//   const location = useLocation();

//   function getClassName(path) {
//     const isActive = location.pathname.startsWith(path);
//     const activeStyle = isActive ? styles.active : "";

//     return `${styles.tabItem} ${activeStyle}`;
//   }

//   return (
//     <nav className={styles.navigationBar}>
//       {tabs.map(({ path, icon, title }) => {
//         return (
//           <Link key={path} to={path} className={getClassName(path)} replace>
//             {icon}
//             {title}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// }

// NavigationBar.jsx

import { Link, useLocation } from "react-router-dom";
import { tabs } from "./tabs.data";
import styles from "./styles.module.scss";

export default function NavigationBar() {
  const location = useLocation();

  function getItemClassName(path) {
    const isActive = location.pathname.startsWith(path);
    const activeStyle = isActive ? styles.tabItemActive : "";
    return `${activeStyle}`;
  }

  return (
    <nav className={`${styles.tabbar} ${styles.tabStyle2}`}>
      {tabs.map(({ path, icon, title }) => {
        return (
          <Link key={path} className={getItemClassName(path)} to={path} replace>
            {icon}
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
