// scroll bar
import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
//
import 'swiper/swiper.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/JWTContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { store, persistor } from './redux/store';
// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <CollapseDrawerProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CollapseDrawerProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>,
  document.getElementById('website-body')
);

// If you want to enable client cache, register instead.
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
