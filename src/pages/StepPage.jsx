import useTelegramUser from "../hooks/useTelegramUser";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import StepSwitching from "../components/StepPage/StepSwitching/StepSwitching";
import useStepsData from "../hooks/queries/StepPage/useStepsData";
import useStepContent from "../hooks/queries/StepPage/useStepContent";
import StepContent from "../components/StepPage/StepContent";

export default function StepPage() {
  const { submoduleId, stepNumber } = useParams();
  const { userId } = useTelegramUser();

  const { data: stepsData, error: stepsError } = useStepsData(
    submoduleId,
    userId
  );

  const currentStep = stepsData?.steps.find(
    (step) => step.number === +stepNumber
  );

  const {
    data: stepContent,
    isPending,
    error: contentError,
  } = useStepContent(
    currentStep ? currentStep.contentUrl : null,
    currentStep ? currentStep.id : null
  );

  if (isPending) return <Loader />;
  if (stepsError || contentError) return <div>Ошибка загрузки данных</div>;
  if (!currentStep) return <div>Шаг не найден</div>;

  return (
    <>
      <StepSwitching stepsData={stepsData} />
      {stepContent && (
        <StepContent
          stepsData={stepsData}
          currentStep={currentStep}
          stepContent={stepContent}
        />
      )}
    </>
  );
}
