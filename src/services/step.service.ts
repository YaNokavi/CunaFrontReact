import fetchData from "./CustomFetch";

class StepService {
  async getSteps(submoduleId, userId) {
    const stepsData = await fetchData(
      `submodule/${submoduleId}/steps`,
      "GET",
      {
        "X-User-Id": userId,
      }
    );

    return stepsData;
  }

  async getStepContent(urlContent) {
    const response = await fetch(urlContent);
    if (!response.ok) {
      throw new Error(
        `Ошибка загрузки контента: ${response.status} - ${response.statusText}`
      );
    }
    return response.text();
  }

  async sendProgressText(userId, stepId) {
    const response = await fetchData(
      `submodule-step/${stepId}/user-completed-step`,
      "POST",
      { "X-User-Id": userId },
      null,
      false
    );

    if (response !== 200) {
      throw new Error(`Неожиданный статус: ${response}`);
    }
  }

  async sendProgressTest(userId, stepId, sendTest) {
    const response = await fetchData(
      `submodule-step/${stepId}/user-completed-test`,
      "POST",
      { "X-User-Id": userId },
      sendTest
    );

    if (!response) {
      throw new Error("Пустой ответ от сервера");
    }

    return { response, status: 200 };
  }
}

export const stepService = new StepService();
