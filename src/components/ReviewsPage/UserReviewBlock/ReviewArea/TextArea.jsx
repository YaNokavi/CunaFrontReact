import { useEffect, useRef } from "react";
import StarsRating from "./StarsRating";
import DOMPurify from "dompurify";
import { useReviewAreaStore } from "../../store";

export default function TextArea() {
  const maxLength = 2000;

  const commentTextarea = useRef(null);
  const comment = useReviewAreaStore((state) => state.comment);
  const setComment = useReviewAreaStore((state) => state.setComment);

  useEffect(() => {
    if (commentTextarea.current) {
      commentTextarea.current.style.height = "auto";
      commentTextarea.current.style.height =
        commentTextarea.current.scrollHeight + "px";
      commentTextarea.current.focus();
      const length = commentTextarea.current.value.length;
      commentTextarea.current.setSelectionRange(length, length);
    }
  }, [comment]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setComment(DOMPurify.sanitize(value));
    } else {
      setComment(value.substring(0, maxLength));
    }
  };
  return (
    <div className="comment-write-zone">
      <textarea
        ref={commentTextarea}
        onChange={handleChange}
        value={comment}
        name="comment"
        placeholder="Напишите здесь ваш комментарий..."
        rows="4"
      ></textarea>
      <StarsRating />
    </div>
  );
}
