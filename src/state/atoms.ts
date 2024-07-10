import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Book } from "../types/book";
import { Review } from "../types/review";

const { persistAtom } = recoilPersist();

export const searchedWordState = atom({
  key: 'searchedWordState',
  default: '',
});

export const bookDataState = atom<Book | null>({
  key: 'bookDataState',
  default: null,
});

export const bookReviewState = atom<Review[]>({
  key: 'bookReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedReviewState = atom<Review[]>({
  key: 'selectedReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const searchedReviewWordState = atom({
  key: 'searchedReviewWordState',
  default: '',
});

export const searchedReviewState = atom<Review[]>({
  key: 'searchedReviewState',
  default: [],
});