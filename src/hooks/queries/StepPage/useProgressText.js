import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stepService } from "../../../services/step.service";

export default function useProgressText() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["progress text"],
    mutationFn: ({ userId, stepId }) =>
      stepService.sendProgressText(userId, stepId),
    onMutate: async ({ userId, stepId, submoduleId }) => {
      const previousSteps = queryClient.getQueryData([
        "steps",
        submoduleId,
        userId,
      ]);

      const step = previousSteps?.steps.find((s) => s.id === stepId);

      if (step?.completed) {
        return { skipUpdate: true };
      }

      await queryClient.cancelQueries(["steps", submoduleId, userId]);

      queryClient.setQueryData(["steps", submoduleId, userId], (old) => {
        if (!old) return old;
        return {
          ...old,
          steps: old.steps.map((s) =>
            s.id === stepId ? { ...s, completed: true } : s
          ),
        };
      });

      return { previousSteps };
    },

    onError: (err, variables, context) => {
      if (!context?.skipUpdate) {
        queryClient.setQueryData(
          ["steps", variables.submoduleId, variables.userId],
          context.previousSteps
        );
      }
    },

    onSettled: (_data, _error, variables, context) => {
      if (!context?.skipUpdate) {
        queryClient.invalidateQueries([
          "steps",
          variables.submoduleId,
          variables.userId,
        ]);
      }
    },
  });
}
