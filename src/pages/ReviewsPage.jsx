import { useCallback, useEffect, useState } from "react";
import { reviewsService } from "../services/reviews.service";
import { useParams } from "react-router-dom";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ReviewGeneralBlock from "../components/ReviewsPage/ReviewGeneralBlock";
import ListUserReview from "../components/ReviewsPage/ListUserReview";

export default function ReviewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState(null);
  const [ratingInfo, setRatingInfo] = useState(null);
  const [currentUserReview, setCurrentUserReview] = useState(null);

  const { userId } = useTelegramUser();

  const { courseId } = useParams();

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
          <ReviewGeneralBlock
            currentUserReview={currentUserReview}
            ratingInfo={ratingInfo}
          />
          {reviewsData.length > 0 && (
            <>
              <div className="sorting-block-swipes" id="buttons-block">
                <div className="widget-button active" id="widget-button-first">
                  Новые
                </div>
                <div className="widget-button" id="widget-button-second">
                  Хорошие
                </div>
                <div className="widget-button" id="widget-button-third">
                  Плохие
                </div>
                <div className="widget-button" id="widget-button-fourth">
                  Полезные
                </div>
              </div>
              <div className="comment-list">
                {reviewsData.map((review) => {
                  return <ListUserReview review={review} />;
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
