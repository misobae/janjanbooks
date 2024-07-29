export interface Review {
  id?: string;
  cat: string;
  thumbnail: string;
  title: string;
  authors: string[];
  publisher: string;
  startDate: Date;
  endDate: Date;
  review: string;
}