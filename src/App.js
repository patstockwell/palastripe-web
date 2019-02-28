import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Helmet from 'react-helmet';

import rootReducer from './reducers';
import { GlobalStyle } from './components/GlobalStyle';
import WorkoutPlans from './pages/WorkoutPlans';
import Home from './pages/Home/';
import Me from './pages/Me';
import FourZeroFour from './pages/FourZeroFour';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <Helmet title="You Are Doing Great" />
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home/" component={Home} />
        <Route path="/workout-plans/" component={WorkoutPlans} />
        <Route path="/me/" component={Me} />
        <Route component={FourZeroFour} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
