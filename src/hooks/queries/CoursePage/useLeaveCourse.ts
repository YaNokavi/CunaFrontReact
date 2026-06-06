import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../services/course.service";
import { useCourseStore } from "../../../components/CoursePage/store";

export default function useLeaveCourse(userId, courseId) {
  const queryClient = useQueryClient();
  const favorite = useCourseStore((state) => state.favorite);
  const setFavorite = useCourseStore((state) => state.setFavorite);
  return useMutation({
    mutationKey: ["course leave", userId, courseId],
    mutationFn: () => courseService.leaveCourse(userId, courseId),
    onMutate: async (newFavorite) => {
      await queryClient.cancelQueries(["course", userId, courseId]);
      const previousFavorite = favorite;
      setFavorite(newFavorite);
      return { previousFavorite };
    },
    onError: (error, newFavorite, context) => {
      console.error(error);
      setFavorite(context.previousFavorite);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["course", userId, courseId]);
    },
  });
}
