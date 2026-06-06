import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCourseStore } from "../../../components/CoursePage/store";
import { courseService } from "../../../services/course.service";

export default function useAddCourse(userId, courseId) {
  const queryClient = useQueryClient();
  const favorite = useCourseStore((state) => state.favorite);
  const setFavorite = useCourseStore((state) => state.setFavorite);
  return useMutation({
    mutationKey: ["course add", userId, courseId],
    mutationFn: () => courseService.addCourse(userId, courseId),
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
