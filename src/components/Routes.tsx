import React from 'react';
import styled from 'styled-components';
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
import { appMaxWidth } from '../helpers/constants';

const MaxWidthContainer = styled.div`
  max-width: ${appMaxWidth}px;
  margin: 0 auto;
`;

const Routes: React.FC<{}> = () => {
  const location = useLocation();

  return (
    <MaxWidthContainer>
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
    </MaxWidthContainer>
  );
};

export default Routes;
