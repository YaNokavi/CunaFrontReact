export interface ITask {
  taskId: number;
  reward: number;
  header: string;
  taskUrl: string | null;
  iconUrl: string;
  needToCheck: boolean;
}
