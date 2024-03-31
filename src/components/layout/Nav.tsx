import { Link } from "react-router-dom";
import imgHome from "../../assets/images/icon_home.svg";
import imgBooks from "../../assets/images/icon_books.svg";
import imgRecord from "../../assets/images/icon_edit_wh.svg";
import imgStat from "../../assets/images/icon_chart.svg";

function Nav() {
  return (
    <nav className="
      flex justify-center gap-x-10
      fixed bottom-0 left-0 right-0
      w-6/12 min-w-80 max-w-md
      mx-auto pt-4 pb-1
      bg-black
      rounded-t-3xl
    ">
      <Link to="/">
        <div className="flex flex-col items-center gap-1.5">
          <img className="w-5" src={imgHome} alt="홈 아이콘" />
          <span className="text-white text-sm text-center">홈</span>
        </div>
      </Link>
      <Link to="/recordList">
        <div className="flex flex-col items-center gap-1.5">
          <img className="w-5" src={imgBooks} alt="책 아이콘" />
          <span className="text-white text-sm text-center">서재</span>
        </div>
      </Link>
      <Link to="/recordWrite">
        <div className="flex flex-col items-center gap-1.5">
          <img className="w-5" src={imgRecord} alt="펜 아이콘" />
          <span className="text-white text-sm text-center">기록</span>
        </div>
      </Link>
      <Link to="/statistics">
        <div className="flex flex-col items-center gap-1.5">
          <img className="w-5" src={imgStat} alt="차트 아이콘" />
          <span className="text-white text-sm text-center">통계</span>
        </div>
      </Link>
    </nav>
  )
};

export default Nav;