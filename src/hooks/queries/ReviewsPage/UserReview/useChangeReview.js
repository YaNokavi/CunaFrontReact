import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useChangeReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change review"],
    mutationFn: ({ reviewId, comment, userRating, courseId }) =>
      reviewsService.changeComment(reviewId, comment, userRating, +courseId),
    onError: (error) => {
      console.error(error);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries([
        "reviews",
        variables.userId,
        variables.courseId,
        "NEW_FIRST",
      ]);
    },
  });
}
