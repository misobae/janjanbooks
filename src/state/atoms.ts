import { atom } from "recoil";
import { IBooksData } from "../utils/types";

export const searchWordState = atom({
  key: 'searchWordState',
  default: '',
});

export const searchedWordState = atom({
  key: 'searchedWordState',
  default: '',
});

export const bookDataState = atom<IBooksData | null>({
  key: 'bookDataState',
  default: null,
});