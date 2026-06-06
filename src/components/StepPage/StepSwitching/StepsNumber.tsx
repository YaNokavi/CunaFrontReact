import { useParams } from "react-router-dom";
import CatalogIcon from "@/assets/navigationIcons/catalog.svg?react";

export default function StepsNumber({ stepsLength, setNavStepBlockView }) {
  const { stepNumber } = useParams();

  const toggleNavClass = () => {
    setNavStepBlockView((prev) =>
      prev === "disable" ? "move-right" : "disable",
    );
  };

  return (
    <div className="steps-number">
      {/* TODO сделать закрытие по нажатию вне блоков */}
      <button
        className="button-navigation-block activate-menu"
        onClick={() => toggleNavClass()}
      >
        <CatalogIcon
          style={{
            width: 20,
            height: 20,
          }}
        />
      </button>
      <span>
        {stepNumber} из {stepsLength}
      </span>
    </div>
  );
}
