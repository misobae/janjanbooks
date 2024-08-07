import { Link } from "react-router-dom";

import NavItem from "./NavItem";

import imgHome from "../../assets/images/icon_home.svg";
import imgBooks from "../../assets/images/icon_books.svg";
import imgRecord from "../../assets/images/icon_edit_wh.svg";
import imgStat from "../../assets/images/icon_chart.svg";

function Nav() {
  return (
    <nav className="
      flex justify-center gap-x-10
      fixed bottom-0 left-0 right-0
      w-72 mx-auto pt-3.5 pb-1
      bg-black rounded-t-3xl
    ">
      <Link to="/">
        <NavItem
          menuTitle="홈"
          path="/"
          img={imgHome}
        />
      </Link>
      <Link to="/list/all">
        <NavItem
          menuTitle="서재"
          path="/list/*"
          img={imgBooks}
        />
      </Link>
      <Link to="/search">
        <NavItem
          menuTitle="기록"
          path="/search"
          img={imgRecord}
        />
      </Link>
      <Link to="/statistic">
        <NavItem
          menuTitle="통계"
          path="/statistic"
          img={imgStat}
        />
      </Link>
    </nav>
  )
};

export default Nav;