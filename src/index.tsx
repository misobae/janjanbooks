import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './tailwind.css';
import ScrollToTop from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);