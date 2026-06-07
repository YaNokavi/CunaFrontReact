import { useQuery } from "@tanstack/react-query";
import { favoriteService } from "../../../services/favorite.service";

export default function useCoursesFavorite(userId: number) {
  return useQuery({
    queryKey: ["all-courses", userId],
    queryFn: () => favoriteService.getAllCourses(userId),
    enabled: !!userId,
  });
}
