import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookReviewState, searchedReviewState, searchedReviewWordState } from "../../state/atoms";

import imgSearch from "../../assets/images/icon_search.svg";
import useDebounce from "../../hooks/useDebounce";

function SearchRecordForm() {
  const bookReviews = useRecoilValue(bookReviewState);
  const [searchedWord, setSearchedWord] = useRecoilState(searchedReviewWordState);
  const setSearchedReviews = useSetRecoilState(searchedReviewState);
  const navigate = useNavigate();
  const debouncedSearchedWord = useDebounce(searchedWord, 500); 

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/record/search');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    const selectedReviews = bookReviews.filter((review) => {
      const authorMatch = review.authors.some((author) =>
        author.toLowerCase().includes(debouncedSearchedWord.toLowerCase())
      );
      return (
        review.title.toLowerCase().includes(debouncedSearchedWord.toLowerCase()) ||
        authorMatch
      );
    });
    setSearchedReviews(selectedReviews);
  }, [debouncedSearchedWord, bookReviews, setSearchedReviews]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative mt-3"
    >
      <input
        type="text"
        placeholder="기록한 책의 제목 또는 작가를 입력해 주세요."
        value={searchedWord}
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

export default SearchRecordForm;