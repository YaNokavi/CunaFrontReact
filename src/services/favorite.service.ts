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
      avatarUrl: avatarUrl || null,
      referrerId,
    };

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
  }

  async getAllCourses(userId: number) {
    const coursesData = await fetchData(this.#URLAllCourses, "GET", {
      "X-User-Id": userId,
    });

    return coursesData;
  }
}

export const favoriteService = new FavoriteService();
