import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Helmet from 'react-helmet';

import { GlobalStyle } from './components/GlobalStyle';
import WorkoutPlans from './tabs/WorkoutPlans';
import Home from './tabs/Home';
import About from './tabs/About';
import Users from './tabs/Users';

const FourZeroFour = () => <h2>404</h2>;
const Header = () => <h1>Harder Better Faster Fitter</h1>

const App = () => (
  <Router>
    <div>
      <Helmet title="You Are Doing Great" />
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/workout-plans/" component={WorkoutPlans} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route component={FourZeroFour} />
      </Switch>
    </div>
  </Router>
);

export default App;
