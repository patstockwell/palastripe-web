import React from 'react';
import styled from 'styled-components';
import { useLocation, Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import Profile from '../pages/Profile';
import HistorySummary from '../pages/HistorySummary';
import ProfileName from '../pages/ProfileName';
import SettingAudio from '../pages/SettingAudio';
import SettingUnitOfMeasurement from '../pages/SettingUnitOfMeasurement';
import { appMaxWidth } from '../helpers/constants';
import ScrollToTop from './ScrollToTop';
import WorkoutSummary from '../pages/WorkoutSummary';

const MaxWidthContainer = styled.div`
  max-width: ${appMaxWidth}px;
  margin: 0 auto;
`;

const Routes: React.FC<{}> = () => {
  const location = useLocation();

  return (
    <MaxWidthContainer>
      <ScrollToTop pathname={location.pathname} />
      <Switch location={location}>
        <Route path="/" exact component={Workouts} />
        <Route path="/workouts/" exact component={Workouts} />
        <Route path="/activity/" exact component={Activity} />
        <Route path="/activity/:index/" component={HistorySummary} />
        <Route path="/profile/" exact component={Profile} />
        <Route path="/profile/name" component={ProfileName} />
        <Route path="/profile/audio" component={SettingAudio} />
        <Route path="/profile/unit-of-measurement" component={SettingUnitOfMeasurement} />
        <Route path="/edit-workout/" component={EditWorkout} />
        <Route path="/workouts/:id/" component={ActiveWorkout} />
        <Route path="/workout-summary/" component={WorkoutSummary} />
        <Route component={FourZeroFour} />
      </Switch>
    </MaxWidthContainer>
  );
};

export default Routes;
