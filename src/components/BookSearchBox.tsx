import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { searchedWordState } from "../state/atoms";

import SearchForm from "./common/SearchForm";

function BookSearchBox() {
  const location = useLocation();
  const [searchWord, setSearchWord] = useState('');
  const setSearchedWord = useSetRecoilState(searchedWordState);
  
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
    <SearchForm
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      searchWord={searchWord}
      placeholder="제목 또는 작가를 입력해 주세요."
    />
  )
}

export default BookSearchBox;