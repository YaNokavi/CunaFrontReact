import fetchData from "./CustomFetch";

class ExpertsService {
  #URLExperts = "event/student-competition";

  async getTopUsers(userId) {
    try {
      const topUsers = await fetchData(this.#URLExperts, "GET", {
        "X-User-Id": userId,
      });

      return topUsers;
    } catch (error) {
      console.error("Ошибка при загрузке знатоков:", error);
      alert("Не удалось получить топ знатоков, попробуйте позже");
    }
  }
}

export const expertsService = new ExpertsService();
