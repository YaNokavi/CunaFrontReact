import { useCallback, useEffect, useRef } from "react";
import CommentHeader from "./CommentHeader";
import { useExpand } from "../../../../hooks/useExpand";
import type { IReviewItem } from "../../../../types/CourseTypes/course.types";

interface Props {
  review: IReviewItem;
}

export default function CommentInfo({ review }: Props) {
  const messageRef = useRef<HTMLDivElement>(null);

  const { setIsNeedExpand, toggleExpand } = useExpand();

  function stripHtmlTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const checkExpandButtons = useCallback(() => {
    const desc = messageRef.current;

    if (!desc) return;
    const lineHeight = parseInt(getComputedStyle(desc).lineHeight);
    const maxHeight = lineHeight * 2;

    if (desc.scrollHeight <= maxHeight) {
      setIsNeedExpand(false);
    } else {
      setIsNeedExpand(true);
    }
  }, [setIsNeedExpand]);

  useEffect(() => {
    checkExpandButtons();

    window.addEventListener("resize", checkExpandButtons);

    return () => {
      window.removeEventListener("resize", checkExpandButtons);
    };
  }, [review.message, checkExpandButtons]);

  return (
    <div className="comment-info">
      <div className="comment-text-rating">
        <CommentHeader review={review} />
        {review.message && (
          <div
            ref={messageRef}
            className="comment-description"
            onClick={toggleExpand}
          >
            {stripHtmlTags(review.message)}
          </div>
        )}
      </div>
    </div>
  );
}
