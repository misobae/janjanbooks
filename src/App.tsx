import { useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import getMetaData from "./utils/metaData";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecordView from "./pages/RecordView";
import RecordList from "./pages/RecordList";
import RecordListCat from "./pages/RecordListCat";
import RecordWrite from "./pages/RecordWrite";
import RecordUpdate from "./pages/RecordUpdate";
import Statistics from "./pages/Statistics";
import Search from "./pages/Search";
import RecordSearch from "./pages/RecordSearch";
import RecordRedirect from "./utils/recordRedirect";

import Toast from "./components/common/Toast";
import Nav from "./components/layout/Nav";

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
        <Route path="/list" element={<RecordRedirect />} />
        <Route path="/list" element={<RecordList />} >
          <Route path=":category" element={<RecordListCat />} />
        </Route>
        <Route path="/list/search" element={ <RecordSearch /> } />
        <Route path="/record/:id" element={ <RecordView /> } />
        <Route path="/record/write/:id" element={ <RecordWrite /> } />
        <Route path="/record/update/:id" element={ <RecordUpdate /> } />
        <Route path="/statistics" element={ <Statistics /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/*" element={ <NotFound /> } />
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