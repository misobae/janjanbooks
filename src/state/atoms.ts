import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IBooksData, IBookReview } from "../utils/types";

const { persistAtom } = recoilPersist();

export const searchedWordState = atom({
  key: 'searchedWordState',
  default: '',
});

export const bookDataState = atom<IBooksData | null>({
  key: 'bookDataState',
  default: null,
});

export const bookReviewState = atom<IBookReview[]>({
  key: 'bookReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedReviewState = atom<IBookReview[]>({
  key: 'selectedReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const searchedReviewWordState = atom({
  key: 'searchedReviewWordState',
  default: '',
});

export const searchedReviewState = atom<IBookReview[]>({
  key: 'searchedReviewState',
  default: [],
});