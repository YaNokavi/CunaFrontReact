import { useCallback, useEffect, useState } from "react";
import { expertsService } from "../services/experts.service";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import UsersRacesRating from "../UI/UsersRacesRating/UsersRacesRating";

export default function ExpertsPage() {
  const [topUsersData, setTopUsersData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useTelegramUser();

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const users = await expertsService.getTopUsers(userId);
    setTopUsersData(users.userRatingList);
    setCurrentUserData(users.currentUserInfo);
    setEventEndDate(users.eventEndDate);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && topUsersData && currentUserData && eventEndDate && (
        <UsersRacesRating
          currentUserData={currentUserData}
          topUsersData={topUsersData}
          eventEndDate={eventEndDate}
        />
      )}
    </>
  );
}
