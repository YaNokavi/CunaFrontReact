import { useQuery } from "@tanstack/react-query";
import { catalogService } from "../../../services/catalog.service";

export default function useCoursesCatalog(userId: number) {
  return useQuery({
    queryKey: ["catalog courses", userId],
    queryFn: () => catalogService.getCourses(userId),
  });
}
