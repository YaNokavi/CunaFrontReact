import { useParams } from "react-router-dom";

export default function useStepButtonLink(stepsDataLength, nextSub, prevSub) {
  const { courseId, submoduleId, stepNumber } = useParams();

  const backLink = () => {
    if (+stepNumber > 1) {
      return `favorite/${courseId}/syllabus/${submoduleId}/step/${
        +stepNumber - 1
      }`;
    }
    if (prevSub) {
      return `favorite/${courseId}/syllabus/${prevSub}/step/1`;
    }
    return null;
  };

  const nextLink = () => {
    if (+stepNumber < stepsDataLength) {
      return `favorite/${courseId}/syllabus/${submoduleId}/step/${
        +stepNumber + 1
      }`;
    }
    if (nextSub) {
      return `favorite/${courseId}/syllabus/${nextSub}/step/1`;
    }
    return `favorite/${courseId}/syllabus`;
  };

  return {
    backLink: backLink(),
    nextLink: nextLink(),
  };
}
