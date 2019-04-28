import React from 'react';
import { connect } from 'react-redux';
import FourZeroFour from '../pages/FourZeroFour';
import BannerForActiveWorkout from '../components/BannerForActiveWorkout';
import ViewWorkoutHero from '../components/ViewWorkoutHero';
import ActivityList from '../components/ActivityList';
import { AnimatedSlidingPage } from './ActiveWorkout';
import { combineDataForAllExercises } from '../helpers/functions';
import { bannerHeight } from '../helpers/constants';
import {
  Entities, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface Props {
  animationStyles: any;
  entities: Entities;
  match: any;
}

const ViewWorkout: React.FC<Props> = ({
  animationStyles,
  entities,
  match,
}) => {
  const { id }: { id: string } = match.params;
  const workout: Workout = entities.workouts.byId[id];
  if (!workout) {
    return <FourZeroFour />;
  }

  const workoutWithAllActivityData: Workout =
    combineDataForAllExercises(workout, entities.exercises);

  return (
    <AnimatedSlidingPage style={{ left: animationStyles.left }}>
      <BannerForActiveWorkout />
      <ViewWorkoutHero
        workout={workoutWithAllActivityData}
      />
      <ActivityList stickyTop={bannerHeight} workout={workoutWithAllActivityData} />
    </AnimatedSlidingPage>
  );
};

const mapStateToProps = ({ entities }) => ({
  entities,
});

export default connect(mapStateToProps)(ViewWorkout);
