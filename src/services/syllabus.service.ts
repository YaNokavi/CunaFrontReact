import fetchData from "./CustomFetch.ts";

class SyllabusService {
  async getSyllabus(userId: number, courseId: number) {
    const syllabusData = await fetchData(
      `course/${courseId}/content`,
      "GET",
      {
        "X-User-Id": userId,
      }
    );

    return syllabusData;
  }
}

export const syllabusService = new SyllabusService();
