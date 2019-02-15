import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FrontTile from './FrontTile';
import BackTile from './BackTile';
import FlipContainer from '../FlipContainer';
import { changeWeight, updateCompletedReps } from '../../reducers/actions';
import { exercisePropTypeShape } from '../../helpers/data';
import { decrementReps } from '../../helpers/functions';

const Set = styled.button`
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  border: 3px solid ${({ border }) => border};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 13px 0px 7px;
  font-size: 20px;
  // stops double-tap-to-zoom
  touch-action: manipulation;
`;

export const getTheme = (completedReps, max) => {
  if (completedReps === undefined) {
    return { border: 'grey', background: 'white', text: 'grey' };
  } else if (completedReps <= 0) {
    return { border: 'grey', background: 'lightgrey', text: 'grey' };
  } else if (completedReps >= max) {
    return { border: 'green', background: 'lightgreen', text: 'black' };
  } else {
    return { border: 'blue', background: 'lightskyblue', text: 'black' };
  }
};

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

  return (
    <FlipContainer className={flip ? 'flip' : ''}>
      <FrontTile
        name={name}
        handleTileFlip={handleTileFlip}
        weightInKilos={weightInKilos}
      >
        {hightlightedSets}
      </FrontTile>
      <BackTile
        handleTileFlip={handleTileFlip}
        weight={weight}
        setWeight={setWeight}
      />
    </FlipContainer>
  );
};

ActiveExerciseTile.propTypes = {
  setTimer: PropTypes.func,
  updateCompletedReps: PropTypes.func,
  changeWeight: PropTypes.func,
  exercise: PropTypes.shape(exercisePropTypeShape),
};

const mapDispatchToProps = { updateCompletedReps, changeWeight };

const areEqualProps = (prev, next) => (
  JSON.stringify(prev.exercise) === JSON.stringify(next.exercise)
);

const PureActiveExerciseTile = React.memo(ActiveExerciseTile, areEqualProps);

export default connect(null, mapDispatchToProps)(PureActiveExerciseTile);
