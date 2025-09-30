import fetchData from "../CustomFetch";

class TasksService {
  #URLTasks = "task/all";

  async getTasks(userId) {
    try {
      const tasksInfo = await fetchData(this.#URLTasks, "GET", {
        "X-User-Id": userId,
      });
      return tasksInfo;
    } catch (error) {
      console.log("Не удалось получить задания, попробуйте позже", error);
      alert("Не удалось получить задания, попробуйте позже");
    }
  }

  async checkTask(userId, taskId) {
    try {
      const taskCheckInfo = await fetchData(
        `task/${taskId}/completed`,
        "POST",
        { "X-User-Id": userId }
      );
      return taskCheckInfo;
      
      //       displayNotification(taskCheckInfo.reward, "REWARD");
      //       this.balanceText.innerText = taskCheckInfo.newBalance.toFixed(2);
      //       buttonTask.classList.add("complete-task");
      //       buttonTask.textContent = "";
      //       buttonTask.innerHTML = `
      //         <svg style="color: var(--theme-button-hint-icon-text-color)" width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      // <path d="M21.5244 4.79211C21.3064 4.79861 21.0995 4.88973 20.9475 5.04616L8.114 17.8797L2.83309 12.5987C2.75576 12.5182 2.66314 12.4539 2.56065 12.4096C2.45817 12.3653 2.34787 12.3419 2.23623 12.3408C2.12458 12.3396 2.01383 12.3608 1.91047 12.403C1.8071 12.4452 1.71319 12.5076 1.63424 12.5866C1.55529 12.6655 1.49289 12.7594 1.45069 12.8628C1.40849 12.9661 1.38734 13.0769 1.38847 13.1885C1.38961 13.3002 1.41301 13.4105 1.4573 13.513C1.5016 13.6155 1.5659 13.7081 1.64644 13.7854L7.52067 19.6596C7.67806 19.8169 7.89147 19.9053 8.114 19.9053C8.33652 19.9053 8.54994 19.8169 8.70732 19.6596L22.1341 6.23281C22.2554 6.11494 22.3382 5.96318 22.3718 5.79742C22.4053 5.63167 22.388 5.45965 22.3221 5.30391C22.2562 5.14817 22.1447 5.01598 22.0024 4.92465C21.8601 4.83333 21.6935 4.78713 21.5244 4.79211Z" fill="#1468b1"
      //             stroke="currentColor" stroke-width="2"/>
      // </svg>
      // `;
      //     } else {
      //       displayNotification(null, "REWARD");
      //       buttonTask.classList.remove("load-task-animation");
      //       buttonTask.classList.remove("load-task");
      //       if (task.taskUrl !== null) {
      //         buttonTask.textContent = "Выполнить";
      //       } else {
      //         buttonTask.textContent = "Проверить";
      //       }
      //     }
    } catch (error) {
      console.error("Не удалось проверить задание", error);
      alert("Не удалось проверить задание");
    }
  }
}

export const tasksService = new TasksService();
