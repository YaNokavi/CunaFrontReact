import fetchData from "./CustomFetch";
//TODO userId
class FriendsService {
  #URLRef = "user/referrals";
  #URLRefCompetition = "event/referral-competition";

  async getReferrals(userId) {
    try {
      const referralsData = await fetchData(this.#URLRef, "GET", {
        "X-User-Id": userId,
      });

      // referrals.length
      //   ? this.friendsUI.displayFriendsNotNull(referrals)
      //   : this.friendsUI.displayFriendsNull();
      return referralsData;
    } catch (error) {
      console.error("Не удалось получить список друзей", error, error.status);
      alert("Не удалось получить список друзей");
    }
  }

  async getTopUsers(userId) {
    try {
      const topUsersData = await fetchData(this.#URLRefCompetition, "GET", {
        "X-User-Id": userId,
      });

      // this.friendsUI.startCountdown(topUsers.eventEndDate);
      // this.friendsUI.displayTopUsers(topUsers);
      return topUsersData;
    } catch (error) {
      console.error("Не удалось получить топ рефералов", error, error.status);
      alert("Не удалось получить топ рефералов");
    }
  }
}

export const friendsService = new FriendsService();
