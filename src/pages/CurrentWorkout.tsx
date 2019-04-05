import React from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
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

const combineData = (exercises: Exercises) => (activity: Activity): Activity => ({
  ...activity,
  ...exercises.byId[activity.id] || {},
});

const updateAllExercises = (workout: Workout, exercisesList: Exercises): Workout => {
  const e: WorkoutActivities = workout.exercises;
  const warmUp: Activity[] = e.warmUp || [];
  const stretch: Activity[] = e.stretch || [];
  const sets: Activity[] = e.sets;
  const addExerciseData = combineData(exercisesList);

  return {
    ...workout,
    exercises: {
      ...e,
      warmUp: warmUp.map(addExerciseData),
      sets: sets.map(addExerciseData),
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
  const workoutWithDetail: Workout =
    updateAllExercises(workout, entities.exercises);
  const warmUpTiles = workoutWithDetail.exercises.warmUp.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
  );
  const exercisesTiles = workoutWithDetail.exercises.sets.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
  );
  const stretchTiles = workoutWithDetail.exercises.stretch.map((a: Activity, i) =>
    <div key={i}>{a.name}</div>
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
      <BackSplash>
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
