import useTelegramUser from "@/hooks/useTelegramUser";
import PopUp from "./PopUp";

export default function UserInfoBlock({ cunaTokenBalance }) {
  const { userId, username, userAvatarUrl } = useTelegramUser();

  return (
    <div className="block profile-block-user">
      <div className="logo-userid-block">
        <div
          className="profile-logo"
          style={{ backgroundImage: `url('${userAvatarUrl}')` }}
        ></div>
        <div className="profile-userid">User ID: {userId}</div>
      </div>
      <div className="nickname-balance-block">
        <div className="profile-nickname">{username}</div>
        <div className="profile-balance-info-block">
          <div className="profile-balance-block">
            <div className="profile-balance-block-text">
              {Number.isInteger(cunaTokenBalance)
                ? cunaTokenBalance.toString()
                : cunaTokenBalance.toFixed(2)}
            </div>
            <div className="profile-balance-block-logo"></div>
          </div>
          <PopUp />
        </div>
      </div>
    </div>
  );
}
