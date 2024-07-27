import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Review } from "../../types/review";
import validateDate from "../../utils/validateDate";
import handleValidationResult from "../../utils/reviewValidationHandler";
import { bookReviewState } from "../../recoil/review";

import { notify } from "../../components/ui/Toast";
import BtnBack from "../../components/ui/button/BtnBack";
import ProgressTracker from "./components/ProgressTracker";

function RecordUpdate() {
  const { id } = useParams(); 
  const [bookReviews, setBookReviews] = useRecoilState(bookReviewState);
  const matchedReview = bookReviews.find(review => String(review.id) === id);

  const [cat, setCat] = useState<string>(matchedReview?.cat || "");
  const [startDate, setStartDate] = useState<string>(matchedReview?.startDate || "");
  const [endDate, setEndDate] = useState<string>(matchedReview?.endDate || "");
  const [review, setReview] = useState<string>(matchedReview?.review || "");

  const navigate = useNavigate();
  
  // view 페이지로 이동
  const moveToViewPage = (matchedReview: Review) => {
    navigate(`/record/${matchedReview.id}`);
  };

  // 리뷰 상태 업데이트
  const updateReviewState = (newReview: Review) => {
    setBookReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === newReview.id
          ? { ...review, ...newReview }
          : review
      )
    )
  };
  
  const saveReview = (newReview: Review) => {
    try {
      updateReviewState(newReview);
      notify({ type: "default", text: "기록이 수정되었습니다." });
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

  useEffect(() => {
    if (matchedReview) {
      setCat(matchedReview.cat);
      setStartDate(matchedReview.startDate);
      setEndDate(matchedReview.endDate);
      setReview(matchedReview.review);
    }
  }, [matchedReview]);

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
        {matchedReview && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => {
              handleClickSaveBtn({
                id: matchedReview.id,
                cat: cat,
                thumbnail: matchedReview.thumbnail,
                title: matchedReview.title,
                authors: matchedReview.authors,
                publisher: matchedReview.publisher,
                startDate: startDate,
                endDate: endDate,
                review: review,
              });
          }}>
            저장
          </button>
        )}
      </div>
      
      {matchedReview && (
        <ProgressTracker
          thumbnail={matchedReview.thumbnail}
          title={matchedReview.title}
          authors={matchedReview.authors}
          publisher={matchedReview.publisher}
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
}

export default RecordUpdate;