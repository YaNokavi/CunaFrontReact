import ProgressBarReviews from "@/UI/ProgressBarReviews/ProgressBarReviews";
import CurrentUserReviewArea from "./ReviewArea/CurrentUserReviewArea";
import { useActions, useIsWriting } from "../store";
import type { ICourseRatingInfo } from "../../../types/CourseTypes/course.types";

interface CurrentUserReview {
  reviewId: number;
  rating: number;
  message: string;
}

interface Props {
  ratingInfo: ICourseRatingInfo;
  currentUserReview: CurrentUserReview | null;
}

export default function UserReviewBlock({ ratingInfo, currentUserReview }: Props) {
  const isWriting = useIsWriting();
  const { setIsWriting } = useActions();

  return (
    <div
      className="block course-block"
      style={{
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
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
