export const getUserAvatar = (avatarUrl, username) => {
    if (avatarUrl) {
      return (
        <div
          className="friends-list-user-logo"
          style={{
            backgroundColor: "",
            backgroundImage: `url('${avatarUrl}')`,
          }}
        ></div>
      );
    } else {
      return (
        <div
          className="friends-list-user-logo"
          style={{
            backgroundColor: "#e04646",
            backgroundImage: "none",
          }}
        >
          {username[0].toUpperCase()}
        </div>
      );
    }
  };