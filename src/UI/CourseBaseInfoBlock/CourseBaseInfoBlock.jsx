import { Link, useLocation } from "react-router-dom";
import styles from "./course.module.css";

export default function CourseBaseInfoBlock({ course }) {
  const { pathname } = useLocation();

  const rating = course.rating;
  const formattedRating = Number.isInteger(rating)
    ? rating.toString()
    : rating.toFixed(1);

  return (
    <Link
      key={course.id}
      to={`${pathname}/${course.id}`}
      className={`block ${styles.coursesBlock}`}
    >
      <img src={course.iconUrl} className={styles.logo} />
      <div className={styles.text}>
        <div className={styles.name}>
          {course.name}
          {course?.favorite && (
            <div className={styles.favorite}>
              <svg
                className={styles.favoriteIcon}
                width="17"
                height="17"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 3H6.5C5.96957 3 5.46086 3.21071 5.08579 3.58579C4.71071 3.96086 4.5 4.46957 4.5 5V19C4.5 19.5304 4.71071 20.0391 5.08579 20.4142C5.46086 20.7893 5.96957 21 6.5 21H12.5M8.5 3V12L11.5 9L14.5 12V3M8.5 3H14.5M14.5 3H18.5C19.0304 3 19.5391 3.21071 19.9142 3.58579C20.2893 3.96086 20.5 4.46957 20.5 5V12M17 19L19 21L22 16"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.description}>{course.description}</div>
        <div className={styles.authorRating}>
          <div className={styles.author}>Автор: @{course.author}</div>
          <div className={styles.rating}>{formattedRating}/5</div>
          <svg
            className={styles.ratingStar}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 0L4.69667 4.01794L0.318132 4.49139L3.58216 7.44806L2.6794 11.7586L6.5 9.568L10.3206 11.7586L9.41784 7.44806L12.6819 4.49139L8.30333 4.01794L6.5 0Z"
              fill="#F1D904"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
