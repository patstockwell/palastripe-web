import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import AlertConfirm from '../components/AlertConfirm';
import ActiveExerciseTile from '../components/ActiveExerciseTile';
import { BackArrowWhite } from '../assets/SVGs';
import {
  orange,
  pink,
  ONE_DAY,
  ONE_SECOND,
  REST_PERIOD_IN_SECONDS,
} from '../helpers/constants';
import { workoutPropType } from '../helpers/data';
import { useInterval } from '../helpers/functions';

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 17px;
  height: 20px;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 0 15px 0 10px;
`;

const ActiveWorkout = ({ endWorkout, activeWorkout, animationStyles }) => {
  const [count, setCount] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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

  if (count === REST_PERIOD_IN_SECONDS || (!showRestTimer && count !== 0)) {
    resetTimer();
  }

  const showConfirmation = e => {
    e.preventDefault();
    setShowAlert(true);
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
            <BackArrowWhite /> Back
          </StyledLink>
          {showRestTimer && count > 0 && count}
          <StyledLink to="/home/" onClick={e => showConfirmation(e)}>
            Done
          </StyledLink>
        </Header>
        {exerciseTiles}
        <AlertConfirm
          setShowAlert={setShowAlert}
          endWorkout={() => endWorkout(activeWorkout)}
          showAlert={showAlert}
        />
      </BackSplash>
    </animated.div>
  );
};

ActiveWorkout.propTypes = {
  endWorkout: PropTypes.func,
  animationStyles: PropTypes.object,
  activeWorkout: PropTypes.shape(workoutPropType),
};

const mapStateToProps = state => ({
  activeWorkout: state.activeWorkout,
});

const mapDispatchToProps = {
  endWorkout: activeWorkout => ({
    type: 'END_WORKOUT',
    payload: { activeWorkout },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);

