import React from 'react';
import styled from 'styled-components';
import {useLocation, Route, Switch} from 'react-router-dom';

import {LandingSplash} from '../pages/LandingSplash';
import {Workouts} from '../pages/Workouts';
import {Install} from '../pages/Install';
import {ActiveWorkout} from '../pages/ActiveWorkout';
import {Activity} from '../pages/Activity';
import {FourZeroFour} from '../pages/FourZeroFour';
import {Profile} from '../pages/Profile';
import {WorkoutSummary} from '../pages/WorkoutSummary';
import {ProfileName} from '../pages/ProfileName';
import {DataExport} from '../pages/DataExport';
import {Subscribe} from '../pages/Subscribe';
import {SettingUnitOfMeasurement} from '../pages/SettingUnitOfMeasurement';
import {SettingAudio} from '../pages/SettingAudio';
import {SettingUseRestTimer} from '../pages/SettingUseRestTimer';
import {appMaxWidth} from '../helpers/constants';
import {WorkoutCompletionSplash} from '../pages/WorkoutCompletionSplash';
import {AnimateNavigationProvider} from '../context/useAnimateNavigation';
import {ScrollPositionProvider} from '../context/useScrollPosition';
import {SelectedExerciseProvider} from '../context/useSelectedExercise';
import {ActivityFeedLengthProvider} from '../context/useActivityFeedLength';
import {activitySearchPath, ActivitySearch} from '../pages/ActiveWorkout/ActivitySearch';
import {onTheFlyWorkoutId} from '../workoutData/workouts/onTheFly';
import {RestTimerProvider} from '../context/useRestTimer';

const MaxWidthContainer = styled.div`
  max-width: ${appMaxWidth}px;
  margin: 0 auto;
`;

const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <MaxWidthContainer>
      <ScrollPositionProvider>
        <AnimateNavigationProvider>
          <SelectedExerciseProvider>
            <RestTimerProvider>
              <ActivityFeedLengthProvider>
                <Switch location={location}>
                  <Route path="/" exact>
                    <LandingSplash />
                  </Route>
                  <Route path="/install/" exact>
                    <Install />
                  </Route>
                  <Route path="/workouts/" exact>
                    <Workouts />
                  </Route>
                  <Route path="/activity/" exact>
                    <Activity />
                  </Route>
                  <Route path="/activity/:index/">
                    <WorkoutSummary />
                  </Route>
                  <Route path="/workout-summary/">
                    <WorkoutSummary />
                  </Route>
                  <Route path="/profile/" exact>
                    <Profile />
                  </Route>
                  <Route path="/profile/name/">
                    <ProfileName />
                  </Route>
                  <Route path="/profile/audio/">
                    <SettingAudio />
                  </Route>
                  <Route path="/profile/rest-timer/">
                    <SettingUseRestTimer />
                  </Route>
                  <Route path="/profile/export/">
                    <DataExport />
                  </Route>
                  <Route path="/profile/unit-of-measurement/">
                    <SettingUnitOfMeasurement />
                  </Route>
                  <Route path={`/workouts/${onTheFlyWorkoutId}/${activitySearchPath}`}>
                    <ActivitySearch />
                  </Route>
                  <Route path="/workouts/:id/">
                    <ActiveWorkout />
                  </Route>
                  <Route path="/workout-complete/">
                    <WorkoutCompletionSplash />
                  </Route>
                  <Route path="/subscribe/">
                    <Subscribe />
                  </Route>
                  <Route>
                    <FourZeroFour />
                  </Route>
                </Switch>
              </ActivityFeedLengthProvider>
            </RestTimerProvider>
          </SelectedExerciseProvider>
        </AnimateNavigationProvider>
      </ScrollPositionProvider>
    </MaxWidthContainer>
  );
};

export default Routes;
