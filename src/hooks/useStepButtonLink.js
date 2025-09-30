import { useLocation, useParams } from "react-router-dom";

export default function useStepButtonLink(stepsDataLength, nextSub, prevSub) {
  const { courseId, submoduleId, stepNumber } = useParams();
  const { pathname } = useLocation();
  const paths = ["/favorite", "/catalog"];
  const path = paths.find((p) => pathname.startsWith(p)) || "";

  const backLink = () => {
    if (+stepNumber > 1) {
      return `${path}/${courseId}/syllabus/${submoduleId}/step/${
        +stepNumber - 1
      }`;
    }
    if (prevSub) {
      return `${path}/${courseId}/syllabus/${prevSub}/step/1`;
    }
    return null;
  };

  const nextLink = () => {
    if (+stepNumber < stepsDataLength) {
      return `${path}/${courseId}/syllabus/${submoduleId}/step/${
        +stepNumber + 1
      }`;
    }
    if (nextSub) {
      return `${path}/${courseId}/syllabus/${nextSub}/step/1`;
    }
    return `${path}/${courseId}/syllabus`;
  };

  return {
    backLink: backLink(),
    nextLink: nextLink(),
  };
}
