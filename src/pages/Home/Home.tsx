import { useRecoilValue } from "recoil";
import { bookReviewState } from "../../recoil/review";

import NoBook from "../../components/common/NoBook";
import ReadStateList from "./components/ReadStateList";

function Home() {
  const bookReview = useRecoilValue(bookReviewState);
  const catRead = bookReview.filter(book => book.cat === "read");
  const catReading = bookReview.filter(book => book.cat === "reading");
  const catWantToRead = bookReview.filter(book => book.cat === "wantToRead");
  
  return (
    <div className="layout">
      {bookReview.length > 0 ? (
        <>
          <ReadStateList title="읽고 있는 책" category={catReading} path="reading" />
          <ReadStateList title="읽고 싶은 책" category={catWantToRead} path="wantToRead" />
          <ReadStateList title="읽은 책" category={catRead} path="read" />
        </>
      ) : (
        <NoBook />
      )}
    </div>
  )
};

export default Home;