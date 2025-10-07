import useTelegramUser from "@/hooks/useTelegramUser";
import ExpandButton from "./ExpandButton";
import ReactionButton from "./ReactionButton";
import useReactionHandler from "../../../../hooks/useReactionHandler";
import { useExpand } from "../../../../hooks/useExpand";

export default function CommentFooter({ review }) {
  const { userId } = useTelegramUser();

  const { isNeedExpand } = useExpand();

  const { userReaction, likesCount, dislikesCount, handleReactionClick } =
    useReactionHandler(
      userId,
      review.reviewId,
      review.currentUserReaction,
      review.likesCount,
      review.dislikesCount
    );

  const reactions = [
    { type: "LIKE", count: likesCount },
    { type: "DISLIKE", count: dislikesCount },
  ];

  return (
    <div className="footer-comment-block">
      <div className="user-marks-block">
        {reactions.map((reaction) => (
          <ReactionButton
            key={reaction.type}
            reaction={reaction}
            userReaction={userReaction}
            handleReactionClick={handleReactionClick}
          />
        ))}
      </div>
      {isNeedExpand && <ExpandButton />}
    </div>
  );
}
