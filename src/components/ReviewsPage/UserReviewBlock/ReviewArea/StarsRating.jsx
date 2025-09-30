export default function StarsRating({ userRating, setUserRating }) {
  const starsData = [1, 2, 3, 4, 5];

  const handleStarClick = (value) => {
    if (value === userRating) return;
    setUserRating(value);
  };
  return (
    <div className="stars-text-block">
      Ваша оценка:
      <div className="stars-svg-rating">
        {starsData.map((value) => (
          <svg
            key={value}
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`star-rating ${value <= userRating ? "active" : ""}`}
            onClick={() => handleStarClick(value)}
          >
            <path d="M15 0.5L10.8385 9.77216L0.734152 10.8647L8.26652 17.6878L6.18322 27.6353L15 22.58L23.8168 27.6353L21.7335 17.6878L29.2658 10.8647L19.1615 9.77216L15 0.5Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
