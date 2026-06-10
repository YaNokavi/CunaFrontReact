import { useParams } from "react-router-dom";
import CatalogIcon from "@/assets/navigationIcons/catalog.svg?react";
import type { RefObject } from "react";

interface Props {
  stepsLength: number;
  toggleRef: RefObject<HTMLButtonElement>;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

export default function StepsNumber({ stepsLength, toggleRef, navOpen, setNavOpen }: Props) {
  const { stepNumber } = useParams();

  return (
    <div className="steps-number">
      <button
        ref={toggleRef}
        className="button-navigation-block activate-menu"
        onClick={() => setNavOpen(!navOpen)}
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
