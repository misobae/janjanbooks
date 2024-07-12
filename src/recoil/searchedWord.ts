import { atom } from "recoil";

// 검색어
export const searchedWordState = atom({
  key: 'searchedWordState',
  default: '',
});

// 리뷰 내 검색어
export const searchedReviewWordState = atom({
  key: 'searchedReviewWordState',
  default: '',
});