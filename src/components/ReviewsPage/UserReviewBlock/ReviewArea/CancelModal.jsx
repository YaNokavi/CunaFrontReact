import CustomModal from "@/UI/Modal/CustomModal";
import { useState } from "react";
import { useReviewAreaStore } from "../../store";

export default function CancelModal({ currentUserReview }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { rating = 0, message = "" } = currentUserReview || {};

  const comment = useReviewAreaStore((state) => state.comment);
  const userRating = useReviewAreaStore((state) => state.userRating);
  const setIsWriting = useReviewAreaStore((state) => state.setIsWriting);

  const handleOpenModalCancel = () => {
    if (comment !== message || rating !== userRating) {
      setIsCancelModalOpen(true);
    } else {
      setIsWriting(false);
    }
  };

  const handleConfirmCancel = () => {
    setIsWriting(false);
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
          <button onClick={handleConfirmCancel}>Да</button>
          <button onClick={() => setIsCancelModalOpen(false)}>Нет</button>
        </footer>
      </CustomModal>
    </>
  );
}
