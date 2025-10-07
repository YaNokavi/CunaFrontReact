import { useQuery } from "@tanstack/react-query";
import { syllabusService } from "../../../services/syllabus.service";

export default function useSyllabusData(userId, courseId) {
  return useQuery({
    queryKey: ["syllabus", userId, courseId],
    queryFn: () => syllabusService.getSyllabus(userId, courseId),
  });
}
