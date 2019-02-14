import PropTypes from 'prop-types';

export const exercisePropTypeShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weightInKilos: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(PropTypes.shape({
    max: PropTypes.number.isRequired,
    completed: PropTypes.number,
  })).isRequired,
  completedSets: PropTypes.arrayOf(PropTypes.number),
};

export const workoutPropType = {
  workoutName: PropTypes.string,
  exercises: PropTypes.object.isRequired,
  order: PropTypes.arrayOf(PropTypes.string),
};

