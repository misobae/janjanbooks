import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Review } from "../types/review";

const { persistAtom } = recoilPersist();

// 리뷰
export const bookReviewState = atom<Review[]>({
  key: 'bookReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 선택된 리뷰
export const selectedReviewState = atom<Review[]>({
  key: 'selectedReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 검색된 리뷰
export const searchedReviewState = atom<Review[]>({
  key: 'searchedReviewState',
  default: [],
});