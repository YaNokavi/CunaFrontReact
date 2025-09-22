import { useState } from "react";
import ReviewArea from "./CurrentUserReviewArea";
import ProgressBarReviews from "@/UI/ProgressBarReviews.jsx";

export default function ReviewGeneralBlock({ ratingInfo, currentUserReview }) {
  const [isWriting, setIsWriting] = useState(false);

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
      {isWriting && <ReviewArea currentUserReview={currentUserReview} />}
      {!isWriting &&
        (!currentUserReview ? (
          <button
            className="course-block-button"
            onClick={handleWriteCommentClick}
          >
            <span>Оставить отзыв</span>
          </button>
        ) : (
          <button
            className="course-block-button"
            onClick={handleWriteCommentClick}
          >
            <span>Изменить отзыв</span>
          </button>
        ))}
    </div>
  );
}
