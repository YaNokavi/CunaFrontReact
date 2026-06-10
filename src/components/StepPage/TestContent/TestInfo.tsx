import { useState } from "react";
import {
  useActions,
  useIsInputsDisabled,
  useSelectedOptions,
  useTestData,
} from "./store";
import IViewOverlay from "../../../UI/IViewOverlay";

export default function TestInfo({ completed }) {
  const testData = useTestData();
  const selectedOptions = useSelectedOptions();
  const isInputsDisabled = useIsInputsDisabled();
  const { setSelectedOptions, setIsChecked } = useActions();

  const [iview, setIView] = useState<{ src: string; alt: string } | null>(null);

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

  const handleImageClick = () => {
    if (!image?.url) return;
    setIView({ src: image.url, alt: "Иллюстрация к вопросу" });
  };

  return (
    <>
      <div className="step-block-content-media">
        <h2 style={{ marginBottom: 10, lineHeight: "32px" }}>{question}</h2>
        {image && (
          <img
            src={image.url}
            height={image.height}
            width={image.width}
            alt="Иллюстрация к вопросу"
            onClick={handleImageClick}
            style={{
              display: "block",
              margin: "1em auto",
              maxWidth: "100%",
              cursor: "zoom-in",
              borderRadius: 8,
            }}
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
      {iview && (
        <IViewOverlay
          src={iview.src}
          alt={iview.alt}
          onClose={() => setIView(null)}
        />
      )}
    </>
  );
}
