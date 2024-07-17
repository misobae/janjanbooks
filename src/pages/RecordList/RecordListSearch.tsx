import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { bookState } from "../../recoil/book";
import { searchedReviewState } from "../../recoil/review";
import { searchedReviewWordState } from "../../recoil/searchedWord";
import { Review } from "../../types/review";

import BookListItem from "../../components/ui/list/BookListItem";

function RecordSearch() {
  const searchedWord = useRecoilValue(searchedReviewWordState);
  const searchedReviews = useRecoilValue(searchedReviewState);
  const setBookData = useSetRecoilState(bookState);
  const navigate = useNavigate();
  
  const moveToViewPage = (review: Review) => {
    navigate(`/record/${review.id}`);
  };
  const updateBookState = (review: Review) => {
    const { img, title, authors, publisher, id } = review;
    setBookData({ thumbnail: img, title, authors, publisher, id });
  };

  const handleBookClick = (review: Review) => {
    updateBookState(review);
    moveToViewPage(review);
  };
  
  return (
    <>
      {searchedReviews && searchedReviews.length > 0 ? (
        <>
          {searchedWord === "" ? null : (
            <p className="text-sm">
              <strong className="font-bold">"{searchedWord}"</strong>의 검색 결과입니다. 
            </p>
          )}
          {searchedReviews.map((item: Review) => (
            <div key={item.id}>
              <BookListItem
                handleBookClick={() => handleBookClick(item)}
                thumbnail={item.img}
                title={item.title}
                authors={item.authors}
                publisher={item.publisher}
              />
            </div>
          ))}
        </>
      ) : <p className="text-sm">검색 결과가 없습니다.</p>}
    </>
  )
}

export default RecordSearch;