import BtnBack from "../../components/common/BtnBack";
import SearchFrom from "../SearchForm";

interface HeaderProps {
  text: string;
  children?: React.ReactNode;
}

function HeaderSearch({ text, children }: HeaderProps) {
  return (
    <div className="
      rounded-br-[48px]
      pt-5 pb-10 pl-5 pr-10
     bg-black
    "> 
      { children }
      <p className="mt-5 ml-2 mb-4 text-white text-xl whitespace-pre-line">{text}</p>
      <SearchFrom />
     </div>
  )
}

export default HeaderSearch;