import { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import useTelegramUser from "@/hooks/useTelegramUser";
import { tasksService } from "../../../services/ProfileService/tasks.service";

export default function Task({ task }) {
  const { taskId, iconUrl, header, reward, taskUrl } = task;
  const [isLoadTask, setIsLoadTask] = useState(false);
  const [buttonMode, setButtonMode] = useState(taskUrl ? "execute" : "check");

  const { userId } = useTelegramUser();

  const checkTask = useCallback(async () => {
    if (isLoadTask) return;

    if (buttonMode === "execute") {
      window.open(taskUrl, "_blank");
      setButtonMode("check");
    } else if (buttonMode === "check") {
      setIsLoadTask(true);
      const taskCheckInfo = await tasksService.checkTask(userId, taskId);
      console.log(taskCheckInfo);
      if (!taskCheckInfo && taskUrl) {
        setButtonMode("execute");
      }
      setIsLoadTask(false);
    }
  }, [buttonMode, isLoadTask, userId, taskId, taskUrl]);

  return (
    <div className={styles.item}>
      <img src={iconUrl} className={styles.logo} />
      <div className={styles.textBlock}>
        <div className={styles.name}>{header}</div>
        <div className={styles.description}>+{reward} CUNA</div>
      </div>
      <div className={styles.buttonBlock}>
        <button
          className={
            !isLoadTask
              ? styles.button
              : `${styles.loadTask} ${styles.loadTaskAnimation}`
          }
          onClick={checkTask}
        >
          {!isLoadTask
            ? buttonMode === "execute"
              ? "Выполнить"
              : "Проверить"
            : ""}
        </button>
      </div>
    </div>
  );
}
