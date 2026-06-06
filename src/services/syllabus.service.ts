import fetchData from "./CustomFetch.ts";

class SyllabusService {
  async getSyllabus(userId: number, courseId: number) {
    try {
      const syllabusData = await fetchData(
        `course/${courseId}/content`,
        "GET",
        {
          "X-User-Id": userId,
        }
      );

      return syllabusData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка при загрузке содержания:", error, error.message);
      } else {
        console.error("Неизвестная ошибка", error);
      }
      alert("Не удалось получить содержание, попробуйте позже");
    }
  }
}

export const syllabusService = new SyllabusService();
