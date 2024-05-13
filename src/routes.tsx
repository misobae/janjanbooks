import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import ListSkeleton from "./components/record/ListSkeleton";
import RecordSkeleton from "./components/record/RecordSkeleton";
import StatSkeleton from "./components/statistics/StatSkeleton";

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

const AppRoutes = () => (
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={ <Home /> } />
    <Route path="/list" element={
      <Suspense>
        <RecordRedirect />
      </Suspense>
    } />
    <Route path="/list" element={
      <Suspense fallback={ <ListSkeleton /> }>
        <RecordList />
      </Suspense>
    }>
      <Route path=":category" element={
        <Suspense fallback={ <ListSkeleton /> }>
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
      <Suspense fallback={ <StatSkeleton /> }>
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
);

export default AppRoutes;