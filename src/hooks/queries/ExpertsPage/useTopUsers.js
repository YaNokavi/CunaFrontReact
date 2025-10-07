import { useQuery } from "@tanstack/react-query";
import { expertsService } from "../../../services/experts.service";

export default function useTopUsers(userId) {
  return useQuery({
    queryKey: ["experts", userId],
    queryFn: () => expertsService.getTopUsers(userId),
  });
}
