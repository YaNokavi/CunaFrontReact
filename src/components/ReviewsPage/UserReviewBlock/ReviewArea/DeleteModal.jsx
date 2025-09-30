import { useState } from "react";
import { reviewsService } from "../../../../services/reviews.service";
import CustomModal from "@/UI/Modal/CustomModal";
import { useParams } from "react-router-dom";

export default function DeleteModal({
  reviewId,
  refreshReviews,
  setIsSending,
  setIsWriting,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { courseId } = useParams();

  const handleConfirmDelete = async () => {
    setIsSending(true);
    const responce = await reviewsService.deleteComment(reviewId, courseId);
    console.log(responce);
    setIsWriting(false);
    await refreshReviews();
    setIsSending(false);
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
