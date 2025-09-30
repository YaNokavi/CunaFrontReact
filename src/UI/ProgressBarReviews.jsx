import getReviewsWord from "./gerReviewsWord";
//TODO декомпозиция
export default function ProgressBarReviews({ ratingInfo }) {
  const { rating, reviewsTotalNumber, detailedRatingTotalNumber } = ratingInfo;

  const starsCount = [5, 4, 3, 2, 1];
  const values = starsCount.map((num) => detailedRatingTotalNumber[num] || 0);

  const formattedRating = Number.isInteger(rating)
    ? rating.toString()
    : rating.toFixed(1);

  const total = values.reduce((acc, val) => acc + val, 0);

  return (
    <div className="mark-progress-block">
      <div className="mark-block">
        <div className="mark-with-star">
          <span>{formattedRating}/5</span>
          <svg
            style={{ marginBottom: 2 }}
            width="22"
            height="20"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 0.5L7.72565 6.68144L0.989435 7.40983L6.01101 11.9586L4.62215 18.5902L10.5 15.22L16.3779 18.5902L14.989 11.9586L20.0106 7.40983L13.2743 6.68144L10.5 0.5Z"
              fill="#F1D904"
            />
          </svg>
        </div>
        <div className="mark-text-amount-comments">
          {reviewsTotalNumber} {getReviewsWord(reviewsTotalNumber)}
        </div>
      </div>
      <div className="progress-block">
        {values.map((item, index) => {
          return (
            <div key={index} className="progress-block-elem">
              <div>
                {[...Array(starsCount[index])].map((_, i) => (
                  <svg
                    key={i}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 0.5L3.61283 3.59072L0.244718 3.95492L2.75551 6.22928L2.06107 9.54508L5 7.86L7.93893 9.54508L7.24449 6.22928L9.75528 3.95492L6.38717 3.59072L5 0.5Z"
                      fill="#9B9B9B"
                    />
                  </svg>
                ))}
              </div>
              <progress
                value={total > 0 ? Math.round((item / total) * 100) : 0}
                max="100"
              ></progress>
            </div>
          );
        })}
      </div>
    </div>
  );
}
