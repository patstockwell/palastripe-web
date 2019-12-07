import React from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import Profile from '../pages/Profile';
import WorkoutSummary from '../pages/WorkoutSummary';
import ProfileName from '../pages/ProfileName';
import SettingAudio from '../pages/SettingAudio';
import SettingUnitOfMeasurement from '../pages/SettingUnitOfMeasurement';

const Routes: React.FC<{}> = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Switch location={location}>
        <Route path="/" exact component={Workouts} />
        <Route path="/workouts/" exact component={Workouts} />
        <Route path="/activity/" exact component={Activity} />
        <Route path="/activity/:index/" component={WorkoutSummary} />
        <Route path="/profile/" exact component={Profile} />
        <Route path="/profile/name" component={ProfileName} />
        <Route path="/profile/audio" component={SettingAudio} />
        <Route path="/profile/unit-of-measurement" component={SettingUnitOfMeasurement} />
        <Route path="/edit-workout/" component={EditWorkout} />
        <Route path="/workouts/:id/" component={ActiveWorkout} />
        <Route component={FourZeroFour} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
