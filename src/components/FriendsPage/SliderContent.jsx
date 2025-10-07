import UsersRacesRating from "../../UI/UsersRacesRating/UsersRacesRating";
import EmptyReferrals from "./EmptyReferrals";
import HaveReferrals from "./HaveReferrals";

export default function SliderContent({
  topUsersData,
  referralsData,
  contentSliderRef,
}) {
  const { currentUserInfo, userRatingList, eventEndDate } = topUsersData || {};
  return (
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
            currentUserData={currentUserInfo}
            topUsersData={userRatingList}
            eventEndDate={eventEndDate}
          />
        </div>
      </div>
    </div>
  );
}
