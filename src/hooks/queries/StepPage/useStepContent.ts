import { useQuery } from "@tanstack/react-query";
import { stepService } from "../../../services/step.service";

export default function useStepContent(contentUrl, stepId) {
  return useQuery({
    queryKey: ["step content", stepId],
    queryFn: () => stepService.getStepContent(contentUrl),
    enabled: !!contentUrl && !!stepId,
    gcTime: 60000,
  });
}
