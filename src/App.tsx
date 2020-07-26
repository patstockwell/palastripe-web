import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import rootReducer from './reducers';
import { GlobalStyle } from './components/GlobalStyle';
import LocalStorageSetter from './components/LocalStorageSetter';
import Routes from './components/Routes';
import HeadTags from './components/HeadTags';

// polyfills
import 'core-js/stable';
import 'intersection-observer';
import smoothscroll from 'smoothscroll-polyfill';
// this script will detect if the spec is natively supported and take action
// only when necessary.
smoothscroll.polyfill();

// Redux
const store = configureStore({
  reducer: rootReducer,
});

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <LocalStorageSetter />
    <HeadTags />
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
