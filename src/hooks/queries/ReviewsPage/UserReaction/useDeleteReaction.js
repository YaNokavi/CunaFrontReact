import { useMutation } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useDeleteReaction() {
  return useMutation({
    mutationKey: ["delete reaction"],
    mutationFn: ({ userId, reviewId }) =>
      reviewsService.deleteUserReaction(userId, reviewId),
    onError: (error) => {
      console.error(error);
    },
    //TODO откат ui
    onSettled: () => {
      console.log("Delete");
    },
  });
}
