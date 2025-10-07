import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../../services/course.service";
import { useCourseStore } from "@/components/CoursePage/store";

export default function useCourse(userId, courseId) {
  const setFavorite = useCourseStore((state) => state.setFavorite);
  return useQuery({
    queryKey: ["course", userId, +courseId],
    queryFn: () => courseService.getCourse(userId, +courseId),
    onSuccess: (data) => {
      setFavorite(data.favorite);
    },
  });
}
