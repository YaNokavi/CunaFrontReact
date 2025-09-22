import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function FavoriteCoursesEmpty() {
  return (
    <div className={`block ${styles.coursesEmpty}`}>
      <span>У вас еще нет курсов</span>
      <Link to="/catalog" className={styles.button}>
        <span>Добавить курс</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9998 7V15M6.99959 11H15M21.0003 11C21.0003 16.5228 16.523 21 10.9998 21C5.47666 21 0.999268 16.5228 0.999268 11C0.999268 5.47715 5.47666 1 10.9998 1C16.523 1 21.0003 5.47715 21.0003 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
