import { useRecoilValue } from "recoil";
import { bookReviewState } from "../state/atoms";

import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import NoBook from "../components/NoBook";
import ReadStateList from "../components/home/ReadStateList";
import BookSearchBox from "../components/BookSearchBox";

function Home() {
  const bookReview = useRecoilValue(bookReviewState);
  const catRead = bookReview.filter(book => book.cat === "read");
  const catReading = bookReview.filter(book => book.cat === "reading");
  const catWantToRead = bookReview.filter(book => book.cat === "wantToRead");
  
  return (
    <>
      {bookReview.length > 0 ? (
        <Header text={`기록할 책이 있으세요?`} searchForm={<BookSearchBox />} />
      ) : (
        <Header text={`아직 기록된 책이 없어요.
          좋아하는 책을 검색해 보세요.
        `} />
      )}
      
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

      <Nav />
    </>
  )
};

export default Home;