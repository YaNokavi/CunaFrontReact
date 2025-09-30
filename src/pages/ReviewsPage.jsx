import { useCallback, useEffect, useState } from "react";
import { reviewsService } from "../services/reviews.service";
import { useParams } from "react-router-dom";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ListUserReview from "../components/ReviewsPage/ListUserReview/ListUserReview";
import UserReviewBlock from "../components/ReviewsPage/UserReviewBlock/UserReviewBlock";
import SortingBlockButtons from "../components/ReviewsPage/SortingBlockButtons/SortingBlockButtons";

export default function ReviewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const [ratingInfo, setRatingInfo] = useState(null);
  const [currentUserReview, setCurrentUserReview] = useState(null);
  //TODO нужно ли этот стейт
  const [isNeedReset, setIsNeedReset] = useState(false);

  const [reviewsLoading, setReviewsLoading] = useState(false);

  const { userId } = useTelegramUser();

  const { courseId } = useParams();

  const refreshReviewsList = async (sortType = "NEW_FIRST", filter = false) => {
    if (!filter) {
      setIsNeedReset(true);
    }
    setReviewsLoading(true);
    const reviewsData = await reviewsService.getReviews(
      userId,
      courseId,
      sortType
    );
    setReviewsData(reviewsData.courseReviews);
    setRatingInfo(reviewsData.courseRatingInfo);
    setCurrentUserReview(reviewsData.currentUserReview);
    setReviewsLoading(false);
  };

  const getReviews = useCallback(async () => {
    setIsLoading(true);
    const reviewsData = await reviewsService.getReviews(userId, courseId);
    setReviewsData(reviewsData.courseReviews);
    setRatingInfo(reviewsData.courseRatingInfo);
    if (reviewsData.currentUserReview) {
      setCurrentUserReview(reviewsData.currentUserReview);
    }
    setIsLoading(false);
  }, [userId, courseId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && reviewsData && (
        <>
          <UserReviewBlock
            currentUserReview={currentUserReview}
            ratingInfo={ratingInfo}
            refreshReviews={refreshReviewsList}
          />
          {/* TODO сделать локальный лоадер */}
          {/* {reviewsLoading && <Loader />} */}
          {reviewsData.length > 0 && (
            <SortingBlockButtons
              refreshReviews={refreshReviewsList}
              isNeedReset={isNeedReset}
              setIsNeedReset={setIsNeedReset}
            />
          )}
          {!reviewsLoading && reviewsData.length > 0 && (
            <>
              <div className="comment-list">
                {reviewsData.map((review) => {
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
