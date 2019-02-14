// action types
export const CHANGE_WEIGHT = 'CHANGE_WEIGHT';
export const UPDATE_COMPLETED_REPS = 'UPDATE_COMPLETED_REPS';
export const END_WORKOUT = 'END_WORKOUT';

// action creators
export const updateCompletedReps = ({ exerciseId, setIndex, reps }) => ({
  type: UPDATE_COMPLETED_REPS,
  payload: { exerciseId, setIndex, reps },
});

export const changeWeight = ({ exerciseId, weight }) => ({
  type: CHANGE_WEIGHT,
  payload: { exerciseId, weight },
});


