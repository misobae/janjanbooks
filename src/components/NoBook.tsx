import IconBook from "../assets/images/icon_reading_wh.svg"
import { Link } from "react-router-dom";
import Btn from "./common/Btn";

function NoBook() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[70vh]">
      <div className="
        flex items-center justify-center
        w-[200px] h-[200px]
      bg-slate-200
        rounded-full
      ">
        <img className="w-[80px]" src={IconBook} alt="책 아이콘" />
      </div>
      <Link to="/search">
        <div className="text-center mt-10">
          <Btn text="검색하기" />
        </div>
      </Link>
    </div>
  )
};

export default NoBook;