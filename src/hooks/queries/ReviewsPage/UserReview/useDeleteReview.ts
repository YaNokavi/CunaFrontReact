import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete review"],
    mutationFn: ({ reviewId, courseId }) =>
      reviewsService.deleteComment(reviewId, +courseId),
    onError: (error) => {
      console.error(error);
    },
    //TODO Че за хуйня у вас здесь происходит
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
