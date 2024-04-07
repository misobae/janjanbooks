import { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedReviewState } from "../../state/atoms";

import ImgSortUp from "../../assets/images/icon_sort_up.svg";
import ImgSortDown from "../../assets/images/icon_sort_down.svg";

function SortBtn() {
  const [filteredReviews, setFilteredReviews] = useRecoilState(selectedReviewState);
  const [isAscending, setIsAscending] = useState(true);

  const sortedReviews = () => {
    return [...filteredReviews].sort((a, b) => {
      return isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
  };

  const handleSort = () => {
    setIsAscending(prev => !prev);
    setFilteredReviews(sortedReviews);
  };

  return (
    <button
      onClick={handleSort}
      className="w-[24px] h-[24px] p-1 rounded-full border-2 border-black"
    >
      <img className="block w-full" src={isAscending ? ImgSortUp : ImgSortDown} alt="정렬 아이콘" />
    </button>
  )
}

export default SortBtn;