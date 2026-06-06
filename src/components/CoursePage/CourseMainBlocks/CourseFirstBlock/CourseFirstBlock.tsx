import CourseWelcomeInfoBlock from "./CourseWelcomeInfo/CourseWelcomeInfoBlock";
import IsFavoriteButtons from "./Buttons/IsFavoriteButtons";
import IsNotFavoriteButton from "./Buttons/IsNotFavoriteButton";
import type { ICourseDetails } from "../../../../../types/CourseTypes/course.types";

interface Props {
  courseData: ICourseDetails;
  isFavorite: boolean;
}

export default function CourseFirstBlock({ courseData, isFavorite }: Props) {
  return (
    <div className="block course-block">
      <CourseWelcomeInfoBlock courseData={courseData} />
      {isFavorite ? <IsFavoriteButtons /> : <IsNotFavoriteButton />}
    </div>
  );
}
