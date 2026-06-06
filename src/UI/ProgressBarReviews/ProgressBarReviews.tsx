import getReviewsWord from "./gerReviewsWord";
import IconStar from "./IconStar";
import ProgressStars from "./ProgressStars";
import type { ICourseRatingInfo } from "../../types/CourseTypes/course.types";

interface Props {
  ratingInfo: ICourseRatingInfo;
}

export default function ProgressBarReviews({ ratingInfo }: Props) {
  const { rating, reviewsTotalNumber, detailedRatingTotalNumber } = ratingInfo;

  const formattedRating = Number.isInteger(rating)
    ? rating.toString()
    : rating.toFixed(1);

  return (
    <div className="mark-progress-block">
      <div className="mark-block">
        <div className="mark-with-star">
          <span>{formattedRating}/5</span>
          <IconStar />
        </div>
        <div className="mark-text-amount-comments">
          {reviewsTotalNumber} {getReviewsWord(reviewsTotalNumber)}
        </div>
      </div>
      <ProgressStars detailedRatingTotalNumber={detailedRatingTotalNumber} />
    </div>
  );
}
