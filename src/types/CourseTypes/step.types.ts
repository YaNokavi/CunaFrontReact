export interface IStepBase {
  id: number;
  number: number;
  contentUrl: string;
  completed: boolean;
  test: boolean;
}

export interface IStepInfo {
  steps: IStepBase[];
  nextSubmoduleId: number;
  previousSubmoduleId: number;
}
