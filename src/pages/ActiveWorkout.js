import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring';
import BackSplash from '../components/BackSplash';
import ActiveExercise from '../components/ActiveExercise';
import BackArrow from '../components/BackArrow';
import { orange, pink } from '../helpers/constants';
import { workoutPropType } from '../helpers/data';

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

const ActiveWorkout = ({ activeWorkout, animationStyles }) => {
  const exercises = activeWorkout.data.map(exercise =>
    <ActiveExercise key={exercise.name} exercise={exercise} />
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
          <StyledLink to="/home">
            Done
          </StyledLink>
        </Header>
        {exercises}
      </BackSplash>
    </animated.div>
  );
};

ActiveWorkout.propTypes = {
  animationStyles: PropTypes.object,
  activeWorkout: PropTypes.shape(workoutPropType),
};

const mapStateToProps = state => ({
  activeWorkout: state.activeWorkout,
});

export default connect(mapStateToProps)(ActiveWorkout);

