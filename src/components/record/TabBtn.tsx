import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface TabBtnProps {
  cat: string;
  title: string;
}

function TabBtn({ cat, title }: TabBtnProps) {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleSelectCat = (category: string) => {
    navigate(`/list/${category}`)
  };

  useEffect(() => {
    if (category === 'all') {
      cat === 'all';
    }
  }, [])

  return (
    <button
      onClick={() => handleSelectCat(cat)}
      className={`
        ${category === cat && "text-blue-700 font-bold"}
        ${cat === "read" ? "" : "after:content-['|'] after:px-2 after:cursor-default after:text-black after:font-normal"}
      `}
    >
      {title}
    </button>
  )
}

export default TabBtn;