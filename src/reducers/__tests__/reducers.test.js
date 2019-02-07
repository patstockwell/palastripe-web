import { decrementReps } from '../reducers';

describe('Reducers', () => {
  describe('decrementReps()', () => {
    const state = {};

    beforeEach(() => {
      state.activeWorkout = {
        workoutName: 'Blast',
        exercises: [
          {
            name: 'Dead lift',
            weightInKilos: 80,
            sets: [5, 5, 5, 5],
          },
        ],
      };
    });

    const action = {
      type: 'DECREMENT_REPS',
      payload: {
        exerciseIndex: 0,
        setIndex: 1,
      },
    };

    it('decrements the reps when the reps are a positive integer', () => {
      state.activeWorkout.exercises[0].completedSets = [3, 1];
      expect(decrementReps(state, action)).toEqual({
        activeWorkout: {
          workoutName: 'Blast',
          exercises: [
            {
              name: 'Dead lift',
              weightInKilos: 80,
              sets: [5, 5, 5, 5],
              completedSets: [3, 0],
            },
          ],
        },
      });
    });

    it('sets the value to undefined when the completed sets are zero', () => {
      state.activeWorkout.exercises[0].completedSets = [3, 0, 5];
      expect(decrementReps(state, action)).toEqual({
        activeWorkout: {
          workoutName: 'Blast',
          exercises: [
            {
              name: 'Dead lift',
              weightInKilos: 80,
              sets: [5, 5, 5, 5],
              completedSets: [3, undefined, 5],
            },
          ],
        },
      });
    });

    it('Sets the value to the total rep count when the completed reps is undefined', () => {
      expect(decrementReps(state, action)).toEqual({
        activeWorkout: {
          workoutName: 'Blast',
          exercises: [
            {
              name: 'Dead lift',
              weightInKilos: 80,
              sets: [5, 5, 5, 5],
              completedSets: [undefined, 5],
            },
          ],
        },
      });
    });
  });
});
