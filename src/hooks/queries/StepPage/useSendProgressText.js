import { useEffect, useState } from "react";
import useProgressText from "./useProgressText";

export default function useSendProgressText(currentStep, userId, submoduleId) {
  const { mutate } = useProgressText();

  const [hasSentProgress, setHasSentProgress] = useState(false);

  useEffect(() => {
    if (currentStep && !currentStep.test && !hasSentProgress) {
      mutate({ userId, stepId: currentStep.id, submoduleId: +submoduleId });
      setHasSentProgress(true);
    }
  }, [currentStep, mutate, userId, hasSentProgress, submoduleId]);

  useEffect(() => {
    setHasSentProgress(false);
  }, [currentStep?.number]);
}
