import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from './LayoutTile';
import FlipContainer from './FlipContainer';
import { CHANGE_WEIGHT, DECREMENT_REPS } from '../reducers/actions';
import { zipSets } from '../helpers/functions';
import { pink } from '../helpers/constants';

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

const FlipButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 19px;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 200px;
  margin: 0 auto;
`;

const ChangeWeightButton = styled.button`
  font-size: 80px;
  border: none;
  background-color: transparent;
  font-weight: 100;
  line-height: 0.5;
  // stops double-tap-to-zoom
  touch-action: manipulation;

  &:active {
    color: ${pink};
  }
`;

const Weight = styled.h3`
  font-size: 30px;
  font-weight: 200;
  line-height: 1;
`;

const ActiveExerciseTile = ({
  setTimer,
  decrementReps,
  exerciseIndex,
  exercise,
  changeWeight,
}) => {
  const [flip, setFlip] = useState(false);

  const { sets, name, weightInKilos, completedSets = [] } = exercise;
  const handleClick = (setIndex, reps) => {
    setTimer(reps !== 0);
    decrementReps({ setIndex, exerciseIndex });
  };
  const handleWeightChange = diff => changeWeight({ exerciseIndex, diff });

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

  const handleTileFlip = () => {
    setFlip(!flip);
  };

  return (
    <FlipContainer className={flip ? 'flip' : ''}>

      <LayoutTile className="front">
        <HeadingWrapper>
          <ExerciseName>{name}</ExerciseName>
          <FlipButton onClick={handleTileFlip}>{weightInKilos}kg</FlipButton>
        </HeadingWrapper>
        <SetsWrapper>
          {hightlightedSets}
        </SetsWrapper>
      </LayoutTile>

      <LayoutTile className="back">
        <FlipButton onClick={handleTileFlip}>Done</FlipButton>
        <RowLayout>
          <ChangeWeightButton
            onClick={() => handleWeightChange(-2.5)}>-</ChangeWeightButton>
          <Weight>{weightInKilos}</Weight>
          <ChangeWeightButton
            onClick={() => handleWeightChange(2.5)}>+</ChangeWeightButton>
        </RowLayout>
      </LayoutTile>

    </FlipContainer>
  );
};

ActiveExerciseTile.propTypes = {
  setTimer: PropTypes.func,
  decrementReps: PropTypes.func,
  changeWeight: PropTypes.func,
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
  changeWeight: ({ exerciseIndex, diff }) => ({
    type: CHANGE_WEIGHT,
    payload: { exerciseIndex, diff },
  }),
};

const areEqualProps = (prev, next) => (
  JSON.stringify(prev.exercise) === JSON.stringify(next.exercise)
);

const PureActiveExerciseTile = React.memo(ActiveExerciseTile, areEqualProps);

export default connect(null, mapDispatchToProps)(PureActiveExerciseTile);
