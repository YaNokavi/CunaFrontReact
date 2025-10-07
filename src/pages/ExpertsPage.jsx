import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import UsersRacesRating from "../UI/UsersRacesRating/UsersRacesRating";
import useTopUsers from "../hooks/queries/ExpertsPage/useTopUsers";

export default function ExpertsPage() {
  const { userId } = useTelegramUser();

  const { data, isPending } = useTopUsers(userId);

  const { currentUserInfo, eventEndDate, userRatingList } = data || {};

  return (
    <>
      {isPending && <Loader />}
      {!isPending && currentUserInfo && userRatingList && eventEndDate && (
        <UsersRacesRating
          currentUserData={currentUserInfo}
          topUsersData={userRatingList}
          eventEndDate={eventEndDate}
        />
      )}
    </>
  );
}
