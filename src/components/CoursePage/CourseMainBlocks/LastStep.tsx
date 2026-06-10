import { Link } from "react-router-dom";
import type { ILastCompletedStep } from "../../../types/CourseTypes/course.types";

interface Props {
  lastCompletedStep: ILastCompletedStep;
}

export default function LastStep({ lastCompletedStep }: Props) {
  const { submoduleId, number, submoduleName } = lastCompletedStep;
  return (
    <div className="block course-block">
      <div className="course-block-header">Последний шаг</div>
      <Link to={`syllabus/${submoduleId}/step/${number}`} replace className="last-step">
        {submoduleName} - {number} шаг
      </Link>
    </div>
  );
}
