import {
  useActions,
  useIsInputsDisabled,
  useSelectedOptions,
  useTestData,
} from "./store";

export default function TestInfo({ completed }) {
  const testData = useTestData();
  const selectedOptions = useSelectedOptions();
  const isInputsDisabled = useIsInputsDisabled();
  const { setSelectedOptions, setIsChecked } = useActions();

  const { question, answer, options, image } = testData;
  const isMultipleChoice = answer && answer.length > 1;
  const handleOptionChange = (option) => {
    if (completed) return;

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
  return (
    <div className="step-block-content-media">
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
        Выберите {isMultipleChoice ? "один или несколько" : "один"} вариант
        {isMultipleChoice ? "ов" : ""} ответа
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
    </div>
  );
}
