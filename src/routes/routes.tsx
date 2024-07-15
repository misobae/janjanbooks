import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookReviewState } from "../recoil/review";

import Home from "../pages/Home/Home";

import RecordListSkeleton from "../pages/RecordList/components/RecordListSkeleton";
import RecordSkeleton from "../pages/Record/components/RecordSkeleton";
import StatSkeleton from "../components/statistics/StatSkeleton";

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const RecordView = lazy(() => import('../pages/Record/RecordView'));
const RecordWrite = lazy(() => import('../pages/Record/RecordWrite'));
const RecordUpdate = lazy(() => import('../pages/Record/RecordUpdate'));
const RecordList = lazy(() => import('../pages/RecordList/RecordList'));
const RecordRedirect = lazy(() => import('./RecordRedirect'));
const RecordListCat = lazy(() => import('../pages/RecordList/RecordListCat'));
const RecordListSearch = lazy(() => import('../pages/RecordList/RecordListSearch'));
const Statistics = lazy(() => import('../pages/Statistics'));
const Search = lazy(() => import('../pages/Search/Search'));

function AppRoutes() {
  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = bookReviews.filter(review => review.cat === "read");

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={ <Home /> } />

      <Route path="/list" element={
        <Suspense>
          <RecordRedirect />
        </Suspense>
      } />
      
      <Route path="/list" element={
        <Suspense fallback={ bookReviews.length > 0 ? <RecordListSkeleton /> : null }>
          <RecordList />
        </Suspense>
      }>
        <Route path=":category" element={
          <Suspense fallback={ bookReviews.length > 0 ? <RecordListSkeleton /> : null }>
            <RecordListCat />
          </Suspense>
        } />
        <Route path="search" element={
          <Suspense>
            <RecordListSearch />
          </Suspense>
        } />
      </Route>
      
      <Route path="/record">
        <Route path=":id" element={
          <Suspense fallback={<RecordSkeleton />}>
            <RecordView />
          </Suspense>
        } />
        <Route path="write/:id" element={
          <Suspense fallback={<RecordSkeleton />}>
            <RecordWrite />
          </Suspense>
        } />
        <Route path="update/:id" element={
          <Suspense fallback={<RecordSkeleton />}>
            <RecordUpdate />
          </Suspense>
        } />
      </Route>

      <Route path="/statistics" element={
        <Suspense fallback={ readReviews.length > 0 ? <StatSkeleton /> : null }>
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
  )
};

export default AppRoutes;