import CourseWelcomeInfoBlock from "./CourseWelcomeInfo/CourseWelcomeInfoBlock";
import type { ICourseDetails } from "../../../../types/CourseTypes/course.types";
import { Link } from "react-router-dom";

interface Props {
  courseData: ICourseDetails;
}

export default function CourseFirstBlock({ courseData }: Props) {
  return (
    <div className="block course-block">
      <CourseWelcomeInfoBlock courseData={courseData} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link to="syllabus" replace className="course-block-button">
          <span>Приступить к изучению</span>
        </Link>
      </div>
    </div>
  );
}
