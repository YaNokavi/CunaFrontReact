import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsService } from "../../../../services/reviews.service";

export default function useAddReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add review"],
    mutationFn: ({ comment, userRating, courseId, userId }) =>
      reviewsService.sendComment(comment, userRating, +courseId, userId),
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
