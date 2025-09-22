import { getCleanUsername } from "../../utils/getCleanUsername.js";
import { getUserAvatar } from "../../utils/getUserAvatar.jsx";
import CopyButton from "./Buttons/InviteButtons/CopyButton/CopyButton.jsx";
import RedirectButton from "./Buttons/InviteButtons/RedirectButton.jsx";

export default function HaveReferrals({ referralsData }) {
  return (
    <>
      <div className="block friends-block-not-null">
        <div className="friends-block-not-null-text">
          Приглашенные друзья
          <div className="friends-block-not-null-amount">
            {referralsData.length}
          </div>
        </div>
        <div className="friends-block-not-null-text-down">
          За каждого приглашенного друга по твоей ссылке ты получишь 5% от его
          заработанных токенов CUNA
        </div>
        <div className="friends-block-not-null-list">
          {referralsData.map((referral, index) => (
            <div key={index} className="friends-list-user">
              <div className="friends-list-block-logo-info">
                {getUserAvatar(referral.avatarUrl, referral.name)}
                <div className="friends-list-user-info">
                  <div className="friends-list-user-info-name">
                    {getCleanUsername(referral.name)}
                  </div>
                  <div className="friends-list-user-info-balance">
                    <div className="friends-list-user-info-balance-text">
                      {referral.balance}
                    </div>
                    <div className="friends-list-user-info-balance-logo"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="friends-block-button-container not-null">
        <RedirectButton />
        {/* TODO Стоит ли передавать bool */}
        <CopyButton isReferrals={true} />
      </div>
    </>
  );
}
