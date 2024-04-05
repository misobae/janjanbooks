interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // 모달 내용을 전달받는 props
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 hidden'}
        flex justify-center items-center
        fixed top-0 right-0 bottom-0 left-0 z-20
        bg-transparent backdrop-blur
      `}
    >
      <div className="w-[350px] bg-white rounded-3xl shadow-xl">
        {children}
      </div>
    </div>
  )
}

export default Modal;