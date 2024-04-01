import { useNavigate } from "react-router-dom";
import IconBack from "../../assets/images/icon_arrow.svg"

function BtnBack() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <button onClick={handleGoBack}>
      <img src={IconBack} />
    </button>
  )
};

export default BtnBack;