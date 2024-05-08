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

  // list 페이지에서 검색할 경우 list search 페이지로 이동
  const moveToListSearchPage = () => {
    if (location.pathname !== '/list/search') {
      navigate('/list/search');
    }
  };

  // 검색어 상태 업데이트
  const updateSearchedWordState = () => {
    setSearchedWord(searchWord);
  };

  const clearSearchInput = () => {
    setSearchWord("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    moveToListSearchPage();
    updateSearchedWordState();
    clearSearchInput();
  };

  const matchedReviews = bookReviews.filter((review) => {
    // 모든 리뷰의 작가 데이터 중 검색어와 일치하는 작가가 있으면 true 반환
    const authorMatched = review.authors.some((author) =>
      author.toLowerCase().includes(searchedWord.toLowerCase())
    );
  
    // 모든 리뷰의 타이틀 데이터 중 검색어와 일치하는 값이 있다면 true 반환
    const titleMatched = review.title.toLowerCase().includes(searchedWord.toLowerCase());

    return authorMatched || titleMatched;
  });

  // 검색 결과와 일치하는 리뷰 업데이트
  const updateSearchedReviews = () => {
    setSearchedReviews(matchedReviews);
  };

  useEffect(() => {
    updateSearchedReviews();
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