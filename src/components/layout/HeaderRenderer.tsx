
import { useRecoilValue } from 'recoil';
import { bookReviewState } from '../../state/atoms';
import { getCurrentDateInfo } from '../../utils/dateFormat';
import Header from './Header';
import BookSearchBox from '../common/BookSearchBox';
import RecordSearchBox from '../record/RecordSearchBox';
import BtnBack from '../common/BtnBack';

interface HeaderRendererProp {
  pathname: string;
}

const HeaderRenderer = ({ pathname }: HeaderRendererProp) => {
  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = bookReviews.filter(review => review.cat === "read");
  const { currentYearAndMonth } = getCurrentDateInfo();
  const matchingCurrentDateReviews = readReviews.filter(review => review.startDate.slice(0, 7) === currentYearAndMonth);

  const homePath = pathname === "/";
  const listPath = pathname.includes('/list');
  const listSearchPath = pathname === "/list/search";
  const searchPath = pathname === "/search";
  const statPath = pathname === "/statistics";

  if (homePath) {
    return (
      <Header
        text={bookReviews.length > 0 ? "기록할 책이 있으세요?" : `아직 기록된 책이 없어요.\n좋아하는 책을 검색해 보세요.`}
        searchForm={bookReviews.length > 0 ? <BookSearchBox /> : null}
      />
    );
  }

  if (listPath) {
    return listSearchPath ? (
      <Header
        text="서재 검색"
        btnBack={<BtnBack path="/list" />}
        searchForm={<RecordSearchBox />}
      />
    ) : (
      <Header
        text="서재"
        searchForm={<RecordSearchBox />}
      />
    );
  }

  if (searchPath) {
    return (
      <Header
        text="기록할 책이 있으세요?"
        searchForm={<BookSearchBox />}
      />
    );
  }

  if (statPath) {
    return readReviews.length > 0 ? (
      <Header text={`이번 달에는\n${matchingCurrentDateReviews.length}권의 책을 읽었어요.`} />
    ) : (
      <Header text={`[읽은 책]에 작성된 기록이 없어요.\n다 읽은 책을 기록해 보세요.`} />
    );
  }

  return null;
};

export default HeaderRenderer;