import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookDataState, bookReviewState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import { notify } from "../components/common/Toast";
import BtnBack from "../components/common/BtnBack";
import ProgressTracker from "../components/record/ProgressTracker";

function RecordWrite() {
  const bookData = useRecoilValue(bookDataState);
  const setBookReviews = useSetRecoilState(bookReviewState);
  const [cat, setCat] = useState<string>("read");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [review, setReview] = useState<string>("");

  const navigate = useNavigate();
  const moveToViewPage = (review: IBookReview) => {
    navigate(`/record/${review.id}`);
  };

  const updateBookReviewState = (newReview: IBookReview) => {
    setBookReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleSaveBtnClick = (newReview: IBookReview) => {
    try {
      updateBookReviewState(newReview);
      notify({ type: "default", text: "새로운 기록이 저장되었습니다." });
      moveToViewPage(newReview);
    } catch (error) {
      console.error(error);
      notify({ type: "error", text: "다시 시도해 주세요." });
    }
  };

  return (
    <>
      <div className="
        flex justify-between items-center
        fixed top-0 left-0 z-10
        w-full
        p-3 px-5
        bg-black
      ">
        <BtnBack path="/search" />
        {bookData && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => {
              handleSaveBtnClick({
                id: bookData.isbn,
                cat: cat,
                img: bookData.thumbnail,
                title: bookData.title,
                authors: bookData.authors,
                publisher: bookData.publisher,
                startDate: startDate,
                endDate: endDate,
                review: review,
              });
          }}>
            저장
          </button>
        )}
      </div>

      {bookData && (
        <ProgressTracker
          thumbnail={bookData.thumbnail}
          title={bookData.title}
          authors={bookData.authors}
          publisher={bookData.publisher}
          cat={cat} 
          startDate={startDate} 
          endDate={endDate} 
          review={review} 
          setCat={setCat} 
          setStartDate={setStartDate} 
          setEndDate={setEndDate} 
          setReview={setReview}
        />
      )}
    </>
  )
};

export default RecordWrite;