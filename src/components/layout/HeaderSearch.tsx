import SearchFrom from "../SearchForm";

interface HeaderProps {
  text: string;
}

function HeaderSearch({text}: HeaderProps) {
  return (
    <div className="
      rounded-br-[48px]
      py-10 pl-5 pr-10
     bg-black
    ">
      <p className="ml-2 text-white text-xl whitespace-pre-line">{text}</p>
      <SearchFrom />
     </div>
  )
}

export default HeaderSearch;