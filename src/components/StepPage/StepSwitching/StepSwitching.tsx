import { useState } from "react";
import NavigationStepBar from "./NavigationStepBar";
import { Link } from "react-router-dom";

import useStepButtonLinks from "@/hooks/useStepButtonLink";
import StepsNumber from "./StepsNumber";
import { IconArrow } from "./IconArrow";

export default function StepSwitching({ stepsData }) {
  const [navStepBlockView, setNavStepBlockView] = useState("disable");

  const { backLink, nextLink } = useStepButtonLinks(
    stepsData.steps.length,
    stepsData.nextSubmoduleId,
    stepsData.previousSubmoduleId
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
        <StepsNumber
          stepsLength={stepsData.steps.length}
          setNavStepBlockView={setNavStepBlockView}
        />

        <Link to={nextLink} className="button-navigation-block">
          <IconArrow isRotate={true} />
        </Link>
      </div>
    </>
  );
}
