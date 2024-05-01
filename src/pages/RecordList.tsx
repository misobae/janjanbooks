import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import RecordSearchBox from "../components/record/RecordSearchBox";
import TabBtn from "../components/record/TabBtn";
import SortBtn from "../components/record/SortBtn";

function RecordList() {

  return (
    <>
      <Header text="서재" searchForm={<RecordSearchBox />} />
      
      <div className="layout">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm">
            <TabBtn cat="all" title="전체" />
            <TabBtn cat="reading" title="읽고 있는 책" />
            <TabBtn cat="wantToRead" title="읽고 싶은 책" />
            <TabBtn cat="read" title="읽은 책" />
          </div>
          <SortBtn />
        </div>
        <Outlet />
      </div>
    </>
  )
};

export default RecordList;