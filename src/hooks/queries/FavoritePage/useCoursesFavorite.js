import { useQuery } from "@tanstack/react-query";
import { favoriteService } from "../../../services/favorite.service";

export default function useCoursesFavorite(userId) {
  return useQuery({
    queryKey: ["favorite courses", userId],
    queryFn: () => favoriteService.getFavoriteCourses(userId),
  });
}
