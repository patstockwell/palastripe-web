import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Workouts from './tabs/Workouts'
import Navigation from './components/Navigation'

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Workouts} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Navigation />
    </div>
  </Router>
);

export default App;
