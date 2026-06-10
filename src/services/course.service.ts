import fetchData from "./CustomFetch";

class CourseService {
  #URLCourse = "user/favorite-course";

  async getCourse(userId, courseId) {
    const courseData = await fetchData(`course/${courseId}/info`, "GET", {
      "X-User-Id": userId,
    });

    return courseData;
  }

  async addCourse(userId, courseId) {
    const body = { courseId: courseId };
    const response = await fetchData(
      this.#URLCourse,
      "POST",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }

  async leaveCourse(userId, courseId) {
    const body = { courseId: courseId };
    const response = await fetchData(
      this.#URLCourse,
      "DELETE",
      { "X-User-Id": userId },
      body,
      false
    );

    return response;
  }
}

export const courseService = new CourseService();
