import { useCallback, useEffect, useRef, useState } from "react";
import useTelegramUser from "../hooks/useTelegramUser";
import { friendsService } from "../services/frends.service";
import Loader from "../UI/Loader/Loader";

import EmptyReferrals from "../components/FriendsPage/EmptyReferrals";
import HaveReferrals from "../components/FriendsPage/HaveReferrals";

import UsersRacesRating from "../UI/UsersRacesRating/UsersRacesRating";
import SliderButtons from "../components/FriendsPage/Buttons/SliderButtons";

export default function FriendsPage() {
  const [referralsData, setReferralsData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [topUsersData, setTopUsersData] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { userId } = useTelegramUser();

  const contentSliderRef = useRef(null);

  const getFriendsPageData = useCallback(async () => {
    setIsLoading(true);
    setActiveIndex(0);
    const referralsData = await friendsService.getReferrals(userId);
    const topUsersData = await friendsService.getTopUsers(userId);

    setReferralsData(referralsData);
    setCurrentUserData(topUsersData.currentUserInfo);
    setTopUsersData(topUsersData.userRatingList);
    setEventEndDate(topUsersData.eventEndDate);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getFriendsPageData();
  }, [getFriendsPageData]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && referralsData && topUsersData && (
        <>
          <SliderButtons
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            contentSliderRef={contentSliderRef}
          />
          <div className="widget-blocks-сontent">
            <div className="content-slider" ref={contentSliderRef}>
              <div className="widget-content">
                {referralsData.length === 0 ? (
                  <EmptyReferrals />
                ) : (
                  <HaveReferrals referralsData={referralsData} />
                )}
              </div>

              <div className="widget-content">
                <UsersRacesRating
                  currentUserData={currentUserData}
                  topUsersData={topUsersData}
                  eventEndDate={eventEndDate}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
