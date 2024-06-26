import { useMatch } from "react-router-dom";

interface NavItemProps {
  menuTitle: string;
  path: string;
  img: string;
}

function NavItem({ menuTitle, path, img }: NavItemProps) {
  const menuMatch = useMatch(path);

  return (
    <div
      className={`
        flex flex-col items-center gap-1
        ${menuMatch ? 'opacity-100' : 'opacity-60'}
      `}>
      <img className="w-4" src={img} alt={`${menuTitle} 아이콘`} />
      <span className="text-white text-xs text-center">{menuTitle}</span>
    </div>
  )
}

export default NavItem;