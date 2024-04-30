import IconBook from "../assets/images/icon_reading_wh.svg"
import { Link } from "react-router-dom";
import Btn from "./common/Btn";

interface NoBookProps {
  text?: string;
}

function NoBook({ text }: NoBookProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[60vh]">
      <div className="
        flex items-center justify-center
        w-[200px] h-[200px] mb-10
      bg-slate-200
        rounded-full
      ">
        <img className="w-[80px]" src={IconBook} alt="책 아이콘" />
      </div>
      <p className="text-center text-sm mb-8 whitespace-pre-line">{text}</p>
      <Link to="/search">
        <div className="text-center">
          <Btn text="검색하기" />
        </div>
      </Link>
    </div>
  )
};

export default NoBook;