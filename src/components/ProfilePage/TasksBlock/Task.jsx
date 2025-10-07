import { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import useTelegramUser from "@/hooks/useTelegramUser";
import useCheckTask from "../../../hooks/queries/ProfilePage/useCheckTask";

export default function Task({ task }) {
  const { taskId, iconUrl, header, reward, taskUrl } = task || {};
  const [buttonMode, setButtonMode] = useState(taskUrl ? "execute" : "check");

  const { userId } = useTelegramUser();

  const mutation = useCheckTask(userId, taskId);

  const checkTask = useCallback(async () => {
    if (mutation.isPending) return;

    if (buttonMode === "execute") {
      window.open(taskUrl, "_blank");
      setButtonMode("check");
    } else if (buttonMode === "check") {
      try {
        const data = await mutation.mutateAsync();
        if (data) {
          setButtonMode("done"); //TODO выполненная таска
        } else if (taskUrl) {
          setButtonMode("execute");
        }
      } catch (error) {
        console.error("Ошибка при проверке задачи", error);
      }
    }
  }, [buttonMode, taskUrl, mutation]);

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
            !mutation.isPending
              ? styles.button
              : `${styles.loadTask} ${styles.loadTaskAnimation}`
          }
          onClick={checkTask}
        >
          {!mutation.isPending
            ? buttonMode === "execute"
              ? "Выполнить"
              : "Проверить"
            : ""}
        </button>
      </div>
    </div>
  );
}
