import { useEffect } from "react";
import Loader from "../../../../UI/Loader/Loader";
import TextArea from "./TextArea";
import CommentButtons from "./CommentButtons";
import { useReviewAreaStore } from "../../store";

export default function CurrentUserReviewArea({ currentUserReview }) {
  const { rating = 0, message = "" } = currentUserReview || {};
  const setComment = useReviewAreaStore((state) => state.setComment);
  const setUserRating = useReviewAreaStore((state) => state.setUserRating);

  useEffect(() => {
    setComment(message);
    setUserRating(rating);
  }, [message, rating, setComment, setUserRating]);

  return (
    <>
      {/* TODO Отображение загрузки и тестирование на низкой производительности*/}
      {/* {isSending && <Loader />} */}
      <TextArea />
      <CommentButtons currentUserReview={currentUserReview} />
    </>
  );
}
