import { useState, useEffect } from "react";
import Loader from "../../../../UI/Loader/Loader";
import TextArea from "./TextArea";
import CommentButtons from "./CommentButtons";

export default function CurrentUserReviewArea({
  currentUserReview,
  setIsWriting,
  refreshReviews,
}) {
  const [isSending, setIsSending] = useState(false);

  const { rating = 0, message = "" } = currentUserReview || {};
  const [comment, setComment] = useState(message || "");
  const [userRating, setUserRating] = useState(rating || 0);

  useEffect(() => {
    setComment(message);
    setUserRating(rating);
  }, [message, rating]);

  return (
    <>
      {/* TODO Отображение загрузки и тестирование на низкой производительности*/}
      {isSending && <Loader />}
      <TextArea
        comment={comment}
        setComment={setComment}
        userRating={userRating}
        setUserRating={setUserRating}
      />
      <CommentButtons
        currentUserReview={currentUserReview}
        comment={comment}
        userRating={userRating}
        setIsWriting={setIsWriting}
        refreshReviews={refreshReviews}
        setIsSending={setIsSending}
      />
    </>
  );
}
