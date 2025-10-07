export function getCommentColor(rating) {
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
