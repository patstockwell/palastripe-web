import { endWorkout, decrementReps } from '../reducers';
import { END_WORKOUT, DECREMENT_REPS } from '../actions';

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
      type: DECREMENT_REPS,
      payload: {
        exerciseIndex: 0,
        setIndex: 1,
      },
    };

    it('decrements the reps when the reps are a positive integer', () => {
      state.activeWorkout.exercises[0].completedSets = [3, 1];
      expect(decrementReps(state, action)).toEqual({
        activeWorkoutOnGoing: true,
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
        activeWorkoutOnGoing: true,
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
        activeWorkoutOnGoing: true,
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

  describe('endWorkout()', () => {
    const state = {};

    beforeEach(() => {
      state.history = [];
      state.activeWorkoutOnGoing = true;
      state.workoutCountForThisPlan = 0;
      state.workoutPlan = [
        {
          workoutName: 'A',
          exercises: [
            {
              name: 'Chinups',
              weightInKilos: 0,
              sets: [5, 5, 5, 5],
            },
          ],
        },
        {
          workoutName: 'B',
          exercises: [
            {
              name: 'Deadlift',
              weightInKilos: 80,
              sets: [7, 7, 7, 7],
            },
          ],
        },
      ];
      state.activeWorkout = {
        workoutName: 'A',
        exercises: [
          {
            name: 'Chinups',
            weightInKilos: 0,
            sets: [5, 5, 5, 5],
          },
        ],
      };
    });

    it('returns the correct state object', () => {
      expect(endWorkout(state, { type: END_WORKOUT })).toEqual({
        activeWorkoutOnGoing: false,
        history: [{
          date: expect.any(Date),
          workoutName: 'A',
          exercises: [
            {
              name: 'Chinups',
              weightInKilos: 0,
              sets: [5, 5, 5, 5],
            },
          ],
        }],
        workoutCountForThisPlan: 1,
        workoutPlan: [
          {
            workoutName: 'A',
            exercises: [
              {
                name: 'Chinups',
                weightInKilos: 0,
                sets: [5, 5, 5, 5],
              },
            ],
          },
          {
            workoutName: 'B',
            exercises: [
              {
                name: 'Deadlift',
                weightInKilos: 80,
                sets: [7, 7, 7, 7],
              },
            ],
          },
        ],
        activeWorkout: {
          workoutName: 'B',
          exercises: [
            {
              name: 'Deadlift',
              weightInKilos: 80,
              sets: [7, 7, 7, 7],
            },
          ],
        },

      });
    });
  });
});
