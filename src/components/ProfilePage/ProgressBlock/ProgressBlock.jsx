import CourseProgressBar from "./ProgressBars/ProgressBars";
import styles from "./styles.module.css";

export default function ProgressBlock({ coursesProgress }) {
  return (
    <div className="block" style={{ flexDirection: "column" }}>
      <div className={styles.header}>Прогресс</div>
      <div className={styles.progress}>
        {coursesProgress.length > 0 ? (
          coursesProgress.map((course) => (
            <div key={course.courseName}>
              <div className={styles.name}>{course.courseName}</div>
              <CourseProgressBar progress={course.progress} />
            </div>
          ))
        ) : (
          <div className={styles.enableCourses}>
            Вы не изучаете ни один курс
          </div>
        )}
      </div>
    </div>
  );
}
