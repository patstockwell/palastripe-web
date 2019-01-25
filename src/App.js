import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import WorkoutPlans from './tabs/WorkoutPlans'
import Navigation from './components/Navigation'

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/workout-plans/" component={WorkoutPlans} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Navigation />
    </div>
  </Router>
);

export default App;
