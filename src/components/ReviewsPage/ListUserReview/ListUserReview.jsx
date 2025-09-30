import { useCallback, useEffect, useRef, useState } from "react";
import CommentFooter from "./CommentFooter";
import CommentInfo from "./CommentInfo";
import calculateDate from "./calculateData";
import { reviewsService } from "../../../services/reviews.service";
import useTelegramUser from "@/hooks/useTelegramUser";

export default function ListUserReview({ review }) {
  const messageRef = useRef(null);
  const [likesCount, setLikesCount] = useState(review.likesCount);
  const [dislikesCount, setDislikesCount] = useState(review.dislikesCount);
  const likeReactionButton = useRef(null);
  const dislikeReactionButton = useRef(null);

  const { userId } = useTelegramUser();

  function getCommentColor(rating) {
    let commentColor = null;
    if (rating >= 4) {
      commentColor = "good";
    } else if (rating === 3) {
      commentColor = "medium";
    } else if (rating <= 2) {
      commentColor = "bad";
    }
    return commentColor;
  }

  function stripHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const [isNeedExpand, setIsNeedExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonRef = useRef(null);

  function getActiveClacc(currentUserReaction, reaction) {
    if (currentUserReaction === "LIKE" && reaction === "LIKE") {
      return "active";
    } else if (currentUserReaction === "DISLIKE" && reaction === "DISLIKE") {
      return "active";
    } else {
      return "";
    }
  }

  function checkExpandButtons() {
    const desc = messageRef.current;

    if (!desc) return;
    const lineHeight = parseInt(getComputedStyle(desc).lineHeight);
    const maxHeight = lineHeight * 2;

    if (desc.scrollHeight <= maxHeight) {
      setIsNeedExpand(false);
    } else {
      setIsNeedExpand(true);
    }
  }

  useEffect(() => {
    checkExpandButtons();

    window.addEventListener("resize", checkExpandButtons);

    return () => {
      window.removeEventListener("resize", checkExpandButtons);
    };
  }, [review.message]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleReactionClick = (event) => {
    const target = event.currentTarget;
    if (likeReactionButton.current.classList.contains("active")) {
      likeReactionButton.current.classList.remove("active");
      setLikesCount((prev) => prev - 1);
      if (target.classList.contains("like")) {
        deleteReaction(); //LIKE
        return;
      } else if (target.classList.contains("dislike")) {
        updateReaction("DISLIKE");
        dislikeReactionButton.current.classList.add("active");
        setDislikesCount((prev) => prev + 1);
      }
    } else if (dislikeReactionButton.current.classList.contains("active")) {
      dislikeReactionButton.current.classList.remove("active");
      setDislikesCount((prev) => prev - 1);
      if (target.classList.contains("dislike")) {
        deleteReaction(); //DISLIKE
        return;
      } else if (target.classList.contains("like")) {
        updateReaction("LIKE");
        likeReactionButton.current.classList.add("active");
        setLikesCount((prev) => prev + 1);
      }
    } else if (
      !dislikeReactionButton.current.classList.contains("active") &&
      !likeReactionButton.current.classList.contains("active")
    ) {
      target.classList.add("active");
      if (target.classList.contains("like")) {
        addReaction("LIKE");
        setLikesCount((prev) => prev + 1);
      } else if (target.classList.contains("dislike")) {
        addReaction("DISLIKE");
        setDislikesCount((prev) => prev + 1);
      }
    }
  };

  const addReaction = useCallback(
    async (reaction) => {
      const responce = await reviewsService.sendUserReaction(
        userId,
        review.reviewId,
        reaction
      );
      console.log(responce);
    },
    [userId, review.reviewId]
  );

  const updateReaction = useCallback(
    async (reaction) => {
      const responce = await reviewsService.updateUserReaction(
        userId,
        review.reviewId,
        reaction
      );
      console.log(responce);
    },
    [userId, review.reviewId]
  );

  const deleteReaction = useCallback(async () => {
    const responce = await reviewsService.deleteUserReaction(
      userId,
      review.reviewId
    );
    console.log(responce);
  }, [userId, review.reviewId]);

  return (
    <div
      className={`comment-block ${getCommentColor(review.rating)} ${
        isExpanded ? "expanded" : ""
      }`}
      data-review-id="${review.reviewId}"
    >
      {/* <CommentInfo review={review} messageRef={messageRef} /> */}
      <div className="comment-info">
        <div className="comment-text-rating">
          <div className="comment-header">
            <div className="comment-username-date">
              <span className="comment-username">{review.username}</span>
              <div className="comment-date">
                {calculateDate(review.createTime)}
              </div>
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
      {/* <CommentFooter review={review} messageRef={messageRef} /> */}

      <div className="footer-comment-block">
        <div className="user-marks-block">
          <div className="user-mark">
            <svg
              ref={likeReactionButton}
              onClick={(event) => handleReactionClick(event)}
              className={`user-mark-icon like ${getActiveClacc(
                review.currentUserReaction,
                "LIKE"
              )}`}
              width="24"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                stroke="currentColor"
              />
            </svg>
            <span>{likesCount}</span>
          </div>
          <div className="user-mark">
            <svg
              ref={dislikeReactionButton}
              onClick={(event) => handleReactionClick(event)}
              className={`user-mark-icon dislike ${getActiveClacc(
                review.currentUserReaction,
                "DISLIKE"
              )}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.4033 20.4392L4.45065 13.908C2.49447 12.0704 2.25692 9.04637 3.90216 6.92584L4.21151 6.52711C5.79541 4.48564 8.66322 4.36257 10.4435 5.90254L11.9999 7L13.7063 5.77883C15.494 4.37083 18.2482 4.54198 19.7884 6.52711L20.0978 6.92583C21.743 9.04636 21.5055 12.0704 19.5493 13.908L12.5967 20.4392C12.3572 20.6642 12.2374 20.7767 12.0963 20.8044C12.0327 20.8169 11.9673 20.8169 11.9037 20.8044C11.7625 20.7767 11.6428 20.6642 11.4033 20.4392Z" />
              <path
                d="M10.4435 5.90254C8.66322 4.36257 5.79541 4.48564 4.21151 6.52711L3.90216 6.92584C2.25692 9.04637 2.49447 12.0704 4.45065 13.908L11.4033 20.4392C11.6428 20.6642 11.7625 20.7767 11.9037 20.8044C11.9673 20.8169 12.0327 20.8169 12.0963 20.8044C12.2374 20.7767 12.3572 20.6642 12.5967 20.4392L19.5493 13.908C21.5055 12.0704 21.743 9.04636 20.0978 6.92583L19.7884 6.52711C18.2482 4.54198 15.494 4.37083 13.7063 5.77883L11.9999 7L10.4435 5.90254ZM10.4435 5.90254L9.40778 7.21531C8.75184 8.04672 8.42387 8.46243 8.50535 8.90711C8.58682 9.35179 9.04087 9.62421 9.94896 10.1691L11.2014 10.9205C12.0457 11.4271 12.4679 11.6804 12.5618 12.0982C12.6558 12.516 12.3827 12.9256 11.8365 13.7449L11 14.9997"
                stroke="currentColor"
              />
            </svg>
            <span>{dislikesCount}</span>
          </div>
        </div>
        {isNeedExpand && (
          <button
            ref={buttonRef}
            className="button-expand-description"
            onClick={toggleExpand}
          >
            <span>{isExpanded ? "Свернуть" : "Раскрыть"}</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.35 3.8999L6.50002 9.7499L0.650024 3.8999"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
