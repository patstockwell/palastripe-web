import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import Timer from '../components/Timer';
import AlertConfirm, { Button, LinkButton } from '../components/AlertConfirm';
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
import { workoutPropType } from '../helpers/data';
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
  const [showAlertEndWorkout, setShowAlertEndWorkout] = useState(false);
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

  const showConfirmation = e => {
    e.preventDefault();
    setShowAlertEndWorkout(true);
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
        <BannerForActiveWorkout showConfirmation={showConfirmation} />
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
          cancelAlert={() => setShowAlertEndWorkout(false)}
          showAlert={showAlertEndWorkout}
          message={'Are you sure you want to finish this workout?'}
        >
          <Button onClick={() => setShowAlertEndWorkout(false)} background={'grey'}>No</Button>
          <LinkButton to="/home/" onClick={() => endWorkout(activeWorkout)} background={purple} >
            <span>Yes</span>
          </LinkButton>
        </AlertConfirm>

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

ActiveWorkout.propTypes = {
  endWorkout: PropTypes.func,
  removeExercise: PropTypes.func,
  animationStyles: PropTypes.object,
  activeWorkout: PropTypes.shape(workoutPropType),
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

