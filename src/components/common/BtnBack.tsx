import { useNavigate } from "react-router-dom";
import IconBack from "../../assets/images/icon_arrow.svg"

interface BtnBackProps {
  path: string;
}
function BtnBack({ path }: BtnBackProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(path);
  }

  return (
    <button onClick={handleGoBack}>
      <img src={IconBack} />
    </button>
  )
};

export default BtnBack;