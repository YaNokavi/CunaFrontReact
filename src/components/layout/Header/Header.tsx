import { matchPath, useLocation } from "react-router-dom";
import { pageTitles } from "./pageTitles.data.ts";

export default function Header() {
  const location = useLocation();

  const currentPage = pageTitles.find(({ path }: any) =>
    matchPath({ path, end: true }, location.pathname),
  );

  return <header>{currentPage ? currentPage.title : ""}</header>;
}
