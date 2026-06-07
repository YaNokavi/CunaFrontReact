import { Link } from "react-router-dom";

export default function CourseButtons() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Link to="syllabus" className="course-block-button">
        <span>Приступить к изучению</span>
      </Link>
    </div>
  );
}
