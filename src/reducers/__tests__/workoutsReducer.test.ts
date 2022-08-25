import { reduceCompletedExercises, adjustWeight } from '../workoutsReducer';
import { Activity } from '../../helpers/types';
import { Workout } from '../workoutsReducer';

describe('the workoutsReducer', () => {
  const workout: Workout = {
    id: 'workout_id',
    name: 'Tester',
    version: 'some version',
    imageUrl: 'url',
    startTime: '2',
    finishTime: '8',
    exerciseGroups: [
      {
        id: 'group1',
        name: 'Group 1',
        exercises: [
          {
            name: 'Exercise 1',
            id: 'exercise1',
            weightInKilos: 70,
            exerciseId: 'exercise1',
            repsGoal: 8,
            repsAchieved: 8,
            autoIncrement: 0,
            completed: true,
          },
          {
            name: 'Exercise 2',
            id: 'exercise2',
            weightInKilos: 70,
            exerciseId: 'exercise2',
            repsGoal: 8,
            repsAchieved: 8,
            autoIncrement: 0,
            completed: true,
          },
          {
            name: 'Exercise 4',
            id: 'exercise4',
            weightInKilos: 70,
            exerciseId: 'exercise4',
            repsGoal: 8,
            repsAchieved: 8,
            autoIncrement: 0,
            completed: true,
          },
        ],
      },
      {
        id: 'group2',
        name: 'Group 2',
        exercises: [
          {
            name: 'Exercise 3',
            id: 'exercise3',
            weightInKilos: 73,
            exerciseId: 'exercise3',
            repsGoal: 8,
            repsAchieved: 8,
            autoIncrement: 0,
            completed: true,
          },
          {
            name: 'Exercise 4',
            id: 'exercise4',
            weightInKilos: 70,
            exerciseId: 'exercise4',
            repsGoal: 8,
            repsAchieved: 8,
            autoIncrement: 0,
            completed: false,
          },
        ],
      },
    ],
  };
  describe('the reduceCompletedExercises function', () => {
    it('returns a bool hash', () => {
      const result = reduceCompletedExercises(workout);
      expect(result).toEqual({
        exercise1: true,
        exercise2: true,
        exercise3: true,
        exercise4: false,
      });
    });
  });

  describe('the adjustWeight function', () => {
    it('returns the activity with an updated weight', () => {
      const activity: Activity = {
        exerciseId: '1',
        name: 'exercise3',
        id: 'differentId',
        weightInKilos: 70,
        repsGoal: 99,
        repsAchieved: 7,
        autoIncrement: 10,
      };

      const result = adjustWeight(workout, 1)(activity, 1);

      expect(result).toEqual({
        name: 'exercise3',
        id: 'differentId',
        weightInKilos: 70,
        exerciseId: '1',
        repsGoal: 99,
        repsAchieved: 7,
        autoIncrement: 10,
      });
    });
  });
});
