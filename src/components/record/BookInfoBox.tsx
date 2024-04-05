import { IBooksData } from "../../utils/types";

function BookInfoBox({thumbnail, title, authors, publisher}: IBooksData) {
  return (
    <div className="flex items-center mb-10">
      <div className="relative w-[120px] mr-[-50px] bg-slate-300 shrink-0">
        <img
          className="block w-full"
          src={thumbnail} alt={title+'북 커버'}
        />
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