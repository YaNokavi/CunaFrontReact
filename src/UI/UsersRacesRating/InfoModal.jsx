import { useState } from "react";
import CustomModal from "../Modal/CustomModal";
import { InfoIcon } from "./InfoIcon";
import { useLocation } from "react-router-dom";

export default function InfoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <button className="top-block-info" onClick={() => setIsModalOpen(true)}>
        <InfoIcon />
      </button>
      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {pathname.startsWith("/experts") && (
          <span>
            Данный топ формируется на основе заработанных CUNA-токенов за
            прохождение курсов! Топ сбрасывается каждые две недели и после
            награды отправляются победителям.
            <br />
            <br />
            Чтобы иметь возможность получить наградру, необходимо получить
            минимум 150 CUNA-токенов!
          </span>
        )}
        {pathname.startsWith("/friends") && (
          <span>
            Данный топ формируется на основе заработанных CUNA-токенов вашими
            рефералами! Топ сбрасывается каждые четыре недели, и после награды
            отправляются победителям.
            <br />
            <br />
            Чтобы иметь возможность получить награду, необходимо пригласить
            минимум 5 друзей, которые должны в сумме получить не менее 1500
            CUNA-токенов. Учитываются только новые друзья, приглашенные во время
            гонки рефералов!
          </span>
        )}
        <footer>
          <button onClick={() => setIsModalOpen(false)}>Ок</button>
        </footer>
      </CustomModal>
    </>
  );
}
