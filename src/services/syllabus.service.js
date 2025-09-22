import fetchData from "./CustomFetch";

class SyllabusService {
  async getSyllabus(userId, courseId) {
    try {
      const syllabusData = await fetchData(
        `course/${courseId}/content`,
        "GET",
        {
          "X-User-Id": userId,
        }
      );

      return syllabusData;
    } catch (error) {
      console.error("Ошибка при загрузке содержания:", error, error.status);
      alert("Не удалось получить содержание, попробуйте позже");
    }
  }
}

export const syllabusService = new SyllabusService();
