import RaceUser from "./RaceUser";
import RaceCurrentUser from "./RaceCurrentUser";
import RaceTimer from "./RaceTimer";
import InfoModal from "./InfoModal";

export default function UsersRacesRating({
  currentUserData,
  topUsersData,
  eventEndDate,
}) {
  return (
    <div className="block friends-block-not-null">
      <div className="friends-block-not-null-text">
        <div style={{ minWidth: 175 }}>Таблица лидеров</div>
        <InfoModal />
        <RaceTimer eventEndDate={eventEndDate} />
      </div>

      <div className="friends-block-not-null-list">
        <RaceCurrentUser user={currentUserData} />
        {topUsersData.map((user) => (
          <RaceUser key={user.place} user={user} />
        ))}
      </div>
    </div>
  );
}
