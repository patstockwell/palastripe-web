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
  ONE_DAY,
  ONE_SECOND,
  END_WORKOUT,
  SET_LOCAL_STORAGE,
} from '../helpers/constants';
import { workoutPropType } from '../helpers/data';
import { useInterval } from '../helpers/functions';

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
  setLocalStorage,
  endWorkout,
  activeWorkout,
  animationStyles,
}) => {
  const [count, setCount] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showAlertEnd, setShowAlertEnd] = useState(false);
  useInterval(() => {
    setCount(count + 1);
  }, showRestTimer ? ONE_SECOND : ONE_DAY);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(0);
  };

  const setTimer = (show = true) => {
    resetTimer();
    setTimeout(() => setShowRestTimer(show), 400);
  };
  // (!showRestTimer && count !== 0)
  const showConfirmation = e => {
    e.preventDefault();
    setShowAlertEnd(true);
  };

  const callEndWorkoutActions = () => {
    endWorkout(activeWorkout);
    setLocalStorage();
  };

  const { order, exercises } = activeWorkout;
  const exerciseTiles = order.map(id =>
    <ActiveExerciseTile
      key={exercises[id].name}
      setTimer={setTimer}
      exercise={exercises[id]}
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
        {showRestTimer && count > 0 &&
          <Timer
            showRestTimer={showRestTimer}
            resetTimer={resetTimer}
            count={count - 1} // minus one second for the animation
          />
        }
        <AlertConfirmEndWorkout
          setShowAlert={setShowAlertEnd}
          endWorkout={() => callEndWorkoutActions()}
          showAlert={showAlertEnd}
        />
      </BackSplash>
    </animated.div>
  );
};

ActiveWorkout.propTypes = {
  endWorkout: PropTypes.func,
  setLocalStorage: PropTypes.func,
  animationStyles: PropTypes.object,
  activeWorkout: PropTypes.shape(workoutPropType),
};

const mapStateToProps = state => ({
  activeWorkout: state.activeWorkout,
});

const mapDispatchToProps = {
  setLocalStorage: () => ({
    type: SET_LOCAL_STORAGE,
  }),
  endWorkout: activeWorkout => ({
    type: END_WORKOUT,
    payload: { activeWorkout },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);

