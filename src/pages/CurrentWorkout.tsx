import React from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import ActivityListWithWindow from '../components/ActivityListWithWindow';
import { Entities, Workout } from '../helpers/types';

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
    // TODO: move all the workout tile stuff into another component that
    // knows how to handle a URL that doesn't point to a workout
    return null;
  }

  return (
    <animated.div style={{
      ...animationStyles,
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      overflowY: 'scroll',
    }}>
      <BackSplash>
        <ActivityListWithWindow entities={entities} workout={workout} />
      </BackSplash>
    </animated.div>
  );
};

const mapStateToProps = ({ entities }) => ({
  entities,
});

export default connect(mapStateToProps)(CurrentWorkout);
