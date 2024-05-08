import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { bookReviewState } from "../../state/atoms";

import Modal from "../common/Modal";
import { notify } from "../common/Toast";

import IconEdit from "../..//assets/images/icon_edit_gr.svg"
import IconDel from "../../assets/images/icon_delete.svg"

interface ModalProps {
  isModalOpen: boolean; 
  setIsModalOpen: (isOpen: boolean) => void;
}

const UpdateDeleteModal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const { id } = useParams(); 
  const setBookReviews = useSetRecoilState(bookReviewState);

  const navigate = useNavigate();

  const deleteReview = () => {
    setBookReviews((reviews) => reviews.filter((review) => review.id !== id));
  };

  const handleClickDelBtn = () => {
    try {
      deleteReview();
      notify({ type: "default", text: "기록이 삭제되었습니다." });
      moveToListPage();
    } catch (error) {
      console.error(error);
      notify({ type: "error", text: "다시 시도해 주세요." });
    }
  };

  const moveToUpdatePage = () => {
    navigate(`/record/update/${id}`);
  };

  const moveToListPage = () => {
    navigate('/list');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div>
        <button
          className="flex items-center gap-4 w-full px-10 py-5 border-b"
          onClick={moveToUpdatePage}
        >
          <img className="w-6" src={IconEdit} alt="펜 아이콘" />
          <span className="font-semibold text-gray-600">수정하기</span>
        </button>
        <button
          className="flex items-center gap-4 w-full px-10 py-5"
          onClick={handleClickDelBtn}
        >
          <img className="w-6" src={IconDel} alt="휴지통 아이콘" />
          <span className="font-semibold text-gray-600">삭제하기</span>
        </button>
      </div>
    </Modal>
  )
};

export default UpdateDeleteModal;