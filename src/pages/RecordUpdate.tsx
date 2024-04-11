import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { IBookReview } from "../utils/types";
import { bookReviewState } from "../state/atoms";

import Toast, { notify } from "../components/common/Toast";
import BtnBack from "../components/common/BtnBack";
import ProgressTracker from "../components/record/ProgressTracker";

function RecordUpdate() {
  const { id } = useParams(); 
  const bookReviews = useRecoilValue(bookReviewState);
  const data = bookReviews.find(review => String(review.id) === id);

  const [cat, setCat] = useState<string>(data?.cat || "");
  const [startDate, setStartDate] = useState<string>(data?.startDate || "");
  const [endDate, setEndDate] = useState<string>(data?.endDate || "");
  const [review, setReview] = useState<string>(data?.review || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCat(data.cat);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setReview(data.review);
    }
  }, [data]);

  const moveToViewPage = (data: IBookReview) => {
    navigate(`/record/${data.id}`);
  };

  const updateBookReviewState = useRecoilCallback(
    ({ set }) => (newReview: IBookReview) => {
      set(bookReviewState, (prevReviews) =>
        prevReviews.map((review) =>
          review.id === newReview.id
            ? { ...review, ...newReview }
            : review
        )
      );
      moveToViewPage(newReview);
    },
    [moveToViewPage]
  );
  
  const handleSaveBtnClick = async (newReview: IBookReview) => {
    try {
      await updateBookReviewState(newReview);
      notify({ type: "default", text: "기록이 수정되었습니다." });
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
        <BtnBack path={-1} />
        {data && (
          <button
            className="text-blue-600 text-sm"
            onClick={() => {
              handleSaveBtnClick({
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
      <Toast />
    </>
  )
}

export default RecordUpdate;