import fetchData from "./CustomFetch";

export interface DailyTestResultBody {
  isSuccess: boolean;
  testStartDate: string;
}

class DailyTestService {
  async sendTestResult(
    userId: number,
    isSuccess: boolean,
    testStartDate: string,
  ) {
    const body: DailyTestResultBody = {
      isSuccess,
      testStartDate,
    };

    try {
      const response = await fetchData(
        "user/daily-test-result",
        "POST",
        { "X-User-Id": userId },
        body,
      );

      return response;
    } catch (error) {
      console.error("Ошибка сохранения Daily Test:", error);
      return null;
    }
  }

  async loadTestContent(contentUrl: string) {
    const response = await fetch(contentUrl);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки теста: ${response.status}`);
    }
    return response.json();
  }
}

export const dailyTestService = new DailyTestService();
