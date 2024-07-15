import { Outlet } from "react-router-dom";

function RecordList() {
  return (
    <div className="layout">
      <Outlet />
    </div>
  )
};

export default RecordList;