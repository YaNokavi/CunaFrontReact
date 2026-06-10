import { useState } from "react";
import { useParams } from "react-router-dom";
import useTelegramUser from "@/hooks/useTelegramUser";
import DOMPurify from "dompurify";
import CancelModal from "./CancelModal";
import DeleteModal from "./DeleteModal";
import { useActions, useComment, useUserRating } from "../../store";
import useChangeReview from "../../../../hooks/queries/ReviewsPage/UserReview/useChangeReview";
import useAddReview from "../../../../hooks/queries/ReviewsPage/UserReview/useAddReview";

export default function CommentButtons({ currentUserReview }) {
  const { courseId } = useParams();
  const { userId } = useTelegramUser();

  const comment = useComment();
  const userRating = useUserRating();
  const { setIsWriting } = useActions();

  const { reviewId = null, rating = 0, message = "" } = currentUserReview || {};

  const mutationAdd = useAddReview();
  const mutationChange = useChangeReview();

  const [error, setError] = useState("");

  const handleSend = () => {
    setError("");

    if (!userRating) {
      setError("Пожалуйста, выберите оценку");
      return;
    }

    if (comment === message && rating === userRating) {
      setError("Ваш отзыв не изменился");
      return;
    }

    if (!reviewId) {
      mutationAdd.mutate({
        comment: DOMPurify.sanitize(comment),
        userRating,
        courseId,
        userId,
      });
    } else {
      mutationChange.mutate({
        reviewId,
        comment: DOMPurify.sanitize(comment),
        userRating,
        courseId,
        userId,
      });
    }
    setIsWriting(false);
  };

  return (
    <>
      {error && <span className="review-form-error">{error}</span>}
      <div className="buttons-block-rating">
        <button className="course-block-button" onClick={handleSend}>
          <span>Отправить</span>
        </button>
        <CancelModal currentUserReview={currentUserReview} />
        {currentUserReview && <DeleteModal reviewId={reviewId} />}
      </div>
    </>
  );
}
