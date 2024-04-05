import IconEdit from "../../assets/images/icon_menu.svg"

interface BtnEditProps {
  openModal: () => void;
}

function BtnEdit({ openModal }: BtnEditProps) {
  return (
    <button onClick={openModal} className="px-5">
      <img src={IconEdit} />
    </button>
  )
};

export default BtnEdit;