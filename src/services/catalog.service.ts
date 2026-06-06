import type { ICourseBase } from "../types/CourseTypes/course.types";
import fetchData from "./CustomFetch";

class CatalogService {
  private readonly URLCourses = "course/all";

  async getCourses(userId: number): Promise<ICourseBase[] | undefined> {
    try {
      const coursesData = await fetchData(this.URLCourses, "GET", {
        "X-User-Id": userId,
      });
      return coursesData;
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
      alert("Не удалось получить курсы, попробуйте позже");
    }
  }
}

export const catalogService = new CatalogService();
