import { useEffect } from "react";
import TestResult from "./TestResult";
import TestButtons from "./TestButtons";
import TestInfo from "./TestInfo";
import { useActions, useTestData } from "./store";
//TODO Анимации для ответов
export default function TestContent({ content, currentStep, nextLink }) {
  const { completed } = currentStep;

  const testData = useTestData();

  const {
    setIsWrongAnswer,
    setIsInputsDisabled,
    setSelectedOptions,
    setTestData,
    setIsChecked,
  } = useActions();

  useEffect(() => {
    if (!content) return;
    try {
      const testData = JSON.parse(content);
      setTestData(testData);
      setIsChecked(false);

      if (completed) {
        setIsInputsDisabled(true);
        setIsWrongAnswer(false);
        setSelectedOptions(
          testData.options.filter((option) => testData.answer.includes(option))
        );
      } else {
        setIsInputsDisabled(false);
        setIsWrongAnswer(null);
        setSelectedOptions([]);
      }
    } catch (e) {
      console.error("Invalid JSON content:", e);
      return;
    }
  }, [content, currentStep]);

  return (
    <>
      {testData?.options && (
        <>
          <TestInfo completed={completed} />

          <TestButtons currentStep={currentStep} nextLink={nextLink} />

          <TestResult />
        </>
      )}
    </>
  );
}
