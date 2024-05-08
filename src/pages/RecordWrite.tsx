import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookDataState, bookReviewState } from "../state/atoms";
import { IBookReview } from "../utils/types";
import { DateValidationResult } from "../utils/constants";
import validateDate from "../utils/validateDate";

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

  const updateReviewState = (newReview: IBookReview) => {
    setBookReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleClickSaveBtn = (review: IBookReview) => {
    const validationResult = validateDate(review); // 유효성 검사 결과 반환

    if (validationResult === DateValidationResult.VALID) {
      try {
        updateReviewState(review);
        notify({ type: "default", text: "새로운 기록이 저장되었습니다." });
        moveToViewPage(review);
      } catch (error) {
        console.error(error);
        notify({ type: "error", text: "다시 시도해 주세요." });
      }
    } else if (validationResult === DateValidationResult.NO_START_DATE) {
      notify({ type: "error", text: "시작일을 설정해 주세요." });
    } else if (validationResult === DateValidationResult.INVALID_DATE_RANGE) {
      notify({ type: "error", text: "종료일은 시작일보다 빠를 수 없습니다." });
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
              handleClickSaveBtn({
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