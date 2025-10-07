import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ProgressBlock from "../components/ProfilePage/ProgressBlock/ProgressBlock";
import TasksBlock from "../components/ProfilePage/TasksBlock/TasksBlock";
import SupportBlock from "../components/ProfilePage/SupportBlock/SupportBlock";
import UserInfoBlock from "../components/ProfilePage/UserInfoBlock/UserInfoBlock";
import useProfileData from "../hooks/queries/ProfilePage/useProfileData";
//TODO Notification top side
export default function ProfilePage() {
  const { userId } = useTelegramUser();

  const { userData, userLoading, tasksData, tasksLoading, error } =
    useProfileData(userId);

  if (error) return console.error(error);
  return (
    <>
      {(userLoading || tasksLoading) && <Loader />}
      {!userLoading && !tasksLoading && userData && (
        <>
          <UserInfoBlock cunaTokenBalance={userData.cunaTokenBalance} />

          <ProgressBlock coursesProgress={userData.coursesProgress} />

          <TasksBlock tasksInfo={tasksData} />

          <SupportBlock />
        </>
      )}
    </>
  );
}
