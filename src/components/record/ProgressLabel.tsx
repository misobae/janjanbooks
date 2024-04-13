import imgBook from "../../assets/images/icon_book_wh.svg";
import imgReading from "../../assets/images/icon_reading_wh.svg";
import imgHeart from "../../assets/images/icon_heart_wh.svg";

interface ProgressLabelProps {
  htmlFor: string;
  selectedOption: string | null;
  view: boolean;
}

function ProgressLabel({ htmlFor, selectedOption, view }: ProgressLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`
      flex flex-col items-center justify-center gap-1
      ${view ? "w-full cursor-pointer" : "w-1/3 max-w-48"} h-[120px] md:h-[98px]
      border rounded-xl
      ${selectedOption === htmlFor ? "bg-blue-600 border-blue-600 " : "bg-transparent border-white "}
    `}>
      {htmlFor === "read" && <img className="w-[30px]" src={imgBook} alt="책 아이콘" />}
      {htmlFor === "reading" && <img className="w-[30px]" src={imgReading} alt="책 아이콘" />}
      {htmlFor === "wantToRead" && <img className="w-[30px]" src={imgHeart} alt="하트 아이콘" />}
      
      {htmlFor === "read" && <span className="text-white">읽은 책</span>}
      {htmlFor === "reading" && <span className="text-white">읽고 있는 책</span>}
      {htmlFor === "wantToRead" && <span className="text-white">읽고 싶은 책</span>}
    </label>
  )
}

export default ProgressLabel;