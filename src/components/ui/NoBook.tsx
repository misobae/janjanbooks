// <NoBook />
// : 저장된 독서 기록이 없을 경우 페이지 레이아웃 대신에 보여주는 컴포넌트

import { Link } from "react-router-dom";
import IconBook from "../../assets/images/icon_reading_wh.svg"
import Btn from "./button/Btn";

interface NoBookProps {
  text?: string;
}

function NoBook({ text }: NoBookProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[60vh]">
      <div className="
        flex items-center justify-center
        w-[200px] h-[200px] mb-6
      bg-slate-200
        rounded-full
      ">
        <img className="w-[80px]" src={IconBook} alt="책 아이콘" />
      </div>
      <p className="text-center text-sm mb-8 whitespace-pre-line">{text}</p>
      <Link to="/search">
        <div className="text-center">
          <Btn text="책 검색하기" />
        </div>
      </Link>
    </div>
  )
};

export default NoBook;