import { memo } from "react";
import styles from "./styles.module.css";
import type { ICourseDetails } from "../../../../../types/CourseTypes/course.types";

interface Props {
  courseData: ICourseDetails;
}

function CourseWelcomeInfoBlock({ courseData }: Props) {
  const { iconUrl, author, name, description } = courseData || {};

  const getAuthor = (author: string) => {
    if (author?.length) {
      return author.length > 15 ? author.slice(0, 15) + "..." : author;
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className={styles.media}>
        <img src={iconUrl} className={styles.logo} />
        <a href={`https://t.me/${author}`} className={styles.author}>
          Автор: @{getAuthor(author)}
        </a>
      </div>
      <div className={styles.description}>
        <div className={styles.name}>{name}</div>
        {description}
      </div>
    </div>
  );
}
export default memo(CourseWelcomeInfoBlock);
