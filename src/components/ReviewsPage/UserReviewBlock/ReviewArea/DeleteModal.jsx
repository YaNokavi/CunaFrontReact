import { useState } from "react";
import CustomModal from "@/UI/Modal/CustomModal";
import { useParams } from "react-router-dom";
import { TrashIcon } from "./TrashIcon";
import { useReviewAreaStore } from "../../store";
import useDeleteReview from "../../../../hooks/queries/ReviewsPage/UserReview/useDeleteReview";
import useTelegramUser from "../../../../hooks/useTelegramUser";

export default function DeleteModal({ reviewId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const setIsWriting = useReviewAreaStore((state) => state.setIsWriting);

  const { courseId } = useParams();

  const { userId } = useTelegramUser();

  const { mutate, isPending } = useDeleteReview();

  const handleConfirmDelete = async () => {
    console.log(isPending);
    mutate({ reviewId, courseId, userId });
    setIsWriting(false);
  };
  return (
    <>
      <button
        className="rating-button-delete"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <TrashIcon />
      </button>
      <CustomModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <span>Вы уверены, что хотите удалить отзыв?</span>
        <footer>
          <button onClick={handleConfirmDelete}>Да</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>Нет</button>
        </footer>
      </CustomModal>
    </>
  );
}
