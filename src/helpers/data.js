import PropTypes from 'prop-types';

export const exercisePropType = {
  name: PropTypes.string.isRequired,
  weightInKilos: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(PropTypes.number),
  completedSets: PropTypes.arrayOf(PropTypes.number),
};

export const workoutPropType = {
  workoutName: PropTypes.string,
  exercises: PropTypes.arrayOf(PropTypes.shape(exercisePropType)),
};

