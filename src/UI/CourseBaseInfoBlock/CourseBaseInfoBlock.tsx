import { Link, useLocation } from "react-router-dom";
import styles from "./course.module.css";
import IconRatingStar from "./IconRatingStar.tsx";
import IconFavoriteCourse from "./IconFavoriteCourse.tsx";
import type { ICourseBase } from "../../types/CourseTypes/course.types.ts";

interface Props {
  course: ICourseBase;
}

export default function CourseBaseInfoBlock({ course }: Props) {
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
          {course?.favorite && <IconFavoriteCourse />}
        </div>
        <div className={styles.description}>{course.description}</div>
        <div className={styles.authorRating}>
          <div className={styles.author}>Автор: @{course.author}</div>
          <div className={styles.rating}>{formattedRating}/5</div>
          <IconRatingStar />
        </div>
      </div>
    </Link>
  );
}
