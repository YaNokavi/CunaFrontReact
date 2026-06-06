export interface ICoursesProgress {
  courseName: string;
  progress: number;
}

export interface IProfileInfo {
  walletAddress: string | null;
  cunaTokenBalance: number;
  coursesProgress: ICoursesProgress[];
}
