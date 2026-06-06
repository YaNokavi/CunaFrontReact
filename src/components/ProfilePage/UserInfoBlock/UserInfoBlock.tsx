import useTelegramUser from "@/hooks/useTelegramUser";

export default function UserInfoBlock() {
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
      </div>
    </div>
  );
}
