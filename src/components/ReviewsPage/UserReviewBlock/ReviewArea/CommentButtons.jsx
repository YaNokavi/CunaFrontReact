import { useParams } from "react-router-dom";
import useTelegramUser from "../../../../hooks/useTelegramUser";

import { reviewsService } from "../../../../services/reviews.service";

import DOMPurify from "dompurify";
import CancelModal from "./CancelModal";
import DeleteModal from "./DeleteModal";

export default function CommentButtons({
  currentUserReview,
  comment,
  userRating,
  setIsSending,
  setIsWriting,
  refreshReviews,
}) {
  const { courseId } = useParams();

  const { userId } = useTelegramUser();

  const { reviewId = null, rating = 0, message = "" } = currentUserReview || {};

  const handleSend = async () => {
    if (comment === message && rating === userRating) {
      alert("Ваш отзыв не изменился");
      return;
    }

    setIsSending(true);
    if (!reviewId) {
      const responce = await reviewsService.sendComment(
        DOMPurify.sanitize(comment),
        userRating,
        courseId,
        userId
      );
      console.log(responce, "post");
    } else {
      const responce = await reviewsService.changeComment(
        reviewId,
        DOMPurify.sanitize(comment),
        userRating,
        courseId
      );
      console.log(responce, "put");
    }
    setIsWriting(false);
    await refreshReviews();
    setIsSending(false);
  };

  return (
    <div className="buttons-block-rating">
      <button className="course-block-button" onClick={handleSend}>
        <span>Отправить</span>
      </button>
      <CancelModal
        comment={comment}
        userRating={userRating}
        setIsWriting={setIsWriting}
      />
      {currentUserReview && (
        <DeleteModal
          reviewId={reviewId}
          setIsSending={setIsSending}
          setIsWriting={setIsWriting}
          refreshReviews={refreshReviews}
        />
      )}
    </div>
  );
}
