import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bookDataState, bookReviewState, searchedWordState } from "../state/atoms";
import { IBooksData } from "../utils/types";
import { fetchData } from "../api/fetchBooksData";

import Header from "../components/layout/Header";
import BookList from "../components/BookList";
import BookSearchBox from "../components/BookSearchBox";
import BtnBack from "../components/common/BtnBack";
import ConfirmModal from "../components/common/ConfirmModal";

function Result() {
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const bookReviews = useRecoilValue(bookReviewState);
  const [bookData, setBookData] = useRecoilState(bookDataState);
  const searchedWord = useRecoilValue(searchedWordState);
  const { data, isLoading } = useQuery({
    queryKey: ['searchData', searchedWord],
    queryFn: () => fetchData(searchedWord),
    enabled: !!searchedWord,
  });

  const handleBookItemClick = (clickedItem: IBooksData) => {
    setBookData(clickedItem);

    const sameReview = bookReviews.filter(review => review.id === clickedItem.isbn);
    if (sameReview.length > 0) {
      setConfirmModalOpen(true);
    } else {
      navigate(`/record/write/${clickedItem.isbn}`);
    }
  };

  const handleConfirm = () => {
    navigate(`/record/update/${bookData?.isbn}`);
  };
  
  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  return (
    <>
      <Header text="기록할 책이 있으세요?" btnBack={<BtnBack path={-1} />} searchForm={<BookSearchBox />} />
      <div className="layout">
        {data && data.length > 0 ? (
          <p className="text-sm">
            <strong className="font-bold">"{searchedWord}"</strong>의 검색 결과입니다.
          </p>
        ) : null }
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <>
            {data && data.length > 0 ? (
              data.map((item: IBooksData) => (
                <div key={item.isbn}>
                  <BookList
                    onBoxClicked={() => handleBookItemClick(item)}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    authors={item.authors}
                    publisher={item.publisher}
                  />
                </div>
              ))
            ) : searchedWord && (
              <p className="text-sm">검색 결과가 없습니다.</p>
            )}
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModalOpen}
        text={`이미 작성된 리뷰가 있습니다.
        리뷰를 수정할까요?`}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  )
};

export default Result;