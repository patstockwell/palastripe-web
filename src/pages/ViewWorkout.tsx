import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router';
import FourZeroFour from '../pages/FourZeroFour';
import BackLinkBanner from '../components/BackLinkBanner';
import ViewWorkoutHero from '../components/ViewWorkoutHero';
import ActivityList from '../components/ActivityList';
import { AnimatedSlidingPage } from './ActiveWorkout';
import { combineDataForAllExercises } from '../helpers/functions';
import { bannerHeight } from '../helpers/constants';
import {
  calculateWorkoutTime,
  formatMinutes,
} from '../helpers/functions';
import {
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  SET_ACTIVE_WORKOUT,
} from '../helpers/constants';

interface OwnProps {
  animationStyles: any;
  entities: Entities;
}

type Props = OwnProps & StateProps & DispatchProps & RouteProps;

const ViewWorkout: React.FC<Props> = ({
  animationStyles,
  entities,
  match,
  setActiveWorkout,
}) => {
  // direction of the animation when page enters/leaves
  const [ direction, setDirection ] = useState('left');
  const { id }: { id: string } = match.params;
  const workout: Workout = entities.workouts.byId[id];
  if (!workout) {
    return <FourZeroFour />;
  }

  const workoutWithAllActivityData: Workout =
    combineDataForAllExercises(workout, entities.exercises);

  const handleStartClick = () => {
    setActiveWorkout(workoutWithAllActivityData);
    setDirection('right');
  };

  return (
    <AnimatedSlidingPage
      style={{
        position: animationStyles.position,
        [direction]: animationStyles.left,
      }}
    >
      <BackLinkBanner
        back={{ link: '/workouts/' }}
        continueTo={{
          link: '/active-workout/',
          text: 'Start',
          handleClick: handleStartClick,
        }}
      />
      <ViewWorkoutHero
        name={workout.name}
        imageUrl={workout.imageUrl}
        time={formatMinutes(calculateWorkoutTime(workout))}
      />
      <ActivityList
        stickyTop={bannerHeight}
        workout={workoutWithAllActivityData}
        startWorkoutClickHandler={handleStartClick}
        readOnly
      />
    </AnimatedSlidingPage>
  );
};

interface StateProps {
  entities: Entities;
}

const mapStateToProps = ({ entities }) => ({
  entities,
});

interface DispatchProps {
  setActiveWorkout: (workout: Workout) => ReduxAction<Workout>;
}

const mapDispatchToProps = {
  setActiveWorkout: (workout: Workout): ReduxAction<Workout> => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkout);
