import { Fragment } from "react";

export default function CourseSyllabus({ openModules, setOpenModules, courseModulesInfo }) {
  const ToggleIcon = ({ isOpen }) => (
    <svg
      width="17"
      height="11"
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`"toggle-icon ${isOpen ? "rotated" : ""}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.35907 1.30377L16.1946 8.37502L14.486 10.1425L8.50477 3.95502L2.52352 10.1425L0.814941 8.37502L7.65048 1.30377C7.87708 1.06943 8.18437 0.937784 8.50477 0.937784C8.82518 0.937784 9.13247 1.06943 9.35907 1.30377Z"
        fill="#A6A6A6"
      />
    </svg>
  );

  return (
    <div className="block course-block">
      <div className="course-block-header">Содержание</div>
      <div className="syllabus-text-course">
        {courseModulesInfo.map((module, index) => {
          const isOpen = !!openModules[index];
          return (
            <Fragment key={index}>
              <div
                className="syllabus-text-course-main toggle"
                onClick={() => {
                  setOpenModules((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }));
                }}
              >
                {module.name}
                <ToggleIcon isOpen={isOpen} />
              </div>
              {isOpen && (
                <ol style={{ margin: 0 }}>
                  {module.submoduleNames.map((sub, index) => {
                    return (
                      <li
                        key={index}
                        className="syllabus-text-course-additional"
                      >
                        {sub}
                      </li>
                    );
                  })}
                </ol>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
