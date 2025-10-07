import { useMutation } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useAddReaction() {
  return useMutation({
    mutationKey: ["add reaction"],
    mutationFn: ({ userId, reviewId, reaction }) =>
      reviewsService.sendUserReaction(userId, reviewId, reaction),
    onError: (error) => {
      console.error(error);
    },
    //TODO откат ui
    onSettled: () => {
      // queryClient.invalidateQueries([
      //   "reviews",
      //   variables.userId,
      //   variables.courseId,
      //   "NEW_FIRST",
      // ]);
      console.log("Add");
    },
  });
}
