import fetchData from "../CustomFetch";

//TODO сюда ли делать кошелек
class ProfileService {
  #URLUserInfo = "user/profile/info";

  async getUserInfo(userId) {
    try {
      const userInfo = await fetchData(this.#URLUserInfo, "GET", {
        "X-User-Id": userId,
      });

      // const formattedBalance = Number.isInteger(userInfo.cunaTokenBalance)
      //   ? userInfo.cunaTokenBalance.toString()
      //   : userInfo.cunaTokenBalance.toFixed(2);

      // this.balanceText.innerText = formattedBalance;

      // document.getElementById(
      //   "balance-cuna"
      // ).innerHTML = `${formattedBalance} CUNA`;

      // if (userInfo.walletAddress) {
      //   walletAddress = userInfo.walletAddress;
      //   this.walletUI.displayBaseWalletInfo(walletAddress);
      // }

      // if (userInfo.coursesProgress.length != 0) {
      //   this.profileUI.displayProgress(userInfo);
      // } else {
      //   this.profileUI.displayNotProgress();
      // }
      return userInfo;
    } catch (error) {
      console.log(
        "Не удалось получить информацию о пользователе, попробуйте позже",
        error
      );
      alert("Не удалось получить информацию о пользователе, попробуйте позже");
    }
  }
}

export const profileService = new ProfileService();
