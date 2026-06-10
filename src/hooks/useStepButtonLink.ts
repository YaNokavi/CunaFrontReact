import { useParams } from "react-router-dom";

export default function useStepButtonLink(
  stepsDataLength: number,
  nextSub: number | null | undefined,
  prevSub?: number | null | undefined,
) {
  const { courseId, submoduleId, stepNumber } = useParams();

  // Назад всегда ведёт в содержание (syllabus), а не на предыдущий шаг
  const backLink = (): string | null => {
    if (!courseId) return null;
    return `/favorite/${courseId}/syllabus`;
  };

  const nextLink = (): string => {
    if (Number(stepNumber) < stepsDataLength) {
      return `/favorite/${courseId}/syllabus/${submoduleId}/step/${Number(stepNumber) + 1}`;
    }
    if (nextSub) {
      return `/favorite/${courseId}/syllabus/${nextSub}/step/1`;
    }
    return `/favorite/${courseId}/syllabus`;
  };

  return {
    backLink: backLink(),
    nextLink: nextLink(),
  };
}
