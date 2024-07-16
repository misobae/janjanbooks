import { useNavigate, To } from "react-router-dom";
import IconBack from "../../../assets/images/icon_arrow.svg"

interface BtnBackProps {
  path: string | number;
}

function BtnBack({ path }: BtnBackProps) {
  const navigate = useNavigate();

  const handleMoveTo = () => {
    if (typeof path === 'string') {
      navigate(path as To);
    } else {
      navigate(path);
    }
  };

  return (
    <button onClick={handleMoveTo}>
      <img src={IconBack} />
    </button>
  )
};

export default BtnBack;