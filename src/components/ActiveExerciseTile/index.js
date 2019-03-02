import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetsTile from './SetsTile';
import WeightIncrementTile from './WeightIncrementTile';
import { exercisePropTypeShape } from '../../helpers/data';
import { decrementReps } from '../../helpers/functions';
import {
  UPDATE_COMPLETED_REPS,
  CHANGE_WEIGHT,
} from '../../helpers/constants';
import {
  RelativeDiv,
  FrontFace,
  BackFace,
  getStyles,
  backfaceVisibility,
} from '../FlipContainer';

const ActiveExerciseTile = props => {
  const [flip, setFlip] = useState(false);
  const {
    setTimer,
    updateCompletedReps,
    exercise: { id, sets, name, weightInKilos },
    changeWeight,
  } = props;

  const handleRemoveExercise = () => console.log('removed');

  const handleClick = (setIndex, r, max) => {
    const reps = decrementReps(r, max);
    setTimer(reps !== undefined);
    updateCompletedReps({ exerciseId: id, setIndex, reps });
  };

  const handleTileFlip = isFlipped => {
    setFlip(isFlipped);
  };

  const transform = getStyles(flip);

  return (
    <RelativeDiv>
      <FrontFace style={{ transform, ...backfaceVisibility }} >
        <SetsTile
          name={name}
          handleTileFlip={handleTileFlip}
          weight={weightInKilos}
          flip={flip}
          sets={sets}
          handleClick={handleClick}
        />
      </FrontFace>
      <BackFace
        style={{
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          ...backfaceVisibility
        }}
      >
        <WeightIncrementTile
          name={name}
          handleTileFlip={handleTileFlip}
          handleRemoveExercise={handleRemoveExercise}
          weight={weightInKilos}
          setWeight={weight => changeWeight({ exerciseId: id, weight })}
        />
      </BackFace>
    </RelativeDiv>
  );
};

ActiveExerciseTile.propTypes = {
  setTimer: PropTypes.func,
  updateCompletedReps: PropTypes.func,
  changeWeight: PropTypes.func,
  exercise: PropTypes.shape(exercisePropTypeShape),
};

const mapDispatchToProps = {
  updateCompletedReps: ({ exerciseId, setIndex, reps }) => ({
    type: UPDATE_COMPLETED_REPS,
    payload: { exerciseId, setIndex, reps },
  }),
  changeWeight: ({ exerciseId, weight }) => ({
    type: CHANGE_WEIGHT,
    payload: { exerciseId, weight },
  }),
};

const areEqualProps = (prev, next) => (
  JSON.stringify(prev.exercise) === JSON.stringify(next.exercise)
);

const PureActiveExerciseTile = React.memo(ActiveExerciseTile, areEqualProps);

export default connect(null, mapDispatchToProps)(PureActiveExerciseTile);
