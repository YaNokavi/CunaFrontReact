import { useEffect } from "react";
import Loader from "../../../../UI/Loader/Loader";
import TextArea from "./TextArea";
import CommentButtons from "./CommentButtons";
import { useActions } from "../../store";

export default function CurrentUserReviewArea({ currentUserReview }) {
  const { rating = 0, message = "" } = currentUserReview || {};
  const { setComment, setUserRating } = useActions();

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
