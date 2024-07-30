import { atom, AtomEffect } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Review } from "../types/review";

const { persistAtom } = recoilPersist();

const convertDates: AtomEffect<Review[]> = ({ setSelf }) => {
  setSelf((storedValue) => {
    if (Array.isArray(storedValue)) {
      return storedValue.map(review => ({
        ...review,
        startDate: review.startDate instanceof Date ? review.startDate : new Date(review.startDate),
        endDate: review.endDate instanceof Date ? review.endDate : new Date(review.endDate)
      }));
    }
    return storedValue;
  });
};

// 리뷰
export const bookReviewState = atom<Review[]>({
  key: 'bookReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom, convertDates],
});

// 선택된 리뷰
export const selectedReviewState = atom<Review[]>({
  key: 'selectedReviewState',
  default: [],
  effects_UNSTABLE: [persistAtom, convertDates],
});

// 검색된 리뷰
export const searchedReviewState = atom<Review[]>({
  key: 'searchedReviewState',
  default: [],
});