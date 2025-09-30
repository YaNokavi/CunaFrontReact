import { useState } from "react";
import ProgressBarReviews from "@/UI/ProgressBarReviews.jsx";
import CurrentUserReviewArea from "./ReviewArea/CurrentUserReviewArea";

export default function UserReviewBlock({
  ratingInfo,
  currentUserReview,
  refreshReviews,
}) {
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
      {isWriting && (
        <CurrentUserReviewArea
          currentUserReview={currentUserReview}
          setIsWriting={setIsWriting}
          refreshReviews={refreshReviews}
        />
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
