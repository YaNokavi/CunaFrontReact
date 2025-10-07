export default function ProgressStars({ detailedRatingTotalNumber }) {
  const starsCount = [5, 4, 3, 2, 1];
  const values = starsCount.map((num) => detailedRatingTotalNumber[num] || 0);
  const total = values.reduce((acc, val) => acc + val, 0);
  return (
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
  );
}
