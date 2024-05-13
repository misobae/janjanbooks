import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookDataState, searchedReviewState, searchedReviewWordState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import BookList from "../components/BookList";

function RecordSearch() {
  const searchedWord = useRecoilValue(searchedReviewWordState);
  const searchedReviews = useRecoilValue(searchedReviewState);
  const setBookData = useSetRecoilState(bookDataState);
  const navigate = useNavigate();
  
  const moveToViewPage = (review: IBookReview) => {
    navigate(`/record/${review.id}`);
  };
  const updateBookDataState = (review: IBookReview) => {
    const { img, title, authors, publisher, id } = review;
    setBookData({ thumbnail: img, title, authors, publisher, id });
  };

  const handleClickList = (review: IBookReview) => {
    updateBookDataState(review);
    moveToViewPage(review);
  };
  
  return (
    <div className="layout">
      {searchedReviews && searchedReviews.length > 0 ? (
        <>
          {searchedWord === "" ? null : (
            <p className="text-sm">
              <strong className="font-bold">"{searchedWord}"</strong>의 검색 결과입니다. 
            </p>
          )}
          {searchedReviews.map((item: IBookReview) => (
            <div key={item.id}>
              <BookList
                onBoxClicked={() => handleClickList(item)}
                thumbnail={item.img}
                title={item.title}
                authors={item.authors}
                publisher={item.publisher}
              />
            </div>
          ))}
        </>
      ) : <p className="text-sm">검색 결과가 없습니다.</p>}
    </div>
  )
}

export default RecordSearch;