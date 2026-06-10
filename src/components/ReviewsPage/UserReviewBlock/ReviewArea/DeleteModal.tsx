import { useRef, useState } from "react";
import CustomModal from "@/UI/Modal/CustomModal";
import { useParams } from "react-router-dom";
import { TrashIcon } from "./TrashIcon";
import { useActions } from "../../store";
import useDeleteReview from "../../../../hooks/queries/ReviewsPage/UserReview/useDeleteReview";
import useTelegramUser from "../../../../hooks/useTelegramUser";

export default function DeleteModal({ reviewId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setIsWriting } = useActions();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { courseId } = useParams();
  const { userId } = useTelegramUser();
  const { mutate, isPending } = useDeleteReview();

  const handleOpen = () => {
    buttonRef.current?.blur();
    setIsDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
    // Снимаем фокус с кнопки после закрытия
    requestAnimationFrame(() => {
      (document.activeElement as HTMLElement)?.blur();
    });
  };

  const handleConfirmDelete = () => {
    mutate({ reviewId, courseId, userId });
    setIsWriting(false);
    handleClose();
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="rating-button-delete"
        onClick={handleOpen}
      >
        <TrashIcon />
      </button>
      <CustomModal open={isDeleteModalOpen} onClose={handleClose}>
        <span>Вы уверены, что хотите удалить отзыв?</span>
        <footer>
          <button onClick={handleConfirmDelete} disabled={isPending}>Да</button>
          <button onClick={handleClose}>Нет</button>
        </footer>
      </CustomModal>
    </>
  );
}
