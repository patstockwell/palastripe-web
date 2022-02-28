import React from 'react';
import styled from 'styled-components';
import {Route, Routes as Switch} from 'react-router-dom';

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
  return (
    <MaxWidthContainer>
      <ScrollPositionProvider>
        <AnimateNavigationProvider>
          <SelectedExerciseProvider>
            <RestTimerProvider>
              <ActivityFeedLengthProvider>
                <Switch>
                  <Route
                    index
                    element={<LandingSplash />}
                  />
                  <Route
                    path="install"
                    element={<Install />}
                  />
                  <Route
                    path="workouts"
                    element={<Workouts />}
                  />
                  <Route
                    path="activity"
                    element={<Activity />}
                  />
                  <Route
                    path="activity/:index"
                    element={<WorkoutSummary />}
                  />
                  <Route
                    path="workout-summary"
                    element={<WorkoutSummary />}
                  />
                  <Route
                    path="profile"
                    element={<Profile />}
                  />
                  <Route
                    path="profile/name"
                    element={<ProfileName />}
                  />
                  <Route
                    path="profile/audio"
                    element={<SettingAudio />}
                  />
                  <Route
                    path="profile/rest-timer"
                    element={<SettingUseRestTimer />}
                  />
                  <Route
                    path="profile/export"
                    element={<DataExport />}
                  />
                  <Route
                    path="profile/unit-of-measurement"
                    element={<SettingUnitOfMeasurement />}
                  />
                  <Route
                    path={`/workouts/${onTheFlyWorkoutId}/${activitySearchPath}`}
                    element={<ActivitySearch />}
                  />
                  <Route
                    path="workouts/:id"
                    element={<ActiveWorkout />}
                  />
                  <Route
                    path="workout-complete"
                    element={<WorkoutCompletionSplash />}
                  />
                  <Route
                    path="subscribe"
                    element={<Subscribe />}
                  />
                  <Route
                    element={<FourZeroFour />}
                  />
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
