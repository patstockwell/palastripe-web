import workoutsReducer from '../workoutsReducer';
import initialState from '../initialState';
import { END_WORKOUT } from '../../helpers/constants';

describe('the workoutsReducer', () => {
  let state;

  beforeEach(() => {
    state = Object.assign({}, initialState);
  });

  describe('the END_WORKOUT action', () => {
    it('updates the weight when the new weight is larger', () => {
      const { workouts } = state.entities;
      const recentWeight = 150;

      const newState = workoutsReducer(workouts, {
        type: END_WORKOUT,
        payload: {
          activeWorkout: {
            workoutId: 'workout1',
            order: ['exercise1'],
            exercises: {
              'exercise1': {
                id: 'exercise1',
                name: 'Dead Lift',
                sets: [7, 7, 7, 7],
                restPeriodInSeconds: 120,
                weightInKilos: recentWeight,
              },
            },
          },
        },
      });
      const expectedState = Object.assign({}, workouts);
      expectedState.byId.workout1.exercises.exercise1.weightInKilos = 150;

      expect(newState).toEqual(expectedState);
    });
  });
});
