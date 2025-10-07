import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { reviewsService } from "../../../services/reviews.service";

export default function useReviewsData(
  userId,
  courseId,
  sortType = "NEW_FIRST"
) {
  return useQuery({
    //TODO Подумать как лучше реализовать кэширование (перерисовывается рейтинг бар)
    queryKey: ["reviews", userId, +courseId, sortType],
    queryFn: () => reviewsService.getReviews(userId, courseId, sortType),
    placeholderData: keepPreviousData,
  });
}
