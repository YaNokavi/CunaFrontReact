import { useMutation } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useUpdateReaction() {
  return useMutation({
    mutationKey: ["delete reaction"],
    mutationFn: ({ userId, reviewId, reaction }) =>
      reviewsService.updateUserReaction(userId, reviewId, reaction),
    onError: (error) => {
      console.error(error);
    },
    //TODO откат ui
    onSettled: () => {
      console.log("Update");
    },
  });
}
