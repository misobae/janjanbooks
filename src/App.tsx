import { useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import getMetaData from "./utils/metaData";

import Nav from "./components/layout/Nav";
import Toast from "./components/common/Toast";
import HeaderRenderer from "./components/layout/HeaderRenderer";

function App() {
  const { pathname } = useLocation();
  const { title, keywords, description } = getMetaData(pathname);

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

      <HeaderRenderer pathname={pathname} />

      <AppRoutes />

      {
        !location.pathname.includes('/record/write') &&
        !location.pathname.includes('/record/update') &&
        <Nav />
      }
    </HelmetProvider>
  );
};

export default App;