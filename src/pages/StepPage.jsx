import { useCallback, useEffect, useState } from "react";
import { stepService } from "../services/step.service";
import useTelegramUser from "../hooks/useTelegramUser";
import { Link, useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import StepSwitching from "../components/StepPage/StepSwitching/StepSwitching";
import TestContent from "../components/StepPage/TestContent/TestContent";
import useStepButtonLink from "../hooks/useStepButtonLink";

export default function StepPage() {
  const [stepsData, setStepsData] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [nextSub, setNextSub] = useState(null);
  const [prevSub, setPrevSub] = useState(null);

  const [stepContent, setStepContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const { submoduleId, stepNumber } = useParams();

  const { userId } = useTelegramUser();

  const getStepContent = useCallback(async (contentUrl) => {
    const stepContent = await stepService.getCourseContent(contentUrl);

    setStepContent(stepContent);
  }, []);

  const getStepsData = useCallback(async () => {
    setIsLoading(true);
    const stepsData = await stepService.getSteps(submoduleId, userId);

    const currentStep = stepsData.steps.find(
      (step) => step.number == stepNumber
    );

    if (!currentStep.test) {
      stepService.sendProgressText(userId, currentStep.id);
    }

    setCurrentStep(currentStep);
    setStepsData(stepsData.steps);
    setNextSub(stepsData.nextSubmoduleId);
    setPrevSub(stepsData.previousSubmoduleId);
    getStepContent(currentStep?.contentUrl);
    setIsLoading(false);
  }, [userId, submoduleId, stepNumber, getStepContent]);

  const { nextLink } = useStepButtonLink(stepsData.length, nextSub);

  function SafeHTML(html) {
    const cleanHTML = DOMPurify.sanitize(html);
    return <>{parse(cleanHTML)}</>;
  }

  useEffect(() => {
    getStepsData();
  }, [getStepsData]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && stepsData && (
        <>
          <StepSwitching
            stepsData={stepsData}
            nextSub={nextSub}
            prevSub={prevSub}
          />
          {stepContent && (
            <div className="block step-block-content">
              {currentStep?.completed && (
                <div className="step-complete">Шаг пройден!</div>
              )}
              {!currentStep?.test ? (
                <div className="step-block-content-media">
                  {SafeHTML(stepContent)}
                </div>
              ) : (
                <TestContent
                  content={stepContent}
                  currentStep={currentStep}
                  stepsLength={stepsData.length}
                  nextSub={nextSub}
                />
              )}

              <Link
                to={nextLink}
                className="step-block-button"
                id="button-next-step"
              >
                Дальше
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
