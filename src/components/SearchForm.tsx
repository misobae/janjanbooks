import { useRecoilState, useSetRecoilState } from "recoil";
import { searchWordState, searchedWordState } from "../state/atoms";
import imgSearch from "../assets/images/icon_search.svg";
import { useEffect, useRef } from "react";

function SearchFrom() {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const setSearchedWord = useSetRecoilState(searchedWordState);
  
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedWord(searchWord);
    setSearchWord("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative mt-3"
    >
      <input
        ref={inputRef} 
        type="text"
        placeholder="제목 또는 작가를 입력해 주세요."
        value={searchWord}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2.5 rounded-3xl text-sm"
      />
      <button
        type="submit"
        className="absolute left-3 top-0 bottom-0 my-auto">
        <img className="w-5" src={imgSearch} alt="검색 아이콘" />
      </button>
    </form>
  )
}

export default SearchFrom;