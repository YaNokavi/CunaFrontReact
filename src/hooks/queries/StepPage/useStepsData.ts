import { useQuery } from "@tanstack/react-query";
import { stepService } from "../../../services/step.service";

export default function useStepsData(submoduleId, userId) {
  return useQuery({
    queryKey: ["steps", +submoduleId, userId],
    queryFn: () => stepService.getSteps(submoduleId, userId),
  });
}
