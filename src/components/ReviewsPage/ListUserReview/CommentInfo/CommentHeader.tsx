import calculateDate from "../../../../utils/ListUserReview/calculateData";
import type { IReviewItem } from "../../../../types/CourseTypes/course.types";

interface Props {
  review: IReviewItem;
}

export default function CommentHeader({ review }: Props) {
  return (
    <div className="comment-header">
      <div className="comment-username-date">
        <span className="comment-username">{review.username}</span>
        <div className="comment-date">{calculateDate(review.createTime)}</div>
      </div>
      <div className="comment-mark-rating">
        {review.rating}/5
        <svg
          style={{ marginTop: 2 }}
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 0L4.69667 4.01794L0.318132 4.49139L3.58216 7.44806L2.6794 11.7586L6.5 9.568L10.3206 11.7586L9.41784 7.44806L12.6819 4.49139L8.30333 4.01794L6.5 0Z"
            fill="#F1D904"
          ></path>
        </svg>
      </div>
    </div>
  );
}
