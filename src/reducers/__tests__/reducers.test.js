import initialState from '../initialState';
import { updateCompletedReps, changeWeight, endWorkout } from '../reducers';
import { UPDATE_COMPLETED_REPS, CHANGE_WEIGHT, END_WORKOUT } from '../actions';

describe('Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  describe('updateCompletedReps()', () => {
    it('returns the coreect state object', () => {
      expect(updateCompletedReps(state, {
        type: UPDATE_COMPLETED_REPS,
        payload: { exerciseId: 'exercise1', setIndex: 2, reps: 3 },
      })).toEqual({
        ...state,
        activeWorkout: {
          workoutId: 'workout1',
          exercises: {
            'exercise1': {
              id: 'exercise1',
              name: 'Dead Lift',
              weightInKilos: 80,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: 3 },
                { max: 5, completed: undefined },
              ],
            },
            'exercise2': {
              id: 'exercise2',
              name: 'Squat',
              weightInKilos: 60,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
            'exercise3': {
              id: 'exercise3',
              name: 'Overhead Press',
              weightInKilos: 40,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
          },
          order: ['exercise1', 'exercise2', 'exercise3'],
        },
      });
    });
  });

  describe('changeWeight()', () => {
    it('returns the correct state object', () => {
      expect(changeWeight(state, {
        type: CHANGE_WEIGHT,
        payload: { exerciseId: 'exercise2', weight: 34 },
      })).toEqual({
        ...state,
        activeWorkout: {
          workoutId: 'workout1',
          exercises: {
            'exercise1': {
              id: 'exercise1',
              name: 'Dead Lift',
              weightInKilos: 80,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
            'exercise2': {
              id: 'exercise2',
              name: 'Squat',
              weightInKilos: 34,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
            'exercise3': {
              id: 'exercise3',
              name: 'Overhead Press',
              weightInKilos: 40,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
          },
          order: ['exercise1', 'exercise2', 'exercise3'],
        },
      });
    });
  });

  describe('endWorkout()', () => {
    it('returns the correct state object', () => {
      expect(endWorkout(state, { type: END_WORKOUT })).toEqual({
        entities: {
          ...state.entities,
        },
        activeWorkoutOnGoing: false,
        currentPlanId: 'plan1',
        activeWorkout: {
          workoutId: 'workout2',
          exercises: {
            'exercise4': {
              id: 'exercise4',
              name: 'Chin-up',
              weightInKilos: 0,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
            'exercise5': {
              id: 'exercise5',
              name: 'Bench Press',
              weightInKilos: 60,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
            'exercise6': {
              id: 'exercise6',
              name: 'Bicep Curl',
              weightInKilos: 30,
              sets:[
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
                { max: 5, completed: undefined },
              ],
            },
          },
          order: ['exercise4', 'exercise5', 'exercise6'],
        },
        history: [
          {
            date: expect.any(Date),
            workoutId: 'workout1',
            exercises: {
              'exercise1': {
                id: 'exercise1',
                name: 'Dead Lift',
                weightInKilos: 80,
                sets:[
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                ],
              },
              'exercise2': {
                id: 'exercise2',
                name: 'Squat',
                weightInKilos: 60,
                sets:[
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                ],
              },
              'exercise3': {
                id: 'exercise3',
                name: 'Overhead Press',
                weightInKilos: 40,
                sets:[
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                  { max: 5, completed: undefined },
                ],
              },
            },
            order: ['exercise1', 'exercise2', 'exercise3'],
          }
        ],
      });
    });
  });
});
