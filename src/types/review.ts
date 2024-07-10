export interface Review {
  id: string | undefined;
  cat: string;
  img: string;
  title: string;
  authors: string[];
  publisher: string;
  startDate: string;
  endDate: string;
  review: string;
}