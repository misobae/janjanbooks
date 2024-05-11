import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import getMetaData from "./utils/metaData";

import Home from "./pages/Home";
import Nav from "./components/layout/Nav";
import Toast from "./components/common/Toast";

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