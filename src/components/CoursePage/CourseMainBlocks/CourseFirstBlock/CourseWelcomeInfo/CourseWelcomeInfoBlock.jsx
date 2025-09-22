import styles from "./styles.module.css";

export default function CourseWelcomeInfoBlock({ courseData }) {
  const { iconUrl, author, name, description } = courseData;

  const getAuthor = (author) => {
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
