import fetchData from "./CustomFetch";

//TODO контроллеры для отправки коммента и реакций пользователя
class ReviewsService {
  async getReviews(userId, courseId, sortType) {
    try {
      const reviewsData = await fetchData(
        `course/${courseId}/reviews?sort=${sortType}`,
        "GET",
        { "X-User-Id": userId }
      );
      return reviewsData;
    } catch (error) {
      console.error("Не удалось получить отзывы", error, error.status);
      alert("Не удалось получиться отзывы");
    }
  }

  async sendComment(comment, rating, courseId, userId) {
    const body = {
      rating: rating,
      comment: comment,
    };

    try {
      const responce = await fetchData(
        `course/${courseId}/review`,
        "POST",
        { "X-User-Id": userId },
        body,
        false
      );

      return responce;
      // Вызов методов через объекты
      // this.filterManager.setActivePosition(0);
      // this.ratingController.getReviews("NEW_FIRST", false);
    } catch (error) {
      console.error("Ошибка при отправке коммента:", error);
    }
  }

  async changeComment(reviewId, comment, rating, courseId) {
    const body = {
      reviewId: reviewId,
      rating: rating,
      comment: comment,
    };

    try {
      const responce = await fetchData(
        `course/${courseId}/review`,
        "PUT",
        {},
        body,
        false
      );
      return responce;
      // this.filterManager.setActivePosition(0);
      // this.ratingController.getReviews("NEW_FIRST", false);
    } catch (error) {
      console.error("Ошибка при отправке коммента:", error);
    }
  }

  async deleteComment(reviewId, courseId) {
    try {
      const body = {
        reviewId: reviewId,
      };

      const responce = await fetchData(
        `course/${courseId}/review`,
        "DELETE",
        {},
        body,
        false
      );
      return responce;
      // После удаления обновляем UI и отзывы
      // buttonWriteComment.style.display = "flex";
      // buttonChangeComment.style.display = "none";
      // buttonDelete.style.display = "none";
      // commentButtons.style.display = "none";
      // commentZone.style.display = "none";
      // textarea.value = "";
      // starsRating.forEach((star) => {
      //   star.classList.remove("active");
      // });

      //TODO запрос для получения свежих отзывов
      // this.filterManager.setActivePosition(0);
      // this.ratingController.getReviews("NEW_FIRST", false);
    } catch (error) {
      console.error("Ошибка при отправке коммента:", error);
    }
  }

  async sendUserReaction(userId, reviewId, reaction) {
    try {
      const body = {
        reaction: reaction,
      };

      const response = await fetchData(
        `course/review/${reviewId}/reaction`,
        "POST",
        { "X-User-Id": userId },
        body,
        false
      );

      return response;
    } catch (error) {
      console.error("Ошибка при отправке реакции:", error);
    }
  }

  async updateUserReaction(userId, reviewId, reaction) {
    try {
      const body = {
        reaction: reaction,
      };

      const response = await fetchData(
        `course/review/${reviewId}/reaction`,
        "PUT",
        { "X-User-Id": userId },
        body,
        false
      );

      return response;
    } catch (error) {
      console.error("Ошибка при изменении реакции:", error);
    }
  }

  async deleteUserReaction(userId, reviewId) {
    try {
      const response = await fetchData(
        `course/review/${reviewId}/reaction`,
        "DELETE",
        { "X-User-Id": userId },
        null,
        false
      );

      return response;
    } catch (error) {
      console.error("Ошибка при удалении реакции:", error);
    }
  }
}

export const reviewsService = new ReviewsService();
