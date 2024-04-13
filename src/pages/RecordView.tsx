import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bookReviewState } from "../state/atoms";

import BtnEdit from "../components/common/BtnEdit";
import Nav from "../components/layout/Nav";
import BookInfoBox from "../components/record/BookInfoBox";
import ProgressLabel from "../components/record/ProgressLabel";
import ReadingPeriod from "../components/record/ReadingPeriod";
import Modal from "../components/common/Modal";
import BtnBack from "../components/common/BtnBack";
import { notify } from "../components/common/Toast";

import IconEdit from "../assets/images/icon_edit_gr.svg"
import IconDel from "../assets/images/icon_delete.svg"

function RecordView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { id } = useParams(); 
  const [bookReviews, setBookReviews] = useRecoilState(bookReviewState);
  const matchedReview = bookReviews.find(review => String(review.id) === id);
  
  const navigate = useNavigate();

  const deleteReview = () => {
    setBookReviews((reviews) => reviews.filter((review) => review.id !== id));
  };

  const handleDelBtnClick = () => {
    try {
      deleteReview();
      notify({ type: "default", text: "기록이 삭제되었습니다." });
      navigate('/list');
    } catch (error) {
      console.error(error);
      notify({ type: "error", text: "다시 시도해 주세요." });
    }
  };

  const moveToUpdate = () => {
    navigate(`/record/update/${id}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div>
              <button
                className="flex items-center gap-4 w-full px-10 py-5 border-b"
                onClick={moveToUpdate}
              >
                <img className="w-6" src={IconEdit} alt="펜 아이콘" />
                <span className="font-semibold text-gray-600">수정하기</span>
              </button>
              <button
                className="flex items-center gap-4 w-full px-10 py-5"
                onClick={handleDelBtnClick}
              >
                <img className="w-6" src={IconDel} alt="휴지통 아이콘" />
                <span className="font-semibold text-gray-600">삭제하기</span>
              </button>
            </div>
          </Modal>
        )}

        <div className="rounded-br-[48px] py-10 pl-5 bg-black">
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
        
        <Nav />
      </>
    )}
    </>
  )
};

export default RecordView;