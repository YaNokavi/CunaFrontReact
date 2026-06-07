import CourseWelcomeInfoBlock from "./CourseWelcomeInfo/CourseWelcomeInfoBlock";
import CourseButtons from "./Buttons/CourseButtons";
import type { ICourseDetails } from "../../../../../types/CourseTypes/course.types";

interface Props {
  courseData: ICourseDetails;
}

export default function CourseFirstBlock({ courseData }: Props) {
  return (
    <div className="block course-block">
      <CourseWelcomeInfoBlock courseData={courseData} />
      <CourseButtons />
    </div>
  );
}
