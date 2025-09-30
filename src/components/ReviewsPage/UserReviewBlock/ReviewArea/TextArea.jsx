import { useEffect, useRef } from "react";
import StarsRating from "./StarsRating";
import DOMPurify from "dompurify";

export default function TextArea({
  comment,
  setComment,
  userRating,
  setUserRating,
}) {
  const maxLength = 2000;

  const commentTextarea = useRef(null);

  useEffect(() => {
    if (commentTextarea.current) {
      commentTextarea.current.style.height = "auto";
      commentTextarea.current.style.height =
        commentTextarea.current.scrollHeight + "px";
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
      <StarsRating userRating={userRating} setUserRating={setUserRating} />
    </div>
  );
}
