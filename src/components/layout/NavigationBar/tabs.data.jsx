import FriendsIcon from "../../../assets/navigationIcons/friends.svg?react";
import ExpertsIcon from "../../../assets/navigationIcons/experts.svg?react";
import CatalogIcon from "../../../assets/navigationIcons/catalog.svg?react";
import FavoriteIcon from "../../../assets/navigationIcons/favorite.svg?react";
import ProfileIcon from "../../../assets/navigationIcons/profile.svg?react";

export const tabs = [
  {
    title: "Друзья",
    path: "/friends",
    icon: <FriendsIcon className="tab-icon" />,
  },
  {
    title: "Знатоки",
    path: "/experts",
    icon: <ExpertsIcon className="tab-icon" />,
  },
  {
    title: "Каталог",
    path: "/catalog",
    icon: <CatalogIcon className="tab-icon" />,
  },
  {
    title: "Мои курсы",
    path: "/favorite",
    icon: <FavoriteIcon className="tab-icon" />,
  },
  {
    title: "Профиль",
    path: "/profile",
    icon: <ProfileIcon className="tab-icon" />,
  },
];
