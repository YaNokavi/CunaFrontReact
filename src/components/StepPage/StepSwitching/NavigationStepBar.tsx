import { Link, matchPath, useLocation, useParams } from "react-router-dom";
import { IconActive } from "./IconActive";
import type { RefObject } from "react";

interface Props {
  stepsData: any;
  navOpen: boolean;
  navRef: RefObject<HTMLDivElement>;
}

export default function NavigationStepBar({ stepsData, navOpen, navRef }: Props) {
  const paths = ["/favorite", "/catalog"];
  const { pathname } = useLocation();

  const { courseId, submoduleId, stepNumber } = useParams();

  const path = paths.find((path) => {
    return matchPath({ path, end: false }, pathname);
  });

  const getNavigationStepClass = (completed: boolean, number: number) => {
    let stepClass = "";
    if (completed) stepClass = "complete";
    if (number === +stepNumber) {
      stepClass += " active";
    }
    return stepClass.trim();
  };

  const navClass = navOpen ? "move-right" : "disable";

  return (
    <div ref={navRef} className={`navigation-block ${navClass}`}>
      <ul className="navigation-list">
        {stepsData.steps.map((step) => (
          <li key={step.id}>
            <Link
              to={`${path}/${courseId}/syllabus/${submoduleId}/step/${step.number}`}
              className={getNavigationStepClass(step.completed, step.number)}
            >
              {step.number === +stepNumber && <IconActive />}
              {step.test && "?"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
