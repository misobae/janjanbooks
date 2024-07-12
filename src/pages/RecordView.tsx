import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookReviewState } from "../recoil/review";

import BtnEdit from "../components/common/BtnEdit";
import BookInfoBox from "../components/record/BookInfoBox";
import ProgressLabel from "../components/record/ProgressLabel";
import ReadingPeriod from "../components/record/ReadingPeriod";
import BtnBack from "../components/common/BtnBack";
import UpdateDeleteModal from "../components/record/UpdateDeleteModal";


function RecordView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookReviews = useRecoilValue(bookReviewState);
  const { id } = useParams(); 
  const matchedReview = bookReviews.find(review => String(review.id) === id);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
    {matchedReview && (
      <>
        <div className="
          flex justify-between items-center
          fixed top-0 left-0 z-10
          w-full
          p-3 px-5 pr-0
          bg-black
        ">
          <BtnBack path={-1} />
          <BtnEdit openModal={openModal} />
        </div>

        {isModalOpen && (
          <UpdateDeleteModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <div className="rounded-br-[48px] py-10 bg-black">
          <BookInfoBox
            thumbnail={matchedReview.img}
            title={matchedReview.title}
            authors={matchedReview.authors}
            publisher={matchedReview.publisher}
          />
        
          <div className="md:flex md:items-center md:gap-5 w-[90%] max-w-[1200px] m-auto">
            <div className="md:flex-initial md:w-1/2 mb-8 md:mb-0">
              <h3 className="mb-2 text-white">독서 상태</h3>
              <ProgressLabel
                htmlFor={matchedReview.cat}
                selectedOption={matchedReview.cat}
                view={true}
              />
            </div>
            <div className="md:flex-initial md:w-1/2">
              <ReadingPeriod
                startDate={matchedReview.startDate}
                endDate={matchedReview.endDate}
                readonly={true}
              />
            </div>
          </div>
        </div>

        <div className="layout px-4 py-6 mb-40 bg-gray-100">
          <p className="whitespace-pre-line text-sm">{matchedReview.review}</p>
        </div>
      </>
    )}
    </>
  )
};

export default RecordView;