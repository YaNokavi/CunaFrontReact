import { useState, useCallback } from "react";
import useProgressTest from "./useProgressTest";
import { useParams } from "react-router-dom";
import useTelegramUser from "../../useTelegramUser";
import {
  useActions,
  useSelectedOptions,
} from "@/components/StepPage/TestContent/store";

export default function useTestLogic(currentStep, testData) {
  const { id, completed } = currentStep;
  const { answer, options } = testData;
  const { submoduleId } = useParams();
  const { userId } = useTelegramUser();

  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const selectedOptions = useSelectedOptions();
  const {
    setIsWrongAnswer,
    setIsInputsDisabled,
    setIsChecked,
    setSelectedOptions,
  } = useActions();

  const { mutate } = useProgressTest();

  const checkUserAnswer = useCallback(() => {
    if (!answer || !Array.isArray(answer) || !Array.isArray(selectedOptions))
      return false;
    if (selectedOptions.length !== answer.length) return false;

    // Сравнение ответов без учета порядка
    return [...selectedOptions]
      .sort()
      .every((val, idx) => val === [...answer].sort()[idx]);
  }, [answer, selectedOptions]);

  const handleCorrectAnswer = useCallback(() => {
    setIsWrongAnswer(false);
    mutate({
      userId,
      stepId: id,
      sendTestData: {
        incorrectAnswersNumber: incorrectAnswers,
        answersNumber: options.length,
      },
      submoduleId,
    });
  }, [
    userId,
    id,
    incorrectAnswers,
    options.length,
    submoduleId,
    mutate,
    setIsWrongAnswer,
  ]);

  const handleIncorrectAnswer = useCallback(() => {
    setIsWrongAnswer(true);
    setIncorrectAnswers((prev) => prev + 1);
  }, [setIsWrongAnswer]);

  const handleRetry = useCallback(() => {
    setSelectedOptions([]);
    setIsInputsDisabled(false);
    setIsWrongAnswer(null);
  }, [setSelectedOptions, setIsInputsDisabled, setIsWrongAnswer]);

  const handleSubmit = useCallback(() => {
    setIsInputsDisabled(true);
    setIsChecked(false);

    if (checkUserAnswer()) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  }, [
    checkUserAnswer,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    setIsInputsDisabled,
    setIsChecked,
  ]);

  return {
    completed,
    handleSubmit,
    handleRetry,
  };
}
