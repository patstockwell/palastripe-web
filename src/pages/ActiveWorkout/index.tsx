import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Analytics from 'react-ga';

import { AudioProvider } from '../../context/useAudio';
import { RestTimerProvider } from '../../context/useRestTimer';
import { buttonStyle } from '../../components/SharedStyles';
import { useInterval } from '../../helpers/functions';
import Timer from './Timer';
import AlertConfirm from '../../components/AlertConfirm';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import WorkoutHero, { Window as CustomWorkoutHero } from './WorkoutHero';
import FourZeroFour from '../../pages/FourZeroFour';
import { ActivityList } from './ActivityList';
import { State } from '../../helpers/types';
import { ONE_SECOND } from '../../helpers/constants';
import { useScrollPosition } from '../../context/useScrollPosition';
import { useAddWorkoutToHistory } from '../../reducers/historyReducer';
import {
  Workout,
  Workouts,
  useUpdateWorkout,
} from '../../reducers/workoutsReducer';
import { useActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { customWorkoutId } from '../../workoutData/workouts/customWorkout';

const Button = styled.button<{ background?: string }>`
  ${buttonStyle}
`;

const LinkButton = styled(Link)<{ background?: string; fontColour?: string; }>`
  ${buttonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

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
    Analytics.event({
      category: 'Workout',
      action: 'Completed workout',
      label: displayedWorkout.name,
    });
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
          <Timer
            restPeriod={restTime}
            resetTimer={resetTimer}
            count={count - 1}
          />
        }

        <AlertConfirm
          cancelAlert={() => setShowEndWorkoutAlert(false)}
          showAlert={showEndWorkoutAlert}
          message={'Are you sure you want to finish the workout?'}
        >
          <Button
            onClick={() => setShowEndWorkoutAlert(false)}
            background={'grey'}>No</Button>
          <LinkButton
            to="/workout-complete/"
            onClick={finishWorkoutWithAlertTransition}
          >Yes</LinkButton>
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
