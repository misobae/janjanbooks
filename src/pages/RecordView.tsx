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

import IconEdit from "../assets/images/icon_edit_gr.svg"
import IconDel from "../assets/images/icon_delete.svg"

function RecordView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { id } = useParams(); 
  const [bookReviews, setBookReviews] = useRecoilState(bookReviewState);
  const reviewData = bookReviews.find(review => String(review.id) === id);
  
  const navigate = useNavigate();
  const deleteReview = () => {
    setBookReviews(reviews => reviews.filter(review => review.id !== id));
    alert('삭제되었습니다.');
    navigate('/record');
  }

  const moveToUpdate = () => {
    navigate(`/record/update/${id}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    if (isModalOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
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
            onClick={deleteReview}
          >
            <img className="w-6" src={IconDel} alt="휴지통 아이콘" />
            <span className="font-semibold text-gray-600">삭제하기</span>
          </button>
        </div>
      </Modal>

      {reviewData && (
        <>
        <div className="rounded-br-[48px] py-10 pl-5 bg-black">
          <BookInfoBox
            thumbnail={reviewData.img}
            title={reviewData.title}
            authors={reviewData.authors}
            publisher={reviewData.publisher}
          />
        
          <div className="flex justify-center">
            <ProgressLabel
              htmlFor={reviewData.cat}
              selectedOption={reviewData.cat}
              view={true}
            />
          </div>
          <ReadingPeriod
            startDate={reviewData.startDate}
            endDate={reviewData.endDate}
            readonly={true}
          />
        </div>

        <div className="layout px-4 py-6 mb-40 bg-gray-100">
          <p className="whitespace-pre-line text-sm">{reviewData.review}</p>
        </div>
        </>
      )}
    
      <Nav />
    </>
  )
};

export default RecordView;