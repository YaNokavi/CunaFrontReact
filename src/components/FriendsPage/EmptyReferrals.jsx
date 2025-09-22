import octopusGif from "@/assets/gif/octopus(miidle)_compressed.gif";
import RedirectButton from "./Buttons/InviteButtons/RedirectButton";
import CopyButton from "./Buttons/InviteButtons/CopyButton/CopyButton";

export default function EmptyReferrals() {
  return (
    <>
      <div className="block friends-block-null">
        <img
          src={octopusGif}
          style={{ height: 140, width: 140 }}
          alt="octopus gif"
        />
        <div className="friends-block-null-text">
          Приглашай друзей и получай больше Cuna-токенов
        </div>
        <div className="friends-block-null-text-down">
          За каждого приглашенного друга по твоей ссылке ты получишь 5% от его
          заработанных токенов CUNA
        </div>
      </div>
      <div className="friends-block-button-container">
        <RedirectButton />
        {/* TODO Стоит ли передавать bool */}
        <CopyButton isReferrals={false} />
      </div>
    </>
  );
}
