import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

import rootReducer from './reducers';
import { GlobalStyle } from './components/GlobalStyle';
import LocalStorageSetter from './components/LocalStorageSetter';
import Routes from './components/Routes';
import HeadTags from './components/HeadTags';

// this script will detect if the spec is natively supported and take action
// only when necessary.
smoothscroll.polyfill();

const store = createStore(rootReducer);

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
