import { Fragment } from "react";
import IconToggle from "./IconToggle";
import { useCourseStore } from "../store";

export default function CourseSyllabus({ courseModulesInfo }) {
  const openModules = useCourseStore((state) => state.openModules);
  const toggleModuleOpen = useCourseStore((state) => state.toggleModuleOpen);

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
                onClick={() => toggleModuleOpen(index)}
              >
                {module.name}
                <IconToggle isOpen={isOpen} />
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
