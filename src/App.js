import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { GlobalStyle } from './components/GlobalStyle';
import WorkoutPlans from './pages/WorkoutPlans';
import Home from './pages/Home/';
import About from './pages/About';
import Users from './pages/Users';
import FourZeroFour from './pages/FourZeroFour';

const Landing = () => <Link to="/home">Get started</Link>

const TabWindow = styled.div`
  overflow-x: hidden;
`

const App = () => (
  <Router>
    <TabWindow>
      <Helmet title="You Are Doing Great" />
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/workout-plans/" component={WorkoutPlans} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route component={FourZeroFour} />
      </Switch>
    </TabWindow>
  </Router>
);

export default App;
