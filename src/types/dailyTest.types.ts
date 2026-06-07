export interface DailyTestImage {
  url: string;
  width: number;
  height: number;
}

export interface DailyTestData {
  question: string;
  options: string[];
  answer: string[];
  image?: DailyTestImage;
}
