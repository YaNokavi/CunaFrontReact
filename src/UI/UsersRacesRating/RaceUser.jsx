import { getCleanUsername } from "../../utils/getCleanUsername";
import { getRacePlaceClass } from "../../utils/getRacePlaceClass";
import { getUserAvatar } from "../../utils/getUserAvatar";

export default function RaceUser({ user }) {
  return (
    <div key={user.place} className="friends-list-user">
      <div className={getRacePlaceClass(user.place)}>{user.place}</div>
      <div className="friends-list-block-logo-info">
        {getUserAvatar(user.avatarUrl, user.username)}
        <div className="friends-list-user-info">
          <div className="friends-list-user-info-name">
            {getCleanUsername(user.username)}
          </div>
          <div className="friends-list-user-info-balance">
            <div className="friends-list-user-info-balance-text">
              {user.userEventScore}
            </div>
            <div className="friends-list-user-info-balance-logo"></div>
          </div>
        </div>
      </div>
      <div className="list-user-reward">
        {user.rewardAmount && `$${user.rewardAmount}`}
      </div>
    </div>
  );
}
