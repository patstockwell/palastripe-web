import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import FourZeroFour from '../pages/FourZeroFour';
import BackSplash from '../components/BackSplash';
import ActivityListWithWindow from '../components/ActivityListWithWindow';
import {
  Entities, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const AnimatedSlidingPage = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

interface Props {
  animationStyles: any;
  entities: Entities;
  match: any;
}

const CurrentWorkout: React.FC<Props> = ({
  animationStyles,
  entities,
  match,
}) => {
  const { id }: { id: string } = match.params;
  const workout: Workout = entities.workouts.byId[id];
  if (!workout) {
    return <FourZeroFour />;
  }

  return (
    <AnimatedSlidingPage style={{
      ...animationStyles,
    }}>
      <BackSplash>
        <ActivityListWithWindow workout={workout} />
      </BackSplash>
    </AnimatedSlidingPage>
  );
};

const mapStateToProps = ({ entities }) => ({
  entities,
});

export default connect(mapStateToProps)(CurrentWorkout);
