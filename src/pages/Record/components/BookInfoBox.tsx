import NoBookCover from "../../../components/ui/NoBookCover";
import { Book } from "../../../types/book";

function BookInfoBox({thumbnail, title, authors, publisher}: Book) {
  return (
    <div className="flex items-center w-[95%] md:w-[90%] max-w-[1200px] mb-10 ml-auto md:mx-auto">
      <div className="overflow-hidden relative w-[120px] h-[170px] mr-[-50px] border shrink-0">
        { thumbnail === "" ? (
            <NoBookCover />
            ) : (
          <img
            className="block w-full"
            src={thumbnail} alt={title+'북 커버'}
          />
        )}
      </div>
      <div className=" h-[240px] rounded-b-[48px] p-12 pl-[4.5em] bg-white w-full">
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

export default BookInfoBox;