import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AudioProvider } from '../../context/useAudio';
import { RestTimerProvider } from '../../context/useRestTimer';
import { useInterval } from '../../helpers/functions';
import { RestTimer } from './RestTimer';
import {
  ConfirmButtonLink,
  ConfirmButton,
  AlertConfirm,
} from '../../components/AlertConfirm';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { WorkoutHero, Window as CustomWorkoutHero } from './WorkoutHero';
import { FourZeroFour } from '../../pages/FourZeroFour';
import { ActivityList } from './ActivityList';
import { State } from '../../helpers/types';
import { ONE_SECOND, lightGrey2, charcoal } from '../../helpers/constants';
import { useScrollPosition } from '../../context/useScrollPosition';
import { useAddWorkoutToHistory } from '../../reducers/historyReducer';
import {
  Workout,
  Workouts,
  useUpdateWorkout,
} from '../../reducers/workoutsReducer';
import { useActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { customWorkoutId } from '../../workoutData/workouts/customWorkout';

const ActiveWorkout: React.FC<StateProps> = ({
  workouts,
  activeWorkout,
  soundOn,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const [ showRestTimer, setShowRestTimer ] = useState(false);
  const [ count, setCount ] = useState(0);
  const [ restTime, setRestTime ] = useState(0);
  const { setActivityPageScrollPosition } = useScrollPosition();
  const addToHistory = useAddWorkoutToHistory();
  const updateWorkoutTemplate = useUpdateWorkout();
  const { finishWorkout, setActiveWorkout } = useActiveWorkout();

  useInterval(() => {
    setCount(count + 1);
  }, showRestTimer ? ONE_SECOND : null);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(0);
  };
  // get the workout ID from the URL
  const { id: workoutId }: { id: string } = useParams();
  const isCustomWorkout = workoutId === customWorkoutId;
  const workoutFromUrl = workouts.byId[workoutId];

  if (!workoutFromUrl) {
    return <FourZeroFour />;
  }

  const workoutSetAsActive = activeWorkout && workoutId === activeWorkout.id;

  if (!workoutSetAsActive) {
    // if a workout is visited that is not currently the activeWorkout, set it
    setActiveWorkout(workoutFromUrl);
  }

  const displayedWorkout = workoutSetAsActive
    ? activeWorkout
    : workoutFromUrl;

  const finishWorkoutWithAlertTransition = () => {
    finishWorkout(); // activeWorkoutReducer
    addToHistory(activeWorkout); // historyReducer
    updateWorkoutTemplate(activeWorkout); // workoutsReducer
    setShowEndWorkoutAlert(false);
    setActivityPageScrollPosition(0);
  };

  return (
    <AudioProvider soundOn={soundOn}>
      <RestTimerProvider value={{
        setShowTimer: setShowRestTimer,
        setRestTime,
        setCount,
      }} >
        <BackLinkBanner
          sticky={false}
          back={{
            showArrows: true,
            link: '/workouts/',
          }}
        />
        {isCustomWorkout ? (
          <CustomWorkoutHero imageUrl={displayedWorkout.imageUrl}/>
        ) : (
          <WorkoutHero workout={displayedWorkout} />
        )}
        <ActivityList
          workout={displayedWorkout}
          finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
          isCustomWorkout={isCustomWorkout}
        />

        {showRestTimer && count > 0 && restTime >= 0 &&
          <RestTimer
            restPeriod={restTime}
            resetTimer={resetTimer}
            count={count - 1}
          />
        }

        <AlertConfirm
          cancelAlert={() => setShowEndWorkoutAlert(false)}
          showAlert={showEndWorkoutAlert}
          messageText="This will end your workout and save it to activity history."
        >
          <ConfirmButtonLink
            to="/workout-complete/"
            onClick={finishWorkoutWithAlertTransition}
          >Finish workout</ConfirmButtonLink>
          <ConfirmButton
            onClick={() => setShowEndWorkoutAlert(false)}
            background={lightGrey2}
            fontColour={charcoal}
          >Cancel</ConfirmButton>
        </AlertConfirm>
      </RestTimerProvider>
    </AudioProvider>
  );
};

interface StateProps {
  activeWorkout: Workout;
  workouts: Workouts;
  soundOn: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  workouts: state.workouts,
  soundOn: state.settings.soundOn,
});

export default connect<StateProps, {}, {}>(
  mapStateToProps,
)(ActiveWorkout);
