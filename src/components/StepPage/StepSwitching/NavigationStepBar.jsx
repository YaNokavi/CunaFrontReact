import { Link, matchPath, useLocation, useParams } from "react-router-dom";

const IconActive = () => (
  <svg
    className="active-svg"
    width="9"
    height="19"
    viewBox="0 0 9 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.6177 10.063L3.37495 14.5414L2.31445 13.422L6.02695 9.50325L2.31445 5.5845L3.37495 4.46509L7.6177 8.94355C7.75831 9.09201 7.83729 9.29333 7.83729 9.50325C7.83729 9.71318 7.75831 9.9145 7.6177 10.063Z"
      fill="currentColor"
    />
  </svg>
);

export default function NavigationStepBar({ stepsData, navStepBlockView }) {
  const paths = ["/favorite", "/catalog"];
  const { pathname } = useLocation();

  const { courseId, submoduleId, stepNumber } = useParams();

  const path = paths.find((path) => {
    return matchPath({ path, end: false }, pathname);
  });

  const getNavigationStepClass = (completed, number) => {
    let stepClass = "";
    if (completed) stepClass = "complete";
    if (number === +stepNumber) {
      stepClass += " active";
    }

    return stepClass;
  };

  return (
    <div className={`navigation-block ${navStepBlockView}`}>
      <ul className="navigation-list">
        {stepsData.map((step) => (
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
