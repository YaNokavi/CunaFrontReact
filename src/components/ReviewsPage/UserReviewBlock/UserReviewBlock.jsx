import ProgressBarReviews from "@/UI/ProgressBarReviews/ProgressBarReviews.jsx";
import CurrentUserReviewArea from "./ReviewArea/CurrentUserReviewArea";
import { useActions, useIsWriting } from "../store";

export default function UserReviewBlock({ ratingInfo, currentUserReview }) {
  const isWriting = useIsWriting();
  const { setIsWriting } = useActions();

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
          onClick={() => setIsWriting(true)}
        >
          <span>
            {!currentUserReview ? "Оставить отзыв" : "Изменить отзыв"}
          </span>
        </button>
      )}
    </div>
  );
}
