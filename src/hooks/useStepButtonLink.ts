import { useParams } from "react-router-dom";

export default function useStepButtonLink(
  stepsDataLength: number,
  nextSub: number | null | undefined,
  prevSub?: number | null | undefined,
) {
  const { courseId, submoduleId, stepNumber } = useParams();

  // Назад: предыдущий шаг, предыдущий сабмодуль (последний шаг), или null (кнопка задизейблена)
  const backLink = (): string | null => {
    if (!courseId) return null;
    const step = Number(stepNumber);
    if (step > 1) {
      return `/favorite/${courseId}/syllabus/${submoduleId}/step/${step - 1}`;
    }
    if (prevSub) {
      return `/favorite/${courseId}/syllabus/${prevSub}/step/1`;
    }
    return null;
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
