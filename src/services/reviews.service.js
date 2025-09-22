import fetchData from "./CustomFetch";
//TODO userId

//TODO контроллеры для отправки коммента и реакций пользователя
class ReviewsService {
  async getReviews(userId, courseId, sortType = "NEW_FIRST", filter = false) {
    try {
      const reviewsData = await fetchData(
        `course/${courseId}/reviews?sort=${sortType}`,
        "GET",
        { "X-User-Id": userId }
      );
      return reviewsData;
      // this.ratingUI.displayComments(reviews.courseReviews);

      // this.ratingUI.displayRating(reviews.courseRatingInfo);

      // if (reviews.currentUserReview && !filter) {
      //   originalText = reviews.currentUserReview.message ?? "";
      //   originalStars = reviews.currentUserReview.rating;

      //   buttonWriteComment.style.display = "none";
      //   buttonChangeComment.style.display = "flex";
      //   buttonDelete.style.display = "flex";

      //   updateStars(originalStars);
      //   textarea.value = originalText;
      // }
    } catch (error) {
      console.error("Не удалось получить отзывы", error, error.status);
      alert("Не удалось получиться отзывы");
    }
  }
}

export const reviewsService = new ReviewsService();
