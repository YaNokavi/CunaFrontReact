import { useMemo } from "react";
import useTelegramUser from "../../../../hooks/useTelegramUser";

export default function RedirectButton() {
  const { userId } = useTelegramUser();

  const link = useMemo(
    () => `https://t.me/cunaedu_bot/CunaEdu?startapp=${userId}`,
    [userId]
  );
  const text = encodeURIComponent("Узнавай новое вместе со мной (@cryptuna)");
  const url = encodeURIComponent(link);

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = `https://t.me/share/url?url=${url}&text=${text}`;
  };

  return (
    <button className="friends-block-button" onClick={handleClick}>
      <div className="friends-block-button-text">Пригласить друга</div>
      <svg
        className="friends-block-button-icon"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9996 19.5001V16.7917M19.9996 19.5001V22.2084M19.9996 19.5001H17.2913M19.9996 19.5001H22.7079M16.7496 15.3012C15.7543 14.8663 14.6552 14.6251 13.4996 14.6251C9.75364 14.6251 6.59975 17.1601 5.65991 20.6082C5.34524 21.7627 6.34469 22.7501 7.5413 22.7501H14.5829M17.2913 7.58341C17.2913 9.6775 15.5937 11.3751 13.4996 11.3751C11.4055 11.3751 9.70797 9.6775 9.70797 7.58341C9.70797 5.48933 11.4055 3.79175 13.4996 3.79175C15.5937 3.79175 17.2913 5.48933 17.2913 7.58341Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
