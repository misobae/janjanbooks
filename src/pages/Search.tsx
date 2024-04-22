import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { bookDataState, bookReviewState, searchedWordState } from "../state/atoms";
import { IBooksData } from "../utils/types";
import { fetchData } from "../api/fetchBooksData";

import Header from "../components/layout/Header";
import BookList from "../components/BookList";
import BookSearchBox from "../components/BookSearchBox";
import BtnBack from "../components/common/BtnBack";
import ConfirmModal from "../components/common/ConfirmModal";
import Spinner from "../components/common/Spinner";

function Result() {
  const navigate = useNavigate();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const bookReviews = useRecoilValue(bookReviewState);
  const [bookData, setBookData] = useRecoilState(bookDataState);
  const searchedWord = useRecoilValue(searchedWordState);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading,} = useInfiniteQuery({
    queryKey: ['searchData', searchedWord],
    queryFn: ({ pageParam }) => fetchData(searchedWord, pageParam),
    enabled: !!searchedWord,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.meta.is_end ? undefined : nextPage;
    },
    initialPageParam: 1, 
  });
  
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) { 
      // inview(스크롤이 바닥에 있고) hasNextPage(fetch할 다음 페이지가 있다면)
      
      fetchNextPage();
      // Next 페이지 요청
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
        {data && data.pages[0].documents.length > 0 ? (
          <p className="text-sm">
            <strong className="font-bold">"{searchedWord}"</strong>의 검색 결과입니다.
          </p>
        ) : null }

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data && data.pages[0].documents.length > 0 ? (
              data.pages.map((page, index) => (
                <div key={'page'+index}>
                  {page.documents.map((book: IBooksData) => (
                    <div key={book.isbn} ref={ref}>
                      <BookList
                        onBoxClicked={() => handleBookItemClick(book)}
                        thumbnail={book.thumbnail}
                        title={book.title}
                        authors={book.authors}
                        publisher={book.publisher}
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : searchedWord &&  <p className="text-sm">검색 결과가 없습니다.</p> }

            {isFetchingNextPage && <Spinner />}
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