import CustomModal from "@/UI/Modal/CustomModal";
import { useState } from "react";
import { useActions, useComment, useUserRating } from "../../store";

export default function CancelModal({ currentUserReview }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { rating = 0, message = "" } = currentUserReview || {};

  const comment = useComment();
  const userRating = useUserRating();
  const { setIsWriting } = useActions();

  const handleOpenModalCancel = () => {
    if (comment !== message || rating !== userRating) {
      setIsCancelModalOpen(true);
    } else {
      setIsWriting(false);
    }
  };

  return (
    <>
      <button className="rating-button-reverse" onClick={handleOpenModalCancel}>
        <span>Отмена</span>
      </button>

      <CustomModal
        open={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      >
        <span>Вы уверены, что хотите отменить редактирование отзыва?</span>
        <footer>
          <button onClick={() => setIsWriting(false)}>Да</button>
          <button onClick={() => setIsCancelModalOpen(false)}>Нет</button>
        </footer>
      </CustomModal>
    </>
  );
}
