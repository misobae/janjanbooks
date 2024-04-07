import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookReviewState, selectedReviewState } from "../../state/atoms";

interface TabBtnProps {
  cat: string;
  title: string;
  activeTab: string;
  setActiveTab: (cat: string) => void;
}

function TabBtn({ cat, title, activeTab, setActiveTab }: TabBtnProps) {
  const bookReviews = useRecoilValue(bookReviewState);
  const setFilteredReviews = useSetRecoilState(selectedReviewState);

  const tabCategory = (category: string) => {
    setActiveTab(category);
    if (category === 'all') {
      setFilteredReviews(bookReviews); 
    } else {
      const selectedReviews = bookReviews.filter(review => review.cat === category);
      setFilteredReviews(selectedReviews); 
    }
  };

  return (
    <button
      onClick={() => tabCategory(cat)}
      className={`
        ${activeTab === cat && "text-blue-700 font-bold"}
        ${cat === "read" ? "" : "after:content-['|'] after:px-2 after:cursor-default after:text-black after:font-normal"}
      `}
    >
      {title}
    </button>
  )
}

export default TabBtn;