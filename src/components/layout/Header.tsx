interface HeaderProps {
  text: string;
  btnBack?: React.ReactNode;
  searchForm?: React.ReactNode;
}

function Header({ text, btnBack, searchForm }: HeaderProps) {
  return (
    <div className="
      rounded-br-[48px]
      pt-5 pb-10 pl-5 pr-10
     bg-black
    "> 
      { btnBack }
      <p className="mt-5 ml-2 mb-4 text-white text-xl whitespace-pre-line">{text}</p>
      { searchForm }
     </div>
  )
}

export default Header;