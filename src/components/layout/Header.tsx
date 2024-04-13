interface HeaderProps {
  text: string;
  btnBack?: React.ReactNode;
  searchForm?: React.ReactNode;
}

function Header({ text, btnBack, searchForm }: HeaderProps) {
  return (
    <div className="pt-6 pb-8 rounded-br-[48px] bg-black"> 
      <div className="w-[90%] max-w-[1200px] m-auto">
        { btnBack }
        <p className="mt-5 ml-2 mb-4 text-white text-xl whitespace-pre-line">{text}</p>
        { searchForm }
      </div>
     </div>
  )
}

export default Header;