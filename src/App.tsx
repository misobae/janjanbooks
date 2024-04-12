import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecordView from "./pages/RecordView";
import RecordList from "./pages/RecordList";
import RecordWrite from "./pages/RecordWrite";
import RecordUpdate from "./pages/RecordUpdate";
import Statistics from "./pages/Statistics";
import Search from "./pages/Search";
import RecordSearch from "./pages/RecordSearch";
import Toast from "./components/common/Toast";

function App() {
  const location = useLocation();

  return (
    <>
      <Toast />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={ <Home /> } />
        <Route path="/record" element={ <RecordList /> } />
        <Route path="/record/:id" element={ <RecordView /> } />
        <Route path="/record/write/:id" element={ <RecordWrite /> } />
        <Route path="/record/update/:id" element={ <RecordUpdate /> } />
        <Route path="/record/search" element={ <RecordSearch /> } />
        <Route path="/statistics" element={ <Statistics /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  );
};

export default App;