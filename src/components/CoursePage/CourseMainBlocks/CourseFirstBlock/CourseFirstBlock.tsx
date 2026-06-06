import CourseWelcomeInfoBlock from "./CourseWelcomeInfo/CourseWelcomeInfoBlock";
import IsFavoriteButtons from "./Buttons/isFavoriteButtons";
import IsNotFavoriteButton from "./Buttons/isNotFavoriteButton";

export default function CourseFirstBlock({ courseData, isFavorite }) {
  return (
    <div className="block course-block">
      <CourseWelcomeInfoBlock courseData={courseData} />
      {isFavorite ? <IsFavoriteButtons /> : <IsNotFavoriteButton />}
    </div>
  );
}
