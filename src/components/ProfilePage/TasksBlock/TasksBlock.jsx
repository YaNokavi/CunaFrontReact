import styles from "./styles.module.scss";

export default function TasksBlock({ tasksInfo }) {
  return (
    <div className="block" style={{ flexDirection: "column" }}>
      <div className={styles.header}>Задания</div>
      <div className={styles.list}>
        {tasksInfo.length > 0 ? (
          tasksInfo.map((task) => (
            <div className={styles.item} key={task.taskId}>
              <div
                className={styles.logo}
                style={{ backgroundImage: `url("${task.iconUrl}")` }}
              ></div>
              <div className={styles.textBlock}>
                <div className={styles.name}>{task.header}</div>
                <div className={styles.description}>+ {task.reward} CUNA</div>
              </div>
              <button>{task.taskUrl ? "Выполнить" : "Проверить"}</button>
            </div>
          ))
        ) : (
          <div className={styles.enableTasks}>Вы уже выполнили все задания</div>
        )}
      </div>
    </div>
  );
}
