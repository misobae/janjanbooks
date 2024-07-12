import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bookReviewState } from "../recoil/review";

import Home from "../pages/Home/Home";

import ListSkeleton from "../components/record/ListSkeleton";
import RecordSkeleton from "../components/record/RecordSkeleton";
import StatSkeleton from "../components/statistics/StatSkeleton";

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const RecordView = lazy(() => import('../pages/RecordView'));
const RecordList = lazy(() => import('../pages/RecordList'));
const RecordRedirect = lazy(() => import('./RecordRedirect'));
const RecordListCat = lazy(() => import('../pages/RecordListCat'));
const RecordWrite = lazy(() => import('../pages/RecordWrite'));
const RecordUpdate = lazy(() => import('../pages/RecordUpdate'));
const Statistics = lazy(() => import('../pages/Statistics'));
const Search = lazy(() => import('../pages/Search'));
const RecordSearch = lazy(() => import('../pages/RecordSearch'));

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
        <Suspense fallback={ bookReviews.length > 0 ? <ListSkeleton /> : null }>
          <RecordList />
        </Suspense>
      }>
        <Route path=":category" element={
          <Suspense fallback={ bookReviews.length > 0 ? <ListSkeleton /> : null }>
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
        <Suspense fallback={ <RecordSkeleton /> }>
          <RecordView />
        </Suspense>
      } />
      <Route path="/record/write/:id" element={ 
        <Suspense fallback={ <RecordSkeleton /> }>
          <RecordWrite />
        </Suspense>
      } />
      <Route path="/record/update/:id" element={
        <Suspense fallback={ <RecordSkeleton /> }>
          <RecordUpdate />
        </Suspense>
      } />
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