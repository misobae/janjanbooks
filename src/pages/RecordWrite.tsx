import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { bookDataState, bookReviewState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import BtnBack from "../components/common/BtnBack";
import ProgressTracker from "../components/record/ProgressTracker";

function RecordWrite() {
  const bookData = useRecoilValue(bookDataState);
  const [cat, setCat] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [review, setReview] = useState<string>("");

  const navigate = useNavigate();
  const moveToViewPage = (data: IBookReview) => {
    navigate(`/recordView?id=${data.id}`);
  }
  const updateBookReviewState = useRecoilCallback(
    ({ set }) =>
      (newReview: IBookReview) => {
        set(bookReviewState, (prevReviews) => [...prevReviews, newReview]);
        moveToViewPage(newReview);
      }, [moveToViewPage]
  );

  return (
    <>
      <div className="
        flex justify-between items-center
        fixed top-0 left-0 z-10
        w-full
        p-3 px-5
        bg-black
      ">
        <BtnBack />
        {bookData && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => {
              updateBookReviewState({
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

      <ProgressTracker
        cat={cat} 
        startDate={startDate} 
        endDate={endDate} 
        review={review} 
        setCat={setCat} 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
        setReview={setReview}
      />
    </>
  )
};

export default RecordWrite;