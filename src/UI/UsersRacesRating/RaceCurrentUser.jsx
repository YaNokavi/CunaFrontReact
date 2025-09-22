import useTelegramUser from "../../hooks/useTelegramUser";
import { getRacePlaceClass } from "../../utils/getRacePlaceClass";

export default function RaceCurrentUser({ user }) {
  const { username, userAvatarUrl } = useTelegramUser();
  return (
    <div className="list-user">
      <div className="friends-list-block-logo-info">
        <div
          className="friends-list-user-logo"
          style={{ backgroundImage: `url('${userAvatarUrl}')` }}
        ></div>
        <div className="friends-list-user-info">
          <div className="friends-list-user-info-name">{username}</div>
          <div className="friends-list-user-info-balance">
            <div className="friends-list-user-info-balance-text">
              {user.userEventScore}
            </div>
            <div className="friends-list-user-info-balance-logo"></div>
          </div>
        </div>
      </div>
      <div className="list-user-rating">
        Рейтинг
        <div className={getRacePlaceClass(user.place)}>{user.place}</div>
      </div>
    </div>
  );
}
