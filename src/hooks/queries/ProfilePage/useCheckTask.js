import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../../../services/ProfileService/tasks.service";

export default function useCheckTask(userId, taskId) {
  return useMutation({
    mutationKey: ["task", userId, taskId],
    mutationFn: () => tasksService.checkTask(userId, taskId),
    onSuccess: (data) => {
      // обработка успешного ответа
      console.log(data);
    },
    onError: (error) => {
      console.error("Error checking task", error);
    },
  });
}
