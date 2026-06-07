import { useMutation } from "@tanstack/react-query";
import { favoriteService } from "../../../services/favorite.service";

interface SendUserInfoParams {
  userId: number;
  username: string;
  avatarUrl: string;
  referrerId: number | null;
}

export default function useSendUserInfo() {
  return useMutation({
    mutationFn: ({ userId, username, avatarUrl, referrerId }: SendUserInfoParams) =>
      favoriteService.sendUserInfo(userId, username, avatarUrl, referrerId),
  });
}
