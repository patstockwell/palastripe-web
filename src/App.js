import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Helmet from 'react-helmet';

import { GlobalStyle } from './components/GlobalStyle';
import WorkoutPlans from './pages/WorkoutPlans';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import ActiveWorkoutOverview from './pages/ActiveWorkoutOverview';

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
        <Route
          path="/active-workout-overview/"
          component={ActiveWorkoutOverview}
        />
        <Route component={FourZeroFour} />
      </Switch>
    </div>
  </Router>
);

export default App;
