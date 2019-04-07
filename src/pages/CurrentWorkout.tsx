import React from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import BannerForActiveWorkout from '../components/BannerForActiveWorkout';
import {
  Activity,
  Exercises,
  Entities,
  Workout,
  WorkoutActivities,
} from '../helpers/types';

interface Props {
  animationStyles: any;
  entities: Entities;
  match: any;
}

const combineExerciseData = (exercises: Exercises) => (activity: Activity): Activity => ({
  ...activity,
  ...exercises.byId[activity.id] || {},
});

const combineDataForAllExercises = (workout: Workout, exercisesList: Exercises): Workout => {
  const { exercises: { warmUp, workingSets, stretch } } = workout;
  const addExerciseData = combineExerciseData(exercisesList);

  return {
    ...workout,
    exercises: {
      ...workout.exercises,
      warmUp: warmUp.map(addExerciseData),
      workingSets: workingSets.map(addExerciseData),
      stretch: stretch.map(addExerciseData),
    },
  };
};

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
  const {
    exercises: {
      warmUp,
      workingSets,
      stretch,
    },
  }: Workout = combineDataForAllExercises(workout, entities.exercises);

  const warmUpTiles = warmUp.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
  );
  const exercisesTiles = workingSets.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
  );
  const stretchTiles = stretch.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
  );

  return (
    <animated.div style={{
      ...animationStyles,
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
    }}>
      <BackSplash>
        <BannerForActiveWorkout hash={workout.id}/>
        <h1>workout</h1>
        <h2>warm up</h2>
        {warmUpTiles}
        <h2>exercises</h2>
        {exercisesTiles}
        <h2>stretch</h2>
        {stretchTiles}
      </BackSplash>
    </animated.div>
  );
};

const mapStateToProps = ({ entities }) => ({
  entities,
});

export default connect(mapStateToProps)(CurrentWorkout);
