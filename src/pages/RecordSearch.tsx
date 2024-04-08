import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookDataState, searchedReviewState, searchedReviewWordState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import Header from "../components/layout/Header";
import BtnBack from "../components/common/BtnBack";
import SearchRecordForm from "../components/record/SearchRecordForm";
import BookList from "../components/BookList";

function RecordSearch() {
  const searchedWord = useRecoilValue(searchedReviewWordState);
  const searchedReviews = useRecoilValue(searchedReviewState);
  const setBookData = useSetRecoilState(bookDataState);
  const navigate = useNavigate();
  
  const onBoxClicked = ({ img, title, authors, publisher, id }: IBookReview) => {
    setBookData({ thumbnail: img, title, authors, publisher, id });
    navigate(`/record/${id}`);
  };
  
  return (
    <>
      <Header text="서재 검색" btnBack={<BtnBack path="/record" />} searchForm={<SearchRecordForm />} />
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
                  onBoxClicked={() => onBoxClicked(item)}
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
    </>
  )
}

export default RecordSearch;