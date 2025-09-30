import fetchData from "./CustomFetch";
//TODO куда девать обработку тестов и изображений (отдельный сервис)
class StepService {
  async getSteps(submoduleId, userId) {
    let stepsData = null;
    const storedData = JSON.parse(localStorage.getItem("stepsData")) || [];
    if (
      storedData &&
      storedData.currentSubmoduleId === submoduleId &&
      Date.now() - storedData.storedTime < 3_600_000
    ) {
      stepsData = storedData;
    } else {
      stepsData = await fetchData(`submodule/${submoduleId}/steps`, "GET", {
        "X-User-Id": userId,
      });

      stepsData.currentSubmoduleId = this.submoduleId;
      stepsData.storedTime = Date.now();
      localStorage.setItem("stepsData", JSON.stringify(stepsData));
    }

    return stepsData;
  }

  async getCourseContent(urlContent) {
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

  changeStorage(stepId) {
    const storedData = JSON.parse(localStorage.getItem("stepsData"));
    const stepsArray = storedData.steps;
    const step = stepsArray.find((step) => step.id === stepId);
    if (step) {
      step.completed = true;
    } else {
      console.warn(`Шаг с id=${stepId} не найден`);
    }
    storedData.steps = stepsArray;

    localStorage.setItem("stepsData", JSON.stringify(storedData));
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
      } else {
        this.changeStorage(stepId);
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
        this.changeStorage(stepId);
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
