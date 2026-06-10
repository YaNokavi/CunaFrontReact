import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import ProgressBlock from "../components/ProfilePage/ProgressBlock/ProgressBlock";
import SupportBlock from "../components/ProfilePage/SupportBlock/SupportBlock";
import UserInfoBlock from "../components/ProfilePage/UserInfoBlock/UserInfoBlock";
import useProfileData from "../hooks/queries/ProfilePage/useProfileData";

export default function ProfilePage(): any {
  const { userId } = useTelegramUser();

  const { userData, userLoading, tasksLoading, error } = useProfileData(userId);

  if (error) return console.error(error);
  return (
    <>
      {(userLoading || tasksLoading) && <Loader />}
      {!userLoading && !tasksLoading && userData && (
        <>
          <UserInfoBlock />

          <ProgressBlock coursesProgress={userData.coursesProgress} />

          <SupportBlock />
        </>
      )}
    </>
  );
}
