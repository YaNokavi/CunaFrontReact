import fetchData from "./CustomFetch";

class CatalogService {
  #URLCourses = "course/all";

  async getCourses(userId) {
    try {
      const coursesData = await fetchData(this.#URLCourses, "GET", {
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
