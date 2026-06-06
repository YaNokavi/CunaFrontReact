export interface IRaceUserBase {
  place: number;
  username: string;
  avatarUrl: string | null;
  userEventScore: number;
  rewardAmount: number | null;
}

export interface IRace {
  currentUserInfo: IRaceUserBase;
  userRatingList: IRaceUserBase[];
  eventEndDate: string;
}
