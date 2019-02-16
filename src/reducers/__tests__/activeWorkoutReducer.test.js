import activeWorkoutReducer from '../activeWorkoutReducer';
import initialState from '../initialState';
import {
  UPDATE_COMPLETED_REPS,
  END_WORKOUT,
  CHANGE_WEIGHT,
} from '../../helpers/constants';

describe('the activeWorkoutReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState.activeWorkout,
    };
  });

  describe('the UPDATE_COMPLETED_REPS action', () => {
    it('returns the correct state object', () => {
      expect(activeWorkoutReducer(state, {
        type: UPDATE_COMPLETED_REPS,
        payload: {
          exerciseId: 'exercise1',
          setIndex: 2,
          reps: 12,
        },
      })).toEqual({
        workoutId: 'workout1',
        onGoing: false,
        exercises: {
          'exercise1': {
            id: 'exercise1',
            name: 'Dead Lift',
            weightInKilos: 80,
            sets:[
              { max: 5, completed: undefined },
              { max: 5, completed: undefined },
              { max: 5, completed: 12 },
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

      });
    });
  });

  describe('the CHANGE_WEIGHT action', () => {
    it('returns the correct state object', () => {
      expect(activeWorkoutReducer(state, {
        type: CHANGE_WEIGHT,
        payload: {
          exerciseId: 'exercise1',
          weight: 37.5,
        },
      })).toEqual({
        workoutId: 'workout1',
        onGoing: false,
        exercises: {
          'exercise1': {
            id: 'exercise1',
            name: 'Dead Lift',
            weightInKilos: 37.5,
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

      });
    });
  });

  describe('the END_WORKOUT action', () => {
    it('returns the correct state object', () => {
      expect(activeWorkoutReducer(state, {
        type: END_WORKOUT,
      }, initialState.entities)).toEqual({
        workoutId: 'workout2',
        onGoing: false,
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
              { max: 12, completed: undefined },
              { max: 12, completed: undefined },
              { max: 12, completed: undefined },
              { max: 12, completed: undefined },
            ],
          },
        },
        order: ['exercise4', 'exercise5', 'exercise6'],

      });
    });
  });
});
