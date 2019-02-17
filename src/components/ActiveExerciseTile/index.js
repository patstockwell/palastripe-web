import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetsTile from './SetsTile';
import WeightIncrementTile from './WeightIncrementTile';
import Set, { getTheme } from './Set';
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
  const [weight, setWeight] = useState(props.exercise.weightInKilos);
  const {
    setTimer,
    updateCompletedReps,
    exercise: { id, sets, name, weightInKilos },
    changeWeight,
  } = props;

  const handleClick = (setIndex, r) => {
    const reps = decrementReps(r, 5);
    setTimer(reps !== undefined);
    updateCompletedReps({ exerciseId: id, setIndex, reps });
  };

  const handleTileFlip = isFlipped => {
    // only set the redux state when the tile flips back over
    changeWeight({ exerciseId: id, weight });
    setFlip(isFlipped);
  };

  const hightlightedSets = sets.map(
    ({ max, completed }, index) => {
      const reps = isNaN(completed) ? max : completed;
      const theme = getTheme(completed, max);

      return (
        <Set
          key={index}
          onClick={() => handleClick(index, completed)}
          {...theme}
        >{reps}</Set>
      );
    }
  );

  const transform = getStyles(flip);

  return (
    <RelativeDiv>
      <FrontFace style={{ transform, ...backfaceVisibility }} >
        <SetsTile
          name={name}
          handleTileFlip={handleTileFlip}
          weightInKilos={weightInKilos}
        >
          {hightlightedSets}
        </SetsTile>
      </FrontFace>
      <BackFace
        style={{
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          ...backfaceVisibility
        }}
      >
        <WeightIncrementTile
          handleTileFlip={handleTileFlip}
          weight={weight}
          setWeight={setWeight}
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
