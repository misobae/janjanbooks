import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { bookDataState, bookReviewState, selectedReviewState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import NoBook from "../components/NoBook";
import RecordSearchBox from "../components/record/RecordSearchBox";
import TabBtn from "../components/record/TabBtn";
import SortBtn from "../components/record/SortBtn";

function RecordList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const bookReviews = useRecoilValue(bookReviewState);
  const [filteredReviews, setFilteredReviews] = useRecoilState(selectedReviewState);

  const navigate = useNavigate();
  const moveToRecordView = useRecoilCallback(({ set }) => async (data: IBookReview) => {
    const { img, title, authors, publisher, id } = data;
    await set(bookDataState, { thumbnail: img, title, authors, publisher, id });

    navigate(`/record/${id}`);
  }, [navigate]);

  useEffect(() => {
    // 페이지 리로드시 전체 리뷰로 세팅
    setFilteredReviews(bookReviews);
  }, [])

  return (
    <>
      {bookReviews.length > 0 ? (
        <Header text="서재" searchForm={<RecordSearchBox />} />
      ) : (
        <Header text={`서재에 기록된 책이 없어요.
        좋아하는 책을 기록해 보세요.
        `} />
      )}

      <div className="layout">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm">
            <TabBtn cat="all" title="전체" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabBtn cat="reading" title="읽고 있는 책" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabBtn cat="wantToRead" title="읽고 싶은 책" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabBtn cat="read" title="읽은 책" activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <SortBtn />
        </div>

        {bookReviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 mb-24">
            {filteredReviews.map(review => (
              <div key={review.id} className="cursor-pointer" onClick={() => moveToRecordView(review)}>
                <div className="relative w-full h-0 pt-[144%] overflow-hidden mb-2">
                  <img
                    className="absolute top-0 right-0 bottom-0 left-0 m-auto w-full"
                    src={review.img}
                    alt={`${review.title} 북 커버`}
                  />
                </div>
                <h4 className="text-sm font-semibold line-clamp-2">{review.title}</h4>
                <span className="text-xs">
                  {review.authors.map((author, index) => (
                    <span key={index}>
                      {author}
                      {index !== review.authors.length - 1 ? ", " : ""}
                    </span>
                  ))} 
                </span>
              </div>
            ))}
          </div>
        ) : (
          <NoBook />
        )}
      </div>

      <Nav />
    </>
  )
};

export default RecordList;