import { useCallback, useEffect, useState } from "react";
import { profileService } from "../services/profile.service";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ProgressBlock from "../components/ProfilePage/ProgressBlock/ProgressBlock";
import TasksBlock from "../components/ProfilePage/TasksBlock/TasksBlock";
import SupportBlock from "../components/ProfilePage/SupportBlock/SupportBlock";
import UserInfoBlock from "../components/ProfilePage/UserInfoBlock/UserInfoBlock";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [tasksInfo, setTasksInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useTelegramUser();

  const getProfileInfo = useCallback(async () => {
    setIsLoading(true);
    const userInfo = await profileService.getUserInfo(userId);
    const tasksInfo = await profileService.getTasks(userId);
    setUserInfo(userInfo);
    setTasksInfo(tasksInfo);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && userInfo && (
        <>
          <UserInfoBlock cunaTokenBalance={userInfo.cunaTokenBalance} />

          <ProgressBlock coursesProgress={userInfo.coursesProgress} />

          <TasksBlock tasksInfo={tasksInfo} />

          <SupportBlock />
        </>
      )}
    </>
  );
}
