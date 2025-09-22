import fetchData from "./CustomFetch";

class FavoriteService {
  #URLFavoriteCourses = "user/favorite-courses";
  #URLUserInfo = "user/login-and-reward";
//TODO подумать над отправкой данных юзера
  async sendUserInfo(body) {
    // let referallId = JSON.parse(localStorage.getItem("referallId"));

    // if (referallId && referallId === userId) {
    //   referallId = null;
    // }

    // let body = {};

    // body = {
    //   username: username,
    //   avatarUrl: avatarUrl,
    //   referrerId: referallId,
    // };
    try {
      const rewards = await fetchData(
        this.#URLUserInfo,
        "POST",
        { "X-User-Id": this.userId },
        body
      );

      // if (rewards.history !== null) {
      //   localStorage.setItem("storiesType", rewards.history);
      //   document.getElementById("page").style.display = "flex";

      //   const event = new Event("storiesReady");
      //   window.dispatchEvent(event);
      // }

      // if (rewards.firstEntryToday === true) {
      //   this.modalManager.createListRewards(rewards);
      // }

      // localStorage.setItem("flagFirstJoin", false);
      // this.tabManager.enableTabs();
      this.getFavoriteCourses();
    } catch (error) {
      console.error(
        "Не удалось получить информацию о пользователе",
        error,
        error.status
      );
      alert("Не удалось получить информацию о пользователе, попробуйте позже");
    }
  }

  async getFavoriteCourses(userId) {
    try {
      const coursesData = await fetchData(this.#URLFavoriteCourses, "GET", {
        "X-User-Id": userId,
      });

      return coursesData;
    } catch (error) {
      console.error(
        "Не удалось получить информацию о курсах",
        error,
        error.status
      );
      alert("Не удалось получить информацию о курсах, попробуйте позже");
    }
  }
}

export const favoriteService = new FavoriteService();
