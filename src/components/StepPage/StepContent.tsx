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

  // useRef инициализируется безопасно — currentStep гарантированно не undefined,
  // так как StepPage рендерит StepContent только когда currentStep найден
  const wasCompletedOnMount = useRef<boolean>(currentStep?.completed ?? false);

  useEffect(() => {
    if (currentStep == null) return;
    wasCompletedOnMount.current = currentStep.completed;
  }, [currentStep?.number]);

  if (!currentStep) return null;

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
