import { useState } from "react";
import { useParams } from "react-router-dom";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ListUserReview from "../components/ReviewsPage/ListUserReview/ListUserReview";
import UserReviewBlock from "../components/ReviewsPage/UserReviewBlock/UserReviewBlock";
import SortingBlockButtons from "../components/ReviewsPage/SortingBlockButtons/SortingBlockButtons";
import useReviewsData from "../hooks/queries/ReviewsPage/useReviewsData";

export default function ReviewsPage() {
  const { userId } = useTelegramUser();

  const { courseId } = useParams();

  const [sortType, setSortType] = useState("NEW_FIRST");

  const { data, isPending } = useReviewsData(userId, courseId, sortType);

  const { courseReviews, courseRatingInfo, currentUserReview } = data || {};

  return (
    <>
      {isPending && <Loader />}
      {!isPending && courseReviews && (
        <>
          <UserReviewBlock
            currentUserReview={currentUserReview}
            ratingInfo={courseRatingInfo}
          />
          {/* TODO сделать локальный лоадер */}
          {/* {reviewsLoading && <Loader />} */}
          {courseReviews.length > 0 && (
            <SortingBlockButtons
              sortType={sortType}
              setSortType={setSortType}
            />
          )}
          {courseReviews.length > 0 && (
            <>
              <div className="comment-list">
                {courseReviews.map((review) => {
                  return (
                    <ListUserReview key={review.reviewId} review={review} />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
