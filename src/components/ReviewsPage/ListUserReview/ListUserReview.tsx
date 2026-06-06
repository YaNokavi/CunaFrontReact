import { useState } from "react";
import CommentFooter from "./CommentFooter/CommentFooter";
import CommentInfo from "./CommentInfo/CommentInfo";
import { getCommentColor } from "../../../utils/ListUserReview/getCommentColor";
import { ExpandContext } from "@/context/ReviewPage/ExpandContext";
import type { IReviewItem } from "../../../types/CourseTypes/course.types";

interface Props {
  review: IReviewItem;
}

export default function ListUserReview({ review }: Props) {
  const [isNeedExpand, setIsNeedExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const contextValue = {
    isNeedExpand,
    setIsNeedExpand,
    isExpanded,
    toggleExpand,
  };

  return (
    <ExpandContext.Provider value={contextValue}>
      <div
        className={`comment-block ${getCommentColor(review.rating)} ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <CommentInfo review={review} />

        <CommentFooter review={review} />
      </div>
    </ExpandContext.Provider>
  );
}
