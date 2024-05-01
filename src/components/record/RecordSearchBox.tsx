import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookReviewState, searchedReviewState, searchedReviewWordState } from "../../state/atoms";

import SearchForm from "../common/SearchForm";

function RecordSearchBox() {
  const location = useLocation();
  const bookReviews = useRecoilValue(bookReviewState);
  const setSearchedReviews = useSetRecoilState(searchedReviewState);
  const [searchWord, setSearchWord] = useState('');
  const [searchedWord, setSearchedWord] = useRecoilState(searchedReviewWordState);
  
  const navigate = useNavigate();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location.pathname !== '/list/search') {
      navigate('/list/search');
    }

    setSearchedWord(searchWord);
    setSearchWord("");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    const selectedReviews = bookReviews.filter((review) => {
      const authorMatch = review.authors.some((author) =>
        author.toLowerCase().includes(searchedWord.toLowerCase())
      );
      return (
        review.title.toLowerCase().includes(searchedWord.toLowerCase()) ||
        authorMatch
      );
    });
    setSearchedReviews(selectedReviews);
  }, [searchedWord]);

  return (
    <SearchForm
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
      searchWord={searchWord}
      placeholder="기록한 책의 제목 또는 작가를 입력해 주세요."
    />
  )
}

export default RecordSearchBox;