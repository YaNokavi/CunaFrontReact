import fetchData from "./CustomFetch";

class ProfileService {
  #URLUserInfo = "user/profile/info";

  async getUserInfo(userId) {
    const userInfo = await fetchData(this.#URLUserInfo, "GET", {
      "X-User-Id": userId,
    });

    return userInfo;
  }
}

export const profileService = new ProfileService();
