import { useRef } from "react";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import SliderButtons from "../components/FriendsPage/Buttons/SliderButtons";
import useFriendsPageData from "../hooks/queries/FriendsPage/useFriendsPageData";
import SliderContent from "../components/FriendsPage/SliderContent";

export default function FriendsPage() {
  const { userId } = useTelegramUser();

  const contentSliderRef = useRef(null);

  const {
    referralsData,
    referralsLoading,
    topUsersData,
    topUsersLoading,
    error,
  } = useFriendsPageData(userId);

  if (error) return console.error(error);

  return (
    <>
      {(referralsLoading || topUsersLoading) && <Loader />}
      {!referralsLoading &&
        !topUsersLoading &&
        referralsData &&
        topUsersData && (
          <>
            <SliderButtons contentSliderRef={contentSliderRef} />
            <SliderContent
              topUsersData={topUsersData}
              referralsData={referralsData}
              contentSliderRef={contentSliderRef}
            />
          </>
        )}
    </>
  );
}
