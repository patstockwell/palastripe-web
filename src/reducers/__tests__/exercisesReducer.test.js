import exercisesReducer from '../exercisesReducer';
import initialState from '../initialState';
import { END_WORKOUT } from '../../helpers/constants';

describe('the exercisesReducer', () => {
  let state;

  beforeEach(() => {
    state = Object.assign({}, initialState);
  });

  describe('the END_WORKOUT action', () => {
    it('updates the mostWeightInKilos when it is larger than the previous', () => {
      const { exercises } = state.entities;
      // previous best
      exercises.byId.exercise1.mostWeightInKilos = 50;
      // recent amount
      const recentWeight = 130;

      const newState = exercisesReducer(exercises, {
        type: END_WORKOUT,
        payload: {
          activeWorkout: {
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

      expect(newState).toEqual({
        ...exercises,
        byId: {
          ...exercises.byId,
          'exercise1': {
            id: 'exercise1',
            name: 'Dead Lift',
            mostWeightInKilos: 130,
          },
        }
      });
    });

    it('does not update the mostWeightInKilos when it is smaller than the previous', () => {
      const { exercises } = state.entities;
      // previous best
      exercises.byId.exercise1.mostWeightInKilos = 50;
      // recent amount
      const recentWeight = 30;

      const newState = exercisesReducer(exercises, {
        type: END_WORKOUT,
        payload: {
          activeWorkout: {
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

      expect(newState).toEqual({
        ...exercises,
        byId: {
          ...exercises.byId,
          'exercise1': {
            id: 'exercise1',
            name: 'Dead Lift',
            mostWeightInKilos: 50,
          },
        }
      });
    });
  });
});
