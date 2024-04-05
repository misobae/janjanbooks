import { useRecoilValue } from "recoil";
import { bookReviewState } from "../state/atoms";

import Header from "../components/layout/Header";
import HeaderSearch from "../components/layout/HeaderSearch";
import Nav from "../components/layout/Nav";
import NoBook from "../components/NoBook";
import ReadStateList from "../components/home/ReadStateList";

function Home() {
  const bookReview = useRecoilValue(bookReviewState);
  const catRead = bookReview.filter(book => book.cat === "read");
  const catReading = bookReview.filter(book => book.cat === "reading");
  const catWantToRead = bookReview.filter(book => book.cat === "wantToRead");
  console.log(bookReview);
  
  return (
    <>
      {bookReview.length > 0 ? (
        <HeaderSearch text={`기록할 책이 있으세요?`} />
      ) : (
        <Header text={`아직 기록된 책이 없어요.
          좋아하는 책을 검색해 보세요.
        `} />
      )}
      
      <div className="layout">
        {bookReview.length > 0 ? (
          <>
            <ReadStateList title="읽고 있는 책" category={catReading} />
            <ReadStateList title="읽고 싶은 책" category={catWantToRead} />
            <ReadStateList title="읽은 책" category={catRead} />
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