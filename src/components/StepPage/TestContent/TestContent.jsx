import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStepButtonLink from "../../../hooks/useStepButtonLink";
import { stepService } from "../../../services/step.service";
import useTelegramUser from "../../../hooks/useTelegramUser";
//TODO Анимации для ответов
export default function TestContent({
  content,
  currentStep,
  stepsLength,
  nextSub,
}) {
  const { id, completed } = currentStep;
  const { userId } = useTelegramUser();

  const [testData, setTestData] = useState({});
  const [isChecked, setIsChecked] = useState(completed);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isInputsDisabled, setIsInputsDisabled] = useState(completed);
  const [isTestCompleted, SetIsTestCompleted] = useState(completed);
  const [isWrongAnswer, setIsWrongAnswer] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const { nextLink } = useStepButtonLink(stepsLength, nextSub);

  const { question, answer, options, image } = testData;
  const isMultipleChoice = answer && answer.length > 1;

  useEffect(() => {
    if (!content) return;
    try {
      const testData = JSON.parse(content);
      setTestData(testData);

      if (isTestCompleted) {
        setIsWrongAnswer(false);
        setSelectedOptions(
          testData.options.filter((option) => testData.answer.includes(option))
        );
      }
    } catch (e) {
      console.error("Invalid JSON content:", e);
    }
  }, [content, currentStep, isTestCompleted]);

  const sendProgressTest = async () => {
    const sendTestData = {
      incorrectAnswersNumber: incorrectAnswers,
      answersNumber: options.length,
    };

    const response = await stepService.sendProgressTest(
      userId,
      id,
      sendTestData
    );
    //TODO Анимация
    if (response.status !== 200) {
      alert("Нет соединения с сервером. Повторите попытку позже");
    }
  };

  const handleOptionChange = (option) => {
    if (isTestCompleted) return;

    if (isMultipleChoice) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
    setIsChecked(true);
  };

  function checkUserAnswer() {
    if (selectedOptions.length !== answer.length) return false;

    return [...selectedOptions]
      .sort()
      .every((val, idx) => val === [...answer].sort()[idx]);
  }

  const handleCorrectAnswer = () => {
    SetIsTestCompleted(true);
    setIsWrongAnswer(false);
    sendProgressTest();
  };

  const handleIncorrectAnswer = () => {
    SetIsTestCompleted(false);
    setIsWrongAnswer(true);
    setIncorrectAnswers((prev) => prev + 1);
  };

  const handleRetry = () => {
    setSelectedOptions([]);
    setIsInputsDisabled(false);
    setIsWrongAnswer(null);
  };

  const handleSubmit = (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    setIsInputsDisabled(true);
    setIsChecked(false);

    if (checkUserAnswer()) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  };

  return (
    <>
      <div className="step-block-content-media">
        {testData && (
          <>
            <h2 style={{ marginBottom: 10, lineHeight: "32px" }}>{question}</h2>
            {image && (
              <img
                src={testData.image.url}
                height={testData.image.height}
                width={testData.image.width}
                style={{ alignSelf: "center" }}
              />
            )}
            <p style={{ marginBottom: 5 }}>
              Выберите {isMultipleChoice ? "один или несколько" : "один"}{" "}
              вариант{isMultipleChoice ? "ов" : ""} ответа
            </p>
            {options?.map((option) => (
              <label key={option}>
                <input
                  type={isMultipleChoice ? "checkbox" : "radio"}
                  name={question}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  disabled={isInputsDisabled}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </>
        )}
      </div>

      {isTestCompleted ? (
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

      <div className="result">
        {isWrongAnswer === null ? null : isWrongAnswer ? (
          <>
            Неправильно!
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604ZM3.54888 3.54888C4.99461 2.10316 6.95543 1.29096 9 1.29096C11.0446 1.29096 13.0054 2.10316 14.4511 3.54888C15.8968 4.99461 16.709 6.95543 16.709 9C16.709 11.0446 15.8968 13.0054 14.4511 14.4511C13.0054 15.8968 11.0446 16.709 9 16.709C6.95543 16.709 4.99461 15.8968 3.54888 14.4511C2.10316 13.0054 1.29096 11.0446 1.29096 9C1.29096 6.95543 2.10316 4.99461 3.54888 3.54888Z"
                fill="#E53232"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1.29096C6.95543 1.29096 4.99461 2.10316 3.54888 3.54888C2.10316 4.99461 1.29096 6.95543 1.29096 9C1.29096 11.0446 2.10316 13.0054 3.54888 14.4511C4.99461 15.8968 6.95543 16.709 9 16.709C11.0446 16.709 13.0054 15.8968 14.4511 14.4511C15.8968 13.0054 16.709 11.0446 16.709 9C16.709 6.95543 15.8968 4.99461 14.4511 3.54888C13.0054 2.10316 11.0446 1.29096 9 1.29096ZM12.3978 6.28288C12.3978 6.10271 12.3262 5.92992 12.1989 5.80251C12.1357 5.73923 12.0608 5.68767 11.9782 5.65342C11.8957 5.61916 11.8072 5.60153 11.7178 5.60153C11.6284 5.60153 11.5399 5.61916 11.4574 5.65342C11.3748 5.68767 11.2999 5.73787 11.2368 5.80115L9 8.03926L6.76325 5.80115C6.63567 5.67357 6.46263 5.60189 6.2822 5.60189C6.10177 5.60189 5.92873 5.67357 5.80115 5.80115C5.67357 5.92873 5.60189 6.10177 5.60189 6.2822C5.60189 6.46263 5.67357 6.63567 5.80115 6.76325L8.03926 9L5.80115 11.2368C5.73798 11.2999 5.68786 11.3749 5.65367 11.4575C5.61949 11.54 5.60189 11.6285 5.60189 11.7178C5.60189 11.8071 5.61949 11.8956 5.65367 11.9781C5.68786 12.0607 5.73798 12.1357 5.80115 12.1989C5.86432 12.262 5.93932 12.3121 6.02186 12.3463C6.10439 12.3805 6.19286 12.3981 6.2822 12.3981C6.37154 12.3981 6.46 12.3805 6.54254 12.3463C6.62508 12.3121 6.70008 12.262 6.76325 12.1989L9 9.96074L11.2368 12.1989C11.3643 12.3264 11.5374 12.3981 11.7178 12.3981C11.8982 12.3981 12.0713 12.3264 12.1989 12.1989C12.3264 12.0713 12.3981 11.8982 12.3981 11.7178C12.3981 11.5374 12.3264 11.3643 12.1989 11.2368L9.96074 9L12.1989 6.76325C12.3262 6.63583 12.3978 6.46304 12.3978 6.28288Z"
                fill="#E53232"
              />
            </svg>
          </>
        ) : (
          <>
            Правильно!
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0.25C7.26942 0.25 5.57769 0.763179 4.13876 1.72464C2.69983 2.6861 1.57832 4.05267 0.916058 5.65152C0.253791 7.25037 0.0805121 9.00971 0.418133 10.707C0.755753 12.4044 1.58911 13.9635 2.81282 15.1872C4.03653 16.4109 5.59563 17.2443 7.29296 17.5819C8.9903 17.9195 10.7496 17.7462 12.3485 17.0839C13.9473 16.4217 15.3139 15.3002 16.2754 13.8612C17.2368 12.4223 17.75 10.7306 17.75 9C17.75 6.67936 16.8281 4.45376 15.1872 2.81282C13.5462 1.17187 11.3206 0.25 9 0.25ZM7.75 12.4938L4.625 9.36875L5.61875 8.375L7.75 10.5062L12.3813 5.875L13.3788 6.86625L7.75 12.4938Z"
                fill="#43A047"
              />
            </svg>
          </>
        )}
      </div>
    </>
  );
}
