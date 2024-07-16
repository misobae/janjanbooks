import { Link } from "react-router-dom";
import Btn from "../../components/ui/button/Btn";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center  w-full h-screen">
      <h1 className="text-8xl font-black tracking-tight">404</h1>
      <p>Not Found</p>

      <p className="text-center mt-3 mb-12">찾을 수 없는 페이지입니다. <br />입력하신 주소가 정확한지 다시 한 번 확인해 주세요.</p>
      <div className="flex justify-center items-center gap-4">
        <Link to="/">
          <Btn text="홈으로 이동하기" />
        </Link>
      </div>
    </div>
  )
};

export default NotFound;