import useBodyScrollLock from '../../../hooks/useBodyScrollLock';

interface ConfirmModalProps {
  isOpen: boolean;
  text: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

function ConfirmModal({ isOpen, text, handleConfirm, handleCancel }: ConfirmModalProps) {
  useBodyScrollLock(isOpen);

  return (
    <>
      {isOpen && (
        <div
          className="flex justify-center items-center
          fixed top-0 right-0 bottom-0 left-0 z-20"
          onClick={handleCancel}
        >
          <div className=" bg-white w-[320px] p-8 rounded-xl shadow-xl">
            <p className="mb-5 whitespace-pre-line font-medium text-center">{text}</p>
            <div className="flex justify-center items-center gap-3">
              <button className="w-20 p-1 border rounded-lg bg-blue-700 text-white" onClick={handleConfirm}>확인</button>
              <button className="w-20 p-1 border rounded-lg" onClick={handleCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmModal;