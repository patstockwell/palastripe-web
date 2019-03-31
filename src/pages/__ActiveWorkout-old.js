import React, { useState } from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import Timer from '../components/Timer';
import AlertConfirm, { Button } from '../components/AlertConfirm';
import ActiveExerciseTile from '../components/ActiveExerciseTile';
import BannerForActiveWorkout from '../components/BannerForActiveWorkout';
import {
  purple,
  orange,
  pink,
  REMOVE_EXERCISE,
  DELAY_BEFORE_SHOWING_TIMER,
  ONE_SECOND,
  END_WORKOUT,
  DEFAULT_REST_PERIOD_IN_SECONDS,
} from '../helpers/constants';
import { useInterval } from '../helpers/functions';

const ActiveWorkout = ({
  removeExercise,
  endWorkout,
  activeWorkout,
  animationStyles,
}) => {
  // use a negative start number to simulate delay. Show the timer at zero
  const [count, setCount] = useState(-DELAY_BEFORE_SHOWING_TIMER);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restPeriod, setRestPeriod] = useState(DEFAULT_REST_PERIOD_IN_SECONDS);
  const [exerciseIdForRemoval, setExerciseIdForRemoval] = useState(undefined);
  useInterval(() => {
    setCount(count + 1);
  }, ONE_SECOND);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(-DELAY_BEFORE_SHOWING_TIMER);
  };

  const setTimer = (exerciseId, show = true) => {
    const rest =
      activeWorkout.exercises[exerciseId].restPeriodInSeconds
      || DEFAULT_REST_PERIOD_IN_SECONDS;

    setRestPeriod(rest);
    resetTimer();
    setShowRestTimer(show);
  };

  const { order, exercises } = activeWorkout;
  const exerciseTiles = order.map(id =>
    <ActiveExerciseTile
      key={exercises[id].name}
      setTimer={show => setTimer(id, show)}
      exercise={exercises[id]}
      setShowAlertRemove={setExerciseIdForRemoval}
    />
  );

  return (
    <animated.div style={{
      ...animationStyles,
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
    }}>
      <BackSplash topLeft={orange} bottomRight={pink}>
        <BannerForActiveWorkout endWorkout={() => endWorkout(activeWorkout)}/>
        {exerciseTiles}
        {showRestTimer && count >= 0 &&
          <Timer
            restPeriod={restPeriod}
            showRestTimer={showRestTimer}
            resetTimer={resetTimer}
            count={count}
          />
        }

        <AlertConfirm
          cancelAlert={() => setExerciseIdForRemoval(undefined)}
          showAlert={!!exerciseIdForRemoval}
          message={'Are you sure you want to remove this exercise?'}
        >
          <Button onClick={() => setExerciseIdForRemoval(undefined)} background={'grey'}>No</Button>
          <Button
            onClick={() => {
              removeExercise(exerciseIdForRemoval);
              setExerciseIdForRemoval(undefined);
            }}
            background={purple}
          >
            Yes
          </Button>
        </AlertConfirm>
      </BackSplash>
    </animated.div>
  );
};

const mapStateToProps = state => ({
  activeWorkout: state.activeWorkout,
});

const mapDispatchToProps = {
  removeExercise: exerciseId => ({
    type: REMOVE_EXERCISE,
    payload: { exerciseId },
  }),
  endWorkout: activeWorkout => ({
    type: END_WORKOUT,
    payload: { activeWorkout },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
