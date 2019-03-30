import React from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import { Workout } from '../helpers/types';

interface Props {
  animationStyles: any;
  activeWorkout: Workout;
}

const CurrentWorkout: React.FC<Props> = ({ animationStyles, activeWorkout }) => {
  console.log('activeWorkout: ', activeWorkout);

  return (
    <animated.div style={{
      ...animationStyles,
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
    }}>
      <BackSplash>
        <h1>new active workout</h1>
      </BackSplash>
    </animated.div>
  );
};

const mapStateToProps = ({ activeWorkout }) => ({
  activeWorkout,
});

export default connect(mapStateToProps)(CurrentWorkout);
