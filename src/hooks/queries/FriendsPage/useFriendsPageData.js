import { useQuery } from "@tanstack/react-query";
import { friendsService } from "../../../services/frends.service";

export default function useFriendsPageData(userId) {
  const topUsersData = useQuery({
    queryKey: ["referrals top", userId],
    queryFn: () => friendsService.getTopUsers(userId),
  });

  const referralsData = useQuery({
    queryKey: ["referrals user", userId],
    queryFn: () => friendsService.getReferrals(userId),
  });

  return {
    referralsData: referralsData.data,
    referralsLoading: referralsData.isPending,
    topUsersData: topUsersData.data,
    topUsersLoading: topUsersData.isPending,
    error: referralsData.error || topUsersData.error,
  };
}
