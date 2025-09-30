export default function getReviewsWord(count) {
  count = Math.abs(count) % 100;
  const lastDigit = count % 10;

  if (count > 10 && count < 20) return "отзывов";
  if (lastDigit > 1 && lastDigit < 5) return "отзыва";
  if (lastDigit === 1) return "отзыв";
  return "отзывов";
}
