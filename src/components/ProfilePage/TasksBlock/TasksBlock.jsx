import styles from "./styles.module.scss";
import Task from "./Task";

export default function TasksBlock({ tasksInfo }) {
  return (
    <div className="block" style={{ flexDirection: "column" }}>
      <div className={styles.header}>Задания</div>
      <div className={styles.list}>
        {tasksInfo.length > 0 ? (
          tasksInfo.map((task) => <Task key={task.taskId} task={task} />)
        ) : (
          <div className={styles.enableTasks}>Вы уже выполнили все задания</div>
        )}
      </div>
    </div>
  );
}
