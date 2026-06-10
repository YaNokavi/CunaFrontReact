import { useEffect, useRef } from "react";
import TestContent from "@/components/StepPage/TestContent/TestContent";
import useStepButtonLink from "@/hooks/useStepButtonLink";
import { Link, useParams } from "react-router-dom";
import SanitizedHTML from "../../utils/StepPage/SanitizedHTML";
import useSendProgressText from "../../hooks/queries/StepPage/useSendProgressText";
import useTelegramUser from "../../hooks/useTelegramUser";

export default function StepContent({ stepsData, currentStep, stepContent }) {
  const { nextLink } = useStepButtonLink(
    stepsData.steps.length,
    stepsData.nextSubmoduleId,
  );

  const { submoduleId } = useParams();
  const { userId } = useTelegramUser();

  useSendProgressText(currentStep, userId, +submoduleId);

  // Запоминаем значение completed на момент входа на шаг.
  // Если шаг уже был completed=true до монтирования — показываем надпись.
  // Если completed стал true только что (onMutate) — не показываем.
  const wasCompletedOnMount = useRef(currentStep.completed);

  useEffect(() => {
    // Обновляем после рендера нового шага,
    // чтобы при следующем входе реф уже отражал актуальное состояние
    wasCompletedOnMount.current = currentStep.completed;
  }, [currentStep.number]);

  return (
    <div className="block step-block-content">
      {wasCompletedOnMount.current && currentStep.completed && (
        <div className="step-complete">Шаг пройден!</div>
      )}
      {!currentStep.test ? (
        <SanitizedHTML content={stepContent} />
      ) : (
        <TestContent
          content={stepContent}
          currentStep={currentStep}
          nextLink={nextLink}
        />
      )}

      <Link to={nextLink} className="step-block-button" id="button-next-step">
        Дальше
      </Link>
    </div>
  );
}
