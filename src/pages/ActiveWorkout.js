import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring';
import BackSplash from '../components/BackSplash';
import ActiveExercise from '../components/ActiveExercise';
import BackArrow from '../components/BackArrow';
import { orange, pink, ONE_DAY, ONE_SECOND } from '../helpers/constants';
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
  useInterval(() => {
    setCount(count + 1);
  }, showRestTimer ? ONE_SECOND : ONE_DAY);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(0);
  };

  const setTimer = (show = true) => {
    resetTimer();
    setTimeout(() => setShowRestTimer(show), 1000);
  };

  if (count === 6 || (!showRestTimer && count !== 0)) {
    resetTimer();
  }

  const exercises = activeWorkout.exercises.map((exercise, i) =>
    <ActiveExercise
      key={exercise.name}
      exerciseIndex={i}
      setTimer={setTimer}
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
          <StyledLink to="/home">
            <BackArrow /> Back
          </StyledLink>
          {showRestTimer && count > 0 && count}
          <StyledLink to="/home" onClick={endWorkout}>
            Done
          </StyledLink>
        </Header>
        {exercises}
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
  endWorkout: () => ({ type: 'END_WORKOUT'}),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);

