import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
// import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import LiveChat from './utils/LiveChat';

import './index.css';
import GlobalStyles from './theme/globalStyles';
import { useAuth } from './hooks/useAuth';
// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();
  const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  ReactGA.initialize(TRACKING_ID);
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Toaster />
      <ScrollToTop />
      {isInitialized ? (
        <Router />
      ) : (
        <Backdrop open sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <LiveChat />
    </ThemeProvider>
  );
}
