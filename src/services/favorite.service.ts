import fetchData from "./CustomFetch";

export interface LoginAndDailyTestResponse {
  contentUrl?: string;
  testStartDate?: string;
  history?: string | null;
  firstEntryToday?: boolean;
}

class FavoriteService {
  #URLAllCourses = "course/all";
  #URLLoginAndDailyTest = "user/login-and-daily-test";

  async sendUserInfo(
    userId: number,
    username: string,
    avatarUrl: string,
    referrerId: number | null,
  ): Promise<LoginAndDailyTestResponse | undefined> {
    const body = {
      username,
      avatarUrl,
      referrerId,
    };

    try {
      const response = await fetchData(
        this.#URLLoginAndDailyTest,
        "POST",
        {
          "X-User-Id": userId,
          "X-User-Ip": "111",
          "X-User-Device-Id": "111",
        },
        body,
      );

      return response as LoginAndDailyTestResponse;
    } catch (error) {
      console.error(
        "Не удалось получить информацию о пользователе",
        error,
      );
      alert("Не удалось получить информацию о пользователе, попробуйте позже");
    }
  }

  async getAllCourses(userId: number) {
    try {
      const coursesData = await fetchData(this.#URLAllCourses, "GET", {
        "X-User-Id": userId,
      });

      return coursesData;
    } catch (error) {
      console.error(
        "Не удалось получить информацию о курсах",
        error,
      );
      alert("Не удалось получить информацию о курсах, попробуйте позже");
    }
  }
}

export const favoriteService = new FavoriteService();
