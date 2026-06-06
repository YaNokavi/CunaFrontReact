import { useCallback, useState } from "react";
import useAddReaction from "./queries/ReviewsPage/UserReaction/useAddReaction";
import useUpdateReaction from "./queries/ReviewsPage/UserReaction/useUpdateReaction";
import useDeleteReaction from "./queries/ReviewsPage/UserReaction/useDeleteReaction";
import type { TUserReaction } from "../types/CourseTypes/course.types";

export default function useReactionHandler(
  userId: number,
  reviewId: number,
  initialReaction: TUserReaction | null,
  initialLikes: number,
  initialDislikes: number
) {
  const [userReaction, setUserReaction] = useState<TUserReaction | null>(initialReaction);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [dislikesCount, setDislikesCount] = useState(initialDislikes);

  const mutationAdd = useAddReaction();
  const mutationUpdate = useUpdateReaction();
  const mutationDelete = useDeleteReaction();

  const handleReactionClick = useCallback(
    (reactionType: TUserReaction) => {
      if (userReaction === reactionType) {
        mutationDelete.mutate({ userId, reviewId });
        setUserReaction(null);
        if (reactionType === "LIKE") setLikesCount((prev) => prev - 1);
        else setDislikesCount((prev) => prev - 1);
      } else if (userReaction === null) {
        mutationAdd.mutate({ userId, reviewId, reaction: reactionType });
        setUserReaction(reactionType);
        if (reactionType === "LIKE") setLikesCount((prev) => prev + 1);
        else setDislikesCount((prev) => prev + 1);
      } else {
        mutationUpdate.mutate({ userId, reviewId, reaction: reactionType });
        if (reactionType === "LIKE") {
          setLikesCount((prev) => prev + 1);
          setDislikesCount((prev) => prev - 1);
        } else {
          setLikesCount((prev) => prev - 1);
          setDislikesCount((prev) => prev + 1);
        }
        setUserReaction(reactionType);
      }
    },
    [
      userReaction,
      userId,
      reviewId,
      mutationAdd,
      mutationDelete,
      mutationUpdate,
    ]
  );

  return {
    userReaction,
    likesCount,
    dislikesCount,
    handleReactionClick,
  };
}
