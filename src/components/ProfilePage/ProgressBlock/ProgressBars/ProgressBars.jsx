import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export default function CourseProgressBar({ progress }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const el = progressBarRef.current;
    if (el) {
      setTimeout(() => {
        el.style.width = `${progress}%`;
        el.style.transition = "width 1s ease";
      }, 100);
    }
  }, [progress]);

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <div
          ref={progressBarRef}
          className={styles.progress}
          style={{
            width: 0,
            transition: "none",
          }}
        ></div>
      </div>
      <div className={styles.percent}>{progress}%</div>
    </div>
  );
}
