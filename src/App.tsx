import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecordView from "./pages/RecordView";
import RecordList from "./pages/RecordList";
import RecordWrite from "./pages/RecordWrite";
import Statistics from "./pages/Statistics";
import Result from "./pages/Result";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={ <Home /> } />
      <Route path="/recordView" element={ <RecordView /> } />
      <Route path="/recordList" element={ <RecordList /> } />
      <Route path="/recordWrite" element={ <RecordWrite /> } />
      <Route path="/statistics" element={ <Statistics /> } />
      <Route path="/result" element={ <Result /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
};

export default App;