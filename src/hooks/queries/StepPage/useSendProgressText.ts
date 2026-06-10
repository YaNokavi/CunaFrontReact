import { useEffect, useRef, useState } from "react";
import useProgressText from "./useProgressText";

export default function useSendProgressText(currentStep, userId, submoduleId) {
  const { mutate } = useProgressText();
  const [hasSentProgress, setHasSentProgress] = useState(false);

  // Храним номер шага в ref, чтобы избежать optional chaining в deps
  const stepNumber = currentStep?.number ?? null;

  useEffect(() => {
    setHasSentProgress(false);
  }, [stepNumber]);

  useEffect(() => {
    if (!currentStep || currentStep.test || hasSentProgress) return;
    mutate({ userId, stepId: currentStep.id, submoduleId: +submoduleId });
    setHasSentProgress(true);
  }, [currentStep, mutate, userId, hasSentProgress, submoduleId]);
}
