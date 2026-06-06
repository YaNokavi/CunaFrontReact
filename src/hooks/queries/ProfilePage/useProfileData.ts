import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../../services/profile.service";

export default function useProfileData(userId) {
  const userData = useQuery({
    queryKey: ["profile user", userId],
    queryFn: () => profileService.getUserInfo(userId),
  });

  return {
    userData: userData.data,
    userLoading: userData.isPending,

    error: userData.error,
  };
}
