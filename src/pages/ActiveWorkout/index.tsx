import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import { AudioProvider } from '../../context/audio';
import { RestTimerProvider } from '../../context/restTimer';
import { buttonStyle } from '../../components/SharedStyles';
import { useInterval } from '../../helpers/functions';
import Timer from './Timer';
import AlertConfirm from '../../components/AlertConfirm';
import BackLinkBanner from '../../components/BackLinkBanner';
import WorkoutHero from './WorkoutHero';
import FourZeroFour from '../../pages/FourZeroFour';
import { ActivityList } from './ActivityList';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  combineDataForAllExercises,
} from '../../helpers/functions';
import {
  SET_ACTIVE_WORKOUT,
  FINISH_WORKOUT,
  ONE_SECOND,
} from '../../helpers/constants';
import {useScrollPosition} from '../../context/useScrollPosition';

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

type Props = DispatchProps & StateProps;

const ActiveWorkout: React.FC<Props> = ({
  finishWorkout,
  entities,
  activeWorkout,
  setActiveWorkout,
  soundOn,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const [ showRestTimer, setShowRestTimer ] = useState(false);
  const [ count, setCount ] = useState(0);
  const [ restTime, setRestTime ] = useState(0);
  const { setActivityPageScrollPosition } = useScrollPosition();

  useInterval(() => {
    setCount(count + 1);
  }, showRestTimer ? ONE_SECOND : null);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(0);
  };
  // get the workout ID from the URL
  const { id: workoutId }: { id: string } = useParams();
  const workout = entities.workouts.byId[workoutId];

  if (!workout) {
    return <FourZeroFour />;
  }

  const workoutWithAllActivityData: Workout =
    combineDataForAllExercises(workout, entities.exercises);

  const workoutSetAsActive = activeWorkout && workoutId === activeWorkout.id;

  if (!workoutSetAsActive) {
    // if a workout is visited that is not currently the activeWorkout, set it
    setActiveWorkout(workoutWithAllActivityData);
  }

  const displayedWorkout = workoutSetAsActive
    ? activeWorkout
    : workoutWithAllActivityData;

  const finishWorkoutWithAlertTransition = () => {
    finishWorkout(activeWorkout);
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
        <WorkoutHero workout={displayedWorkout} />
        <ActivityList
          workout={displayedWorkout}
          finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
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

interface DispatchProps {
  finishWorkout: (w: Workout) => ReduxAction<{}>;
  setActiveWorkout: (workout: Workout) => ReduxAction<Workout>;
}

interface StateProps {
  activeWorkout: Workout;
  entities: Entities;
  soundOn: boolean;
}

const mapDispatchToProps: DispatchProps = {
  finishWorkout: (workout: Workout) => ({
    type: FINISH_WORKOUT,
    payload: workout,
  }),
  setActiveWorkout: (workout: Workout): ReduxAction<Workout> => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  entities: state.entities,
  soundOn: state.settings.soundOn,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
