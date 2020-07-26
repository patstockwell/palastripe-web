import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Route, Switch } from 'react-router-dom';
import Analytics from 'react-ga';

import { LandingSplash } from '../pages/LandingSplash';
import { Workouts } from '../pages/Workouts';
import { Install } from '../pages/Install';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import { Profile } from '../pages/Profile';
import { WorkoutSummary } from '../pages/WorkoutSummary';
import ProfileName from '../pages/ProfileName';
import SettingAudio from '../pages/SettingAudio';
import { DataExport } from '../pages/DataExport';
import { Subscribe } from '../pages/Subscribe';
import SettingUnitOfMeasurement from '../pages/SettingUnitOfMeasurement';
import { appMaxWidth } from '../helpers/constants';
import { WorkoutCompletionSplash } from '../pages/WorkoutCompletionSplash';
import { AnimateNavigationProvider } from '../context/useAnimateNavigation';
import { ScrollPositionProvider } from '../context/useScrollPosition';
import { SelectedExerciseProvider } from '../context/useSelectedExercise';
import { ActivityHistoryLengthProvider } from '../context/useActivityHistoryLength';
import { activitySearchPath, ActivitySearch } from '../pages/ActiveWorkout/ActivitySearch';
import { customWorkoutId } from '../workoutData/workouts/customWorkout';

const MaxWidthContainer = styled.div`
  max-width: ${appMaxWidth}px;
  margin: 0 auto;
`;

const Routes: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Analytics.set({ page: pathname }); // sets custom dimensions
      Analytics.pageview(pathname);
    }
  }, [pathname]);

  return (
    <MaxWidthContainer>
      <ScrollPositionProvider>
        <AnimateNavigationProvider>
          <SelectedExerciseProvider>
            <ActivityHistoryLengthProvider>
              <Switch location={location}>
                <Route path="/" exact component={LandingSplash} />
                <Route path="/install/" exact component={Install} />
                <Route path="/workouts/" exact component={Workouts} />
                <Route path="/activity/" exact component={Activity} />
                <Route path="/activity/:index/" component={WorkoutSummary} />
                <Route path="/profile/" exact component={Profile} />
                <Route path="/profile/name" component={ProfileName} />
                <Route path="/profile/audio" component={SettingAudio} />
                <Route path="/profile/export" component={DataExport} />
                <Route path="/profile/unit-of-measurement" component={SettingUnitOfMeasurement} />
                <Route path="/edit-workout/" component={EditWorkout} />
                <Route path={`/workouts/${customWorkoutId}/${activitySearchPath}`} component={ActivitySearch} />
                <Route path="/workouts/:id/" component={ActiveWorkout} />
                <Route path="/workout-complete/" component={WorkoutCompletionSplash} />
                <Route path="/subscribe/" component={Subscribe} />
                <Route component={FourZeroFour} />
              </Switch>
            </ActivityHistoryLengthProvider>
          </SelectedExerciseProvider>
        </AnimateNavigationProvider>
      </ScrollPositionProvider>
    </MaxWidthContainer>
  );
};

export default Routes;
