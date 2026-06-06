export interface ICourseBase {
  id: number;
  name: string;
  author: string;
  description: string;
  iconUrl: string;
  rating: number;
  favorite: boolean;
}

export interface ISubmodule {
  id: number;
  number: number;
  name: string;
  totalStepsCount: number;
  completedStepsCount: number;
}

export interface IModule {
  number: number;
  name: string;
  submodules: ISubmodule[];
}

export interface ICourseRatingInfo {
  rating: number;
  reviewsTotalNumber: number;
  detailedRatingTotalNumber: {
    [ratingKey: string]: number;
  };
}

export interface ILastCompletedStep {
  number: number;
  submoduleId: number;
  submoduleName: string;
}

export interface ICourseModulesInfo {
  name: string;
  submoduleNames: string[];
}

export interface ICourseDetails extends ICourseBase {
  learningOutcomes: string[];
  lastCompletedStep?: ILastCompletedStep;
  courseModulesInfo: ICourseModulesInfo[];
  ratingInfo: ICourseRatingInfo;
}

export type TUserReaction = "LIKE" | "DISLIKE";

export interface IReviewItem {
  reviewId: number;
  rating: number;
  username: string;
  message: string;
  createTime: string;
  likesCount: number;
  dislikesCount: number;
  currentUserReaction: TUserReaction | null;
}

export interface ICourseReview {
  courseReviews: IReviewItem[];
  courseRatingInfo: ICourseRatingInfo;
  currentUserReview: {
    reviewId: number;
    rating: number;
    message: string;
  };
}
