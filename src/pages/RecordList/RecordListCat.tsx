import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookState } from "../../recoil/book";
import { bookReviewState, selectedReviewState } from "../../recoil/review";
import { Review } from "../../types/review";

import NoBook from "../../components/common/NoBook";
import NoBookCover from "../../components/common/NoBookCover";
import TabBtn from "./components/TabBtn";
import SortBtn from "./components/SortBtn";

function RecordListCat() {
  const navigate = useNavigate();
  const { category } = useParams();
  const bookReviews = useRecoilValue(bookReviewState);
  const [filteredReviews, setFilteredReviews] = useRecoilState(selectedReviewState);
  const selectedReviews = bookReviews.filter(review => review.cat === category);
  const setBookState = useSetRecoilState(bookState);
  
  // view 페이지로 이동
  const moveToViewPage = (review: Review) => {
    const { id } = review;
    navigate(`/record/${id}`);
  };

  // 책 정보 상태 업데이트
  const updateBookState = (review: Review) => {
    setBookState(review);
  };

  // 썸네일 클릭 함수
  const handleClickThumb = (review: Review) => {
    updateBookState(review);
    moveToViewPage(review);
  };

  useEffect(() => {
    if (category === 'all') {
      setFilteredReviews(bookReviews);
    } else {
      setFilteredReviews(selectedReviews);
    }
  }, [category])

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center text-sm">
          <TabBtn cat="all" title="전체" />
          <TabBtn cat="reading" title="읽고 있는 책" />
          <TabBtn cat="wantToRead" title="읽고 싶은 책" />
          <TabBtn cat="read" title="읽은 책" />
        </div>
        <SortBtn />
      </div>

      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 mb-24">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="cursor-pointer"
              onClick={() => handleClickThumb(review)}
            >
              <div className="mb-2 border">
                { review.thumbnail === "" ? (
                  <NoBookCover />
                  ) : (
                  <img
                    className="block w-full"
                    src={review.thumbnail} alt={review.title+'북 커버'}
                  />
                )}
              </div>
              <h4 className="text-sm font-semibold line-clamp-2">{review.title}</h4>
              <span className="text-xs">
                {review.authors.map((author: string, index: number) => (
                  <span key={index}>
                    {author}
                    {index !== review.authors.length - 1 ? ", " : ""}
                  </span>
                ))} 
              </span>
            </div>
          ))}
        </div>
      ) : <NoBook text={`기록된 책이 없어요.
      좋아하는 책을 기록해 보세요. `} />}
    </>
  )
}

export default RecordListCat;