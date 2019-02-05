import PropTypes from 'prop-types';

export const exercisePropType = {
  name: PropTypes.string.isRequired,
  weightInKilos: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(PropTypes.number),
};

export const workoutPropType = {
  workoutName: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape(exercisePropType)),
};

export const monday = {
  workoutName: 'Leg Burn',
  data: [
    {
      name: 'Deadlift',
      weightInKilos: 80,
      sets: [7, 7, 7, 7],
    },
    {
      name: 'Squat',
      weightInKilos: 50,
      sets: [7, 7, 7, 7],
    },
    {
      name: 'Overhead Press',
      weightInKilos: 50,
      sets: [7, 7, 7, 7],
    },
  ],
};

export const tuesday = {
  workoutName: 'Arms Routine',
  date: new Date(1543933984145),
  data: [
    {
      name: 'Chinups',
      weightInKilos: 0,
      sets: [5, 5, 5, 5],
    },
    {
      name: 'Bench Press',
      weightInKilos: 12,
      sets: [8, 8, 8, 8],
    },
    {
      name: 'Bicep Curl',
      weightInKilos: 12,
      sets: [8, 8, 8, 8],
    },
  ],
};

