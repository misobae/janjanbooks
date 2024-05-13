import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import getMetaData from "./utils/metaData";
import { getCurrentDateInfo } from "./utils/dateFormat";
import { bookReviewState } from "./state/atoms";

import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Toast from "./components/common/Toast";
import BookSearchBox from "./components/BookSearchBox";
import RecordSearchBox from "./components/record/RecordSearchBox";
import NoBook from "./components/NoBook";

const NotFound = lazy(() => import('./pages/NotFound'));
const RecordView = lazy(() => import('./pages/RecordView'));
const RecordList = lazy(() => import('./pages/RecordList'));
const RecordRedirect = lazy(() => import('./utils/recordRedirect'));
const RecordListCat = lazy(() => import('./pages/RecordListCat'));
const RecordWrite = lazy(() => import('./pages/RecordWrite'));
const RecordUpdate = lazy(() => import('./pages/RecordUpdate'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Search = lazy(() => import('./pages/Search'));
const RecordSearch = lazy(() => import('./pages/RecordSearch'));

function App() {
  const location = useLocation();
  const { title, keywords, description } = getMetaData(location.pathname);

  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = bookReviews.filter(review => review.cat === "read");
  const { currentYearAndMonth } = getCurrentDateInfo();
  const matchingCurrentDateReviews = readReviews.filter(review => review.startDate.slice(0, 7) === currentYearAndMonth);
  

  const homePath = location.pathname === "/";
  const listPath = location.pathname.includes('/list');
  const searchPath = location.pathname === "/search";
  const statPath = location.pathname === "/statistics";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title+' | 잔잔북스'}</title>
        <meta name="title" content={title+' | 잔잔북스'} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords+'잔잔북스'} />
      </Helmet>

      <Toast />

      {homePath && (
        <Header
          text={bookReviews.length > 0 ? "기록할 책이 있으세요?" : `아직 기록된 책이 없어요.
          좋아하는 책을 검색해 보세요.`}
          searchForm={bookReviews.length > 0 ? <BookSearchBox /> : null}
        />
      )}
      {listPath && (
        <Header
          text="서재"
          searchForm={<RecordSearchBox />}
        />
      )}
      {searchPath && (
        <Header
          text="기록할 책이 있으세요?"
          searchForm={<BookSearchBox />}
        />
      )}
      {statPath && (
        readReviews.length > 0 ? (
          <Header text={`이번 달에는
            ${matchingCurrentDateReviews.length}권의 책을 읽었어요.
          `} />
        ) : (
          <>
            <Header text="[읽은 책]에 작성된 기록이 없어요.
            다 읽은 책을 기록해 보세요." />
            <NoBook />
          </>
        )
      )}

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={ <Home /> } />
        <Route path="/list" element={
          <Suspense>
            <RecordRedirect />
          </Suspense>
        } />
        <Route path="/list" element={
          <Suspense>
            <RecordList />
          </Suspense>
        }>
          <Route path=":category" element={
            <Suspense>
              <RecordListCat />
            </Suspense>
          } />
        </Route>
        <Route path="/list/search" element={
          <Suspense>
            <RecordSearch />
          </Suspense>
        } />
        <Route path="/record/:id" element={ 
          <Suspense>
            <RecordView />
          </Suspense>
        } />
        <Route path="/record/write/:id" element={ 
          <Suspense>
            <RecordWrite />
          </Suspense>
        } />
        <Route path="/record/update/:id" element={
          <Suspense>
            <RecordUpdate />
          </Suspense>
        } />
        <Route path="/statistics" element={
          <Suspense>
            <Statistics />
          </Suspense>
        } />
        <Route path="/search" element={ 
          <Suspense>
            <Search />
          </Suspense>
        } />
        <Route path="/*" element={
          <Suspense>
            <NotFound />
          </Suspense>
        } />
      </Routes>

      {
        !location.pathname.includes('/record/write') &&
        !location.pathname.includes('/record/update') &&
        <Nav />
      }
    </HelmetProvider>
  );
};

export default App;