import CourseWelcomeInfoBlock from "./CourseWelcomeInfo/CourseWelcomeInfoBlock";
import IsFavoriteButtons from "./Buttons/isFavoriteButtons";
import IsNotFavoriteButton from "./Buttons/isNotFavoriteButton";

export default function CourseFirstBlock({
  courseData,
  setIsFavorite,
  isFavorive,
}) {
  return (
    <div className="block course-block">
      <CourseWelcomeInfoBlock courseData={courseData} />
      {isFavorive ? (
        <IsFavoriteButtons setIsFavorite={setIsFavorite} />
      ) : (
        <IsNotFavoriteButton setIsFavorite={setIsFavorite}/>
      )}
    </div>
  );
}
