export interface Review {
  id: string | undefined;
  cat: string;
  thumbnail: string;
  title: string;
  authors: string[];
  publisher: string;
  startDate: string;
  endDate: string;
  review: string;
}