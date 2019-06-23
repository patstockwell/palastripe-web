import React from 'react';
import { connect } from 'react-redux';
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
  match: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const ViewWorkout: React.FC<Props> = ({
  animationStyles,
  entities,
  match,
  setActiveWorkout,
}) => {
  const { id }: { id: string } = match.params;
  const workout: Workout = entities.workouts.byId[id];
  if (!workout) {
    return <FourZeroFour />;
  }

  const workoutWithAllActivityData: Workout =
    combineDataForAllExercises(workout, entities.exercises);

  return (
    <AnimatedSlidingPage
      style={{
        position: animationStyles.position,
        left: animationStyles.left,
      }}
    >
      <BackLinkBanner linkTo={'/workouts/'}/>
      <ViewWorkoutHero
        name={workout.name}
        imageUrl={workout.imageUrl}
        setActiveWorkout={() => setActiveWorkout(workoutWithAllActivityData)}
        time={formatMinutes(calculateWorkoutTime(workout))}
      />
      <ActivityList
        stickyTop={bannerHeight}
        workout={workoutWithAllActivityData}
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
