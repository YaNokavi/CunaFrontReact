import { Link } from "react-router-dom";

export default function LastStep({ lastCompletedStep }) {
  const { submoduleId, number, submoduleName } = lastCompletedStep;
  return (
    <div className="block course-block">
      <div className="course-block-header">Последний шаг</div>
      <Link to={`syllabus/${submoduleId}/step/${number}`} className="last-step">
        {submoduleName} - {number} шаг
      </Link>
    </div>
  );
}
