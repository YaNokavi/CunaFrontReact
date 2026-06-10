import fetchData from "./CustomFetch";

class ReviewsService {
  async getReviews(userId, courseId, sortType) {
    const reviewsData = await fetchData(
      `course/${courseId}/reviews?sort=${sortType}`,
      "GET",
      { "X-User-Id": userId }
    );
    return reviewsData;
  }

  async sendComment(comment, rating, courseId, userId) {
    const body = {
      rating: rating,
      comment: comment,
    };

    const response = await fetchData(
      `course/${courseId}/review`,
      "POST",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async changeComment(reviewId, comment, rating, courseId, userId) {
    const body = {
      reviewId: reviewId,
      rating: rating,
      comment: comment,
    };

    const response = await fetchData(
      `course/${courseId}/review`,
      "PUT",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async deleteComment(reviewId, courseId, userId) {
    const body = {
      reviewId: reviewId,
    };

    const response = await fetchData(
      `course/${courseId}/review`,
      "DELETE",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async sendUserReaction(userId, reviewId, reaction) {
    const body = { reaction: reaction };

    const response = await fetchData(
      `course/review/${reviewId}/reaction`,
      "POST",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async updateUserReaction(userId, reviewId, reaction) {
    const body = { reaction: reaction };

    const response = await fetchData(
      `course/review/${reviewId}/reaction`,
      "PUT",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async deleteUserReaction(userId, reviewId) {
    const response = await fetchData(
      `course/review/${reviewId}/reaction`,
      "DELETE",
      { "X-User-Id": userId },
      null,
      false
    );

    return response;
  }
}

export const reviewsService = new ReviewsService();
