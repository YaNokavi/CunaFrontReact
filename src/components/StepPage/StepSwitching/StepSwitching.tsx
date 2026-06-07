import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationStepBar from "./NavigationStepBar";
import useStepButtonLink from "@/hooks/useStepButtonLink";
import StepsNumber from "./StepsNumber";
import { IconArrow } from "./IconArrow";

export default function StepSwitching({ stepsData }) {
  const [navStepBlockView, setNavStepBlockView] = useState("disable");

  const { backLink, nextLink } = useStepButtonLink(
    stepsData.steps.length,
    stepsData.nextSubmoduleId,
    stepsData.previousSubmoduleId,
  );

  return (
    <>
      <NavigationStepBar
        stepsData={stepsData}
        navStepBlockView={navStepBlockView}
      />

      <div className="block step-block-switching" id="switc">
        {backLink ? (
          <Link to={backLink} className="button-navigation-block">
            <IconArrow />
          </Link>
        ) : (
          <span className="button-navigation-block button-navigation-block--disabled">
            <IconArrow />
          </span>
        )}

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
