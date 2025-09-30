import { Link } from "react-router-dom";
import ProgressBarReviews from "@/UI/ProgressBarReviews";

export default function CourseReviews({ ratingInfo }) {
  return (
    <div className="block course-block">
      <div className="course-block-header">Отзывы</div>
      <ProgressBarReviews ratingInfo={ratingInfo} />
      <Link to="rating" className="course-block-button">
        <span id="button-href-comments"> Перейти к отзывам </span>
      </Link>
    </div>
  );
}
