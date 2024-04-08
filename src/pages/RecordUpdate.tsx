import { useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { IBookReview } from "../utils/types";
import { bookReviewState } from "../state/atoms";

import BtnBack from "../components/common/BtnBack";
import ProgressTracker from "../components/record/ProgressTracker";
import { useNavigate, useParams } from "react-router-dom";

function RecordUpdate() {
  const { id } = useParams(); 
  const bookReviews = useRecoilValue(bookReviewState);
  const data = bookReviews.find(review => String(review.id) === id);

  const [cat, setCat] = useState<string>(data?.cat || "");
  const [startDate, setStartDate] = useState<string>(data?.startDate || "");
  const [endDate, setEndDate] = useState<string>(data?.endDate || "");
  const [review, setReview] = useState<string>(data?.review || "");

  const navigate = useNavigate();
  const moveToViewPage = (data: IBookReview) => {
    navigate(`/record/${data.id}`);
  }

  const updateBookReviewState = useRecoilCallback(
    ({ set }) =>
      (newReview: IBookReview) => {
        set(bookReviewState, (prevReviews) => {
          const updatedReviews = prevReviews.map(review => {
            if (review.id === newReview.id) { // 기존 리뷰와 새로운 리뷰의 id가 같은 경우에만 업데이트
              return {
                ...review,
                cat: newReview.cat,
                img: newReview.img,
                title: newReview.title,
                authors: newReview.authors,
                publisher: newReview.publisher,
                startDate: newReview.startDate,
                endDate: newReview.endDate,
                review: newReview.review
              };
            }

            // 기존 리뷰와 새로운 리뷰의 id가 일치하지 않으면 기존 리뷰 유지
            return review;
          });
  
          alert('수정되었습니다.');
          moveToViewPage(newReview);
  
          return updatedReviews;
        });
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
        <BtnBack path={-1} />
        {data && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => {
              updateBookReviewState({
                id: data.id,
                cat: cat,
                img: data.img,
                title: data.title,
                authors: data.authors,
                publisher: data.publisher,
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
}

export default RecordUpdate;