import ProgressBarReviews from "@/UI/ProgressBarReviews/ProgressBarReviews.jsx";
import CurrentUserReviewArea from "./ReviewArea/CurrentUserReviewArea";
import { useReviewAreaStore } from "../store";

export default function UserReviewBlock({ ratingInfo, currentUserReview }) {
  const isWriting = useReviewAreaStore((state) => state.isWriting);
  const setIsWriting = useReviewAreaStore((state) => state.setIsWriting);

  const handleWriteCommentClick = () => {
    setIsWriting(true);
  };

  return (
    <div
      className="block course-block"
      style={{
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
      }}
    >
      <ProgressBarReviews ratingInfo={ratingInfo} />
      {isWriting && (
        <CurrentUserReviewArea currentUserReview={currentUserReview} />
      )}
      {!isWriting && (
        <button
          className="course-block-button"
          onClick={handleWriteCommentClick}
        >
          <span>
            {!currentUserReview ? "Оставить отзыв" : "Изменить отзыв"}
          </span>
        </button>
      )}
    </div>
  );
}
