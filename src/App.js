import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import rootReducer from './reducers';
import { GlobalStyle } from './components/GlobalStyle';
import WorkoutPlans from './pages/WorkoutPlans';
import Home from './pages/Home/';
import About from './pages/About';
import Users from './pages/Users';
import FourZeroFour from './pages/FourZeroFour';

const TabWindow = styled.div`
  overflow-x: hidden;
`;

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <Router>
      <TabWindow>
        <Helmet title="You Are Doing Great" />
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home/" component={Home} />
          <Route path="/workout-plans/" component={WorkoutPlans} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route component={FourZeroFour} />
        </Switch>
      </TabWindow>
    </Router>
  </Provider>
);

export default App;
