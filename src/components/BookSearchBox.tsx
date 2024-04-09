import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchedWordState } from "../state/atoms";

import imgSearch from "../assets/images/icon_search.svg";

function BookSearchBox() {
  const location = useLocation();
  const [searchWord, setSearchWord] = useState('');
  const setSearchedWord = useSetRecoilState(searchedWordState);
  
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const navigate = useNavigate();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.pathname !== '/search') {
      navigate(`/search`);
    }
    
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

export default BookSearchBox;