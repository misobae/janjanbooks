import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookDataState, bookReviewState } from "../state/atoms";

import BtnEdit from "../components/common/BtnEdit";
import Nav from "../components/layout/Nav";
import BookInfoBox from "../components/record/BookInfoBox";
import ProgressLabel from "../components/record/ProgressLabel";
import ReadingPeriod from "../components/record/ReadingPeriod";
import Modal from "../components/common/Modal";

import IconEdit from "../assets/images/icon_edit_gr.svg"
import IconDel from "../assets/images/icon_delete.svg"

function RecordView() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const bookData = useRecoilValue(bookDataState);
  const [bookReviews, setBookReviews] = useRecoilState(bookReviewState);
  const data = bookReviews.find(review => String(review.id) === id);
  
  const deleteReview = () => {
    setBookReviews(reviews => reviews.filter(review => review.id !== id));
    alert('삭제되었습니다.');
    navigate('/recordList');
  }

  const moveToUpdate = () => {
    navigate(`/recordUpdate?id=${id}`);
}

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

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return (
    <>
      <div className="
        flex justify-end items-center
        fixed top-0 left-0 z-10
        w-full
        p-3 px-5 pr-0
        bg-black
      ">
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
      <div className="rounded-br-[48px] py-10 pl-5 bg-black">
        {bookData && (
          <BookInfoBox
            thumbnail={bookData.thumbnail}
            title={bookData.title}
            authors={bookData.authors}
            publisher={bookData.publisher}
          />
        )}
        <div className="flex justify-center">
          <ProgressLabel
            htmlFor={data.cat}
            selectedOption={data.cat}
            view={true}
          />
        </div>
        <ReadingPeriod
          startDate={data.startDate}
          endDate={data.endDate}
          readonly={true}
        />
      </div>

      <div className="px-6 py-8 mb-20 break-keep">
        {data.review}
      </div>

      <Nav />
    </>
  )
};

export default RecordView;