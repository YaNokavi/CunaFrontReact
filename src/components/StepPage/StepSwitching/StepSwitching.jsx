import { useState } from "react";
import NavigationStepBar from "./NavigationStepBar";
import { Link } from "react-router-dom";

import useStepButtonLinks from "@/hooks/useStepButtonLink";
import StepsNumber from "./StepsNumber";

const IconArrow = ({ isRotate = false }) => {
  return (
    <svg
      style={isRotate ? { transform: "rotate(180deg)" } : null}
      width="14"
      height="14"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.03409 12.4467L0.178267 6.59091L6.03409 0.735085L7.2777 1.96662L3.55291 5.69141H12.6023V7.49041H3.55291L7.2777 11.2092L6.03409 12.4467Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function StepSwitching({ stepsData, nextSub, prevSub }) {
  const [navStepBlockView, setNavStepBlockView] = useState("disable");

  const { backLink, nextLink } = useStepButtonLinks(
    stepsData.length,
    nextSub,
    prevSub
  );

  return (
    <>
      <NavigationStepBar
        stepsData={stepsData}
        navStepBlockView={navStepBlockView}
      />

      <div className="block step-block-switching" id="switc">
        <Link to={backLink} className="button-navigation-block">
          <IconArrow />
        </Link>
        <StepsNumber stepsLength={stepsData.length} setNavStepBlockView={setNavStepBlockView} />

        <Link to={nextLink} className="button-navigation-block">
          <IconArrow isRotate={true} />
        </Link>
      </div>
    </>
  );
}
