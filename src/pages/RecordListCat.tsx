import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookDataState, bookReviewState, selectedReviewState } from "../state/atoms";
import { IBookReview } from "../utils/types";

import NoBook from "../components/NoBook";
import NoBookCover from "../components/common/NoBookCover";

function RecordListCat() {
  const navigate = useNavigate();
  const { category } = useParams();
  const bookReviews = useRecoilValue(bookReviewState);
  const [filteredReviews, setFilteredReviews] = useRecoilState(selectedReviewState);
  const selectedReviews = bookReviews.filter(review => review.cat === category);
  const setBookDataState = useSetRecoilState(bookDataState);
  
  const moveToViewPage = (review: IBookReview) => {
    const { img, title, authors, publisher, id } = review;
    setBookDataState({ thumbnail: img, title, authors, publisher, id });
    navigate(`/record/${id}`);
  };

  useEffect(() => {
    if (category === 'all') {
      setFilteredReviews(bookReviews);
    } else {
      setFilteredReviews(selectedReviews);
    }
  }, [category])

  return (
    <>
      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 mb-24">
          {filteredReviews.map(review => (
            <div key={review.id} className="cursor-pointer" onClick={() => moveToViewPage(review)}>
              <div className="mb-2 border">
                { review.img === "" ? (
                  <NoBookCover />
                  ) : (
                  <img
                    className="block w-full"
                    src={review.img} alt={review.title+'북 커버'}
                  />
                )}
              </div>
              <h4 className="text-sm font-semibold line-clamp-2">{review.title}</h4>
              <span className="text-xs">
                {review.authors.map((author, index) => (
                  <span key={index}>
                    {author}
                    {index !== review.authors.length - 1 ? ", " : ""}
                  </span>
                ))} 
              </span>
            </div>
          ))}
        </div>
      ) : <NoBook text={`기록된 책이 없어요.
      좋아하는 책을 기록해 보세요. `} />}
    </>
  )
}

export default RecordListCat;