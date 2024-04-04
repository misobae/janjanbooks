export interface IBooksData {
  isbn?: string;
  thumbnail: string;
  title: string;
  authors: string[];
  publisher: string;
}

export interface IBookReview {
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