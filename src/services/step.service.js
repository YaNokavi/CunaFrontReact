import fetchData from "./CustomFetch";
//TODO userId

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

      // stepsData.currentSubmoduleId = this.submoduleId;
      // stepsData.storedTime = Date.now();
      // localStorage.setItem("stepsData", JSON.stringify(stepsData));
    }

    // this.stepUI.displayStepInfo(stepsData.steps.length);
    // this.stepUI.createNavigationMenu(stepsData.steps);
    // this.getCourseContent(stepsData.steps);
    // setButtonHref(buttonsArray, stepsData);
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
      // this.stepUI.displayContent(content, stepId, isTest, isComplete);
    } catch (error) {
      console.error(`Ошибка в getCourseContent: ${error.message}`);
      alert("Произошла ошибка при загрузке шага. Попробуйте позже.");
    }
  }
}

export const stepService = new StepService();
