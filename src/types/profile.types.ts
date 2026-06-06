export interface ICoursesProgress {
  courseName: string;
  progress: number;
}

export interface IProfileInfo {
  coursesProgress: ICoursesProgress[];
}
