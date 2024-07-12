import { atom } from "recoil";
import { Book } from "../types/book";

export const bookState = atom<Book | null>({
  key: 'bookState',
  default: null,
});