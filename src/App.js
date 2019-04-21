import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import rootReducer from './reducers';
import { GlobalStyle } from './components/GlobalStyle';
import LocalStorageSetter from './components/LocalStorageSetter';
import Routes from './components/Routes';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <LocalStorageSetter />
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
