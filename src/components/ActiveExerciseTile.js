import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from './LayoutTile';
import { DECREMENT_REPS } from '../reducers/actions';
import { zipSets } from '../helpers/functions';

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  padding: 0 10px;
`;

const SetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

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
  margin: 13px 5px 7px;
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

const ExerciseName = styled.h3`
  font-weight: 400;
  font-size: 19px;
`;

const WeightLabel = styled.button`
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: transparent;
  font-size: 19px;
`;

const ActiveExerciseTile = ({ setTimer, decrementReps, exerciseIndex, exercise }) => {
  const { sets, name, weightInKilos, completedSets = [] } = exercise;
  const handleClick = (setIndex, reps) => {
    setTimer(reps !== 0);
    decrementReps({ setIndex, exerciseIndex });
  };

  const hightlightedSets = zipSets(sets, completedSets).map(
    ({ max, completed }, index) => {
      const reps = isNaN(completed) ? max : completed;
      const theme = getTheme(completed, max);

      return (
        <Set
          key={index}
          onClick={() => handleClick(index, reps)}
          {...theme}
        >{reps}</Set>
      );
    }
  );

  return (
    <LayoutTile>
      <HeadingWrapper>
        <ExerciseName>{name}</ExerciseName>
        <WeightLabel>{weightInKilos}kg</WeightLabel>
      </HeadingWrapper>
      <SetsWrapper>
        {hightlightedSets}
      </SetsWrapper>
    </LayoutTile>
  );
};

ActiveExerciseTile.propTypes = {
  setTimer: PropTypes.func,
  decrementReps: PropTypes.func,
  exerciseIndex: PropTypes.number,
  exercise: PropTypes.shape({
    name: PropTypes.string,
    weightInKilos: PropTypes.number,
    sets: PropTypes.arrayOf(PropTypes.number),
  }),
};

const mapDispatchToProps = {
  decrementReps: ({ setIndex, exerciseIndex }) => ({
    type: DECREMENT_REPS,
    payload: { setIndex, exerciseIndex },
  }),
};

const areEqualProps = (prev, next) => (
  JSON.stringify(prev.exercise) === JSON.stringify(next.exercise)
);

const PureActiveExerciseTile = React.memo(ActiveExerciseTile, areEqualProps);

export default connect(null, mapDispatchToProps)(PureActiveExerciseTile);
