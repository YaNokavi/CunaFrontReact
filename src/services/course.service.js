import fetchData from "./CustomFetch";
//TODO userId
class CourseService {
  #URLCourse = "user/favorite-course";

  async getCourse(userId, courseId) {
    try {
      const courseData = await fetchData(`course/${courseId}/info`, "GET", {
        "X-User-Id": userId,
      });

      return courseData;
    } catch (error) {
      console.error("Ошибка при загрузке данных курса", error, error.status);
      alert("Ошибка при загрузке данных курса");
    }
  }

  async addCourse(userId, courseId) {
    // Логика добавления в избранное с запросом и обновлением UI
    try {
      const body = { courseId: courseId };
      const responce = await fetchData(
        this.#URLCourse,
        "POST",
        { "X-User-Id": userId },
        body,
        false
      );

      return responce;
      // Обновляем состояние курса и интерфейс

      // if (responce === 200) {
      //   this.course.data.favorite = true;
      //   if (this.course.lastCompletedStep) {
      //     this.ui.displayLastStep();
      //   }

      //   return responce;
      // }
    } catch (error) {
      console.error(
        "Не удалось добавить курс в избранное",
        error,
        error.status
      );
      alert("Не удалось добавить курс в избранное");
    }
  }

  async leaveCourse(userId, courseId) {
    try {
      const body = { courseId: courseId };
      const responce = await fetchData(
        this.#URLCourse,
        "DELETE",
        { "X-User-Id": userId },
        body,
        false
      );

      // Обновляем состояние курса и интерфейс
      // if (responce === 200) {
      //   this.course.data.favorite = false;
      //   this.ui.lastStepBlock.style.display = "none";
      return responce;
      // }
    } catch (error) {
      console.error(
        "Не удалось удалить курс из избранного",
        error,
        error.status
      );
      alert("Не удалось удалить курс из избранного");
      //TODO сделай нормальную обработку по статусам от сервера
      return 0;
    }
  }
}

export const courseService = new CourseService();
