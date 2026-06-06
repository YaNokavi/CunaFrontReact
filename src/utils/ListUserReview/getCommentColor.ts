export function getCommentColor(rating: number): string {
  let commentColor: string;
  if (rating >= 4) {
    commentColor = "good";
  } else if (rating === 3) {
    commentColor = "medium";
  } else {
    commentColor = "bad";
  }
  return commentColor;
}
