import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { bookDataState } from "../state/atoms";
import { IBooksData } from "../utils/types";

function BookList({thumbnail, title, authors, publisher, isbn}: IBooksData) {
  const setBookData = useSetRecoilState(bookDataState);
  const navigate = useNavigate();

  const onBoxClicked = async () => {
    await setBookData({ thumbnail, title, authors, publisher, isbn });
    navigate(`/record/write/${isbn}`);
  };

  return (
    <div
      onClick={onBoxClicked}
      className="p-5 my-16 bg-slate-200 rounded-xl cursor-pointer"
    >
      <div className="flex gap-5">
        <div className="w-[120px] mt-[-50px] shrink-0">
          <img className="block w-full" src={thumbnail} alt="Book cover" />
        </div>
        <div className="break-keep">
          <p className="text-lg font-semibold">{title}</p>
          <p className="font-light mb-8">
            {authors.map((author, index) => (
              <span key={index}>
                {author}
                {index !== authors.length - 1 ? ", " : ""}
              </span>
            ))}  
          </p>
          <p className="font-light text-sm text-slate-400">{publisher}</p>
        </div>
      </div>
    </div>
  )
}

export default BookList;