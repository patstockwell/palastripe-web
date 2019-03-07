import exercisesReducer from './exercisesReducer';
import workoutsReducer from './workoutsReducer';

const entitiesReducer = (state, action) => ({
  exercises: exercisesReducer(state.exercises, action, state.workouts),
  workouts: workoutsReducer(state.workouts, action),
  // no reducer for plans yet, just return the current state.
  plans: state.plans,
});

export default entitiesReducer;

