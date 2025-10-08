import fetchData from "./CustomFetch";
//TODO куда девать обработку тестов и изображений (отдельный сервис)
class StepService {
  async getSteps(submoduleId, userId) {
    try {
      const stepsData = await fetchData(
        `submodule/${submoduleId}/steps`,
        "GET",
        {
          "X-User-Id": userId,
        }
      );

      return stepsData;
    } catch (error) {
      console.error(error);
    }
  }

  async getStepContent(urlContent) {
    try {
      const response = await fetch(urlContent);
      if (!response.ok) {
        throw new Error(
          `Ошибка загрузки контента: ${response.status} - ${response.statusText}`
        );
      }
      const content = await response.text();

      return content;
    } catch (error) {
      console.error(`Ошибка в getCourseContent: ${error.message}`);
      alert("Произошла ошибка при загрузке шага. Попробуйте позже.");
    }
  }

  async sendProgressText(userId, stepId) {
    try {
      const response = await fetchData(
        `submodule-step/${stepId}/user-completed-step`,
        "POST",
        { "X-User-Id": userId },
        null,
        false
      );
      if (response !== 200) {
        throw Error;
      }
    } catch (error) {
      console.error("Ошибка отправки прогресса:", error, error.status);
    }
  }

  async sendProgressTest(userId, stepId, sendTest) {
    try {
      const response = await fetchData(
        `submodule-step/${stepId}/user-completed-test`,
        "POST",
        { "X-User-Id": userId },
        sendTest
      );

      if (response) {
        //TODO уведы
        // this.stepUI.displayNotification(response);

        return { response: response, status: 200 };
      } else {
        throw Error;
      }
    } catch (error) {
      console.error(error, error.status);
      return error.status;
    }
  }
}

export const stepService = new StepService();
