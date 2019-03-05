import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import Timer from '../components/Timer';
import AlertConfirmEndWorkout from '../components/AlertConfirmEndWorkout';
import ActiveExerciseTile from '../components/ActiveExerciseTile';
import BackArrow from '../assets/svg/BackArrow';
import {
  bannerHeight,
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
import AlertConfirmRemoveExercise from '../components/AlertConfirmRemoveExercise';

const StyledLink = styled(Link)`
  color: grey;
  text-decoration: none;
  font-size: 17px;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${bannerHeight}px;
  background-color: white;
  border-bottom: solid 0.5px grey;
`;

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
    setRestPeriod(activeWorkout.exercises[exerciseId].restPeriodInSeconds);
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
        <Header>
          <StyledLink to="/home/">
            <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
            <BackArrow style={{ fill: 'grey' }} /> Back
          </StyledLink>
          <StyledLink to="/home/" onClick={e => showConfirmation(e)}>
            Done
          </StyledLink>
        </Header>
        {exerciseTiles}
        {showRestTimer && count >= 0 &&
          <Timer
            restPeriod={restPeriod}
            showRestTimer={showRestTimer}
            resetTimer={resetTimer}
            count={count}
          />
        }
        <AlertConfirmEndWorkout
          continueWorkout={() => setShowAlertEndWorkout(false)}
          endWorkout={() => endWorkout(activeWorkout)}
          showAlert={showAlertEndWorkout}
        />
        <AlertConfirmRemoveExercise
          removeExercise={() => removeExercise(exerciseIdForRemoval)}
          cancelRemove={() => setExerciseIdForRemoval(undefined)}
          showAlert={!!exerciseIdForRemoval}
        />
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

