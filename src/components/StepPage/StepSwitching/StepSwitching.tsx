import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavigationStepBar from "./NavigationStepBar";
import useStepButtonLink from "@/hooks/useStepButtonLink";
import StepsNumber from "./StepsNumber";
import { IconArrow } from "./IconArrow";

export default function StepSwitching({ stepsData }) {
  const [navOpen, setNavOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { backLink, nextLink } = useStepButtonLink(
    stepsData.steps.length,
    stepsData.nextSubmoduleId,
    stepsData.previousSubmoduleId,
  );

  useEffect(() => {
    if (!navOpen) return;

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setNavOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [navOpen]);

  return (
    <>
      <NavigationStepBar
        stepsData={stepsData}
        navOpen={navOpen}
        navRef={navRef}
      />

      <div className="block step-block-switching" id="switc">
        {backLink ? (
          <Link to={backLink} replace className="button-navigation-block">
            <IconArrow />
          </Link>
        ) : (
          <span className="button-navigation-block button-navigation-block--disabled">
            <IconArrow />
          </span>
        )}

        <StepsNumber
          stepsLength={stepsData.steps.length}
          toggleRef={toggleRef}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
        />

        <Link to={nextLink} replace className="button-navigation-block">
          <IconArrow isRotate={true} />
        </Link>
      </div>
    </>
  );
}
