import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../../services/ProfileService/profile.service";
import { tasksService } from "../../../services/ProfileService/tasks.service";

export default function useProfileData(userId) {
  const userData = useQuery({
    queryKey: ["profile user", userId],
    queryFn: () => profileService.getUserInfo(userId),
  });

  const tasksData = useQuery({
    queryKey: ["profile tasks", userId],
    queryFn: () => tasksService.getTasks(userId),
  });

  return {
    userData: userData.data,
    userLoading: userData.isPending,
    tasksData: tasksData.data,
    tasksLoading: tasksData.isPending,
    error: userData.error || tasksData.error,
  };
}
