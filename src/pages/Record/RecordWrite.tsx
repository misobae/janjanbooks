import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookState } from "../../recoil/book";
import { bookReviewState } from "../../recoil/review";
import { Review } from "../../types/review";
import validateDate from "../../utils/validateDate";
import handleValidationResult from "../../utils/reviewValidationHandler";

import { notify } from "../../components/ui/Toast";
import BtnBack from "../../components/ui/button/BtnBack";
import ProgressTracker from "./components/ProgressTracker";

function RecordWrite() {
  const bookData = useRecoilValue(bookState);
  const setBookReviews = useSetRecoilState(bookReviewState);
  const [cat, setCat] = useState<string>("read");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [review, setReview] = useState<string>("");

  const navigate = useNavigate();
  const moveToViewPage = (review: Review) => {
    navigate(`/record/${review.id}`);
  };

  const updateReviewState = (newReview: Review) => {
    setBookReviews((prevReviews) => [...prevReviews, newReview]);
  };
  
  const saveReview = (newReview: Review) => {
    try {
      updateReviewState(newReview);
      notify({ type: "default", text: "기록이 저장되었습니다." });
      moveToViewPage(newReview);
    } catch (error) {
      console.error(error);
      notify({ type: "error", text: "다시 시도해 주세요." });
    }
  };

  const handleClickSaveBtn = (newReview: Review) => {
    const validationResult = validateDate(newReview);
    handleValidationResult({ saveReview, validationResult, newReview });
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
              handleClickSaveBtn({
                id: bookData.isbn,
                cat: cat,
                thumbnail: bookData.thumbnail,
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