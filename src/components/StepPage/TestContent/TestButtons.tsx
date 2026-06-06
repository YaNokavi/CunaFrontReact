import { Link } from "react-router-dom";
import { useIsChecked, useIsWrongAnswer, useTestData } from "./store";
import useTestLogic from "../../../hooks/queries/StepPage/useTestLogic";
import useProgressTest from "../../../hooks/queries/StepPage/useProgressTest";
import { Skeleton } from "antd";

export default function TestButtons({ currentStep, nextLink }) {
  const { completed, handleSubmit, handleRetry } = useTestLogic(
    currentStep,
    useTestData()
  );

  const isWrongAnswer = useIsWrongAnswer();
  const isChecked = useIsChecked();
//TODO Анимация загрузки
  // const { isPending } = useProgressTest();

  // if (isPending) {
  //   return <Skeleton.Image active={true} />; // или skeleton
  // }

  return (
    <>
      {completed ? (
        <Link to={nextLink} className="step-block-button">
          Следующий шаг
        </Link>
      ) : !isWrongAnswer ? (
        <button
          className="step-block-button"
          disabled={!isChecked}
          onClick={(event) => handleSubmit(event)}
        >
          Проверить
        </button>
      ) : (
        <button
          id="retry-button"
          className="step-block-button"
          onClick={handleRetry}
        >
          Попробовать снова
        </button>
      )}
    </>
  );
}
