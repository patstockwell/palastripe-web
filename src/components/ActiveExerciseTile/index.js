import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FrontTile from './FrontTile';
import LayoutTile from '../LayoutTile';
import FlipContainer from '../FlipContainer';
import { CHANGE_WEIGHT, DECREMENT_REPS } from '../../reducers/actions';
import { zipSets } from '../../helpers/functions';
import { pink } from '../../helpers/constants';
import { SubtractionSymbol, AdditionSymbol } from '../../assets/SVGs';

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

const RowLayoutRightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 200px;
`;

const SvgButtonWrapper = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  // stops double-tap-to-zoom
  width: 65px;
  height: 65px;
  padding: 0;

  & > svg {
    width: 50px;
    height: 50px;
  }
  &:active {
    background-color: ${pink};
    fill: white;
  }
`;

const FlipButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 19px;
`;

const ActiveExerciseTile = props => {
  const [flip, setFlip] = useState(false);
  const [weight, setWeight] = useState(props.exercise.weightInKilos);
  const {
    setTimer,
    decrementReps,
    exerciseIndex,
    exercise: { sets, name, weightInKilos, completedSets = [] },
    changeWeight,
  } = props;
  const handleClick = (setIndex, reps) => {
    setTimer(reps !== 0);
    decrementReps({ setIndex, exerciseIndex });
  };
  const handleTileFlip = () => {
    // only set the redux state when the tile flips back over
    changeWeight({ exerciseIndex, diff: (weight - weightInKilos) });
    setFlip(!flip);
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
    <FlipContainer className={flip ? 'flip' : ''}>

      <FrontTile
        name={name}
        handleClick={handleTileFlip}
        weightInKilos={weightInKilos}
      >
        {hightlightedSets}
      </FrontTile>

      <LayoutTile className="back">
        <RowLayoutRightAlign>
          <FlipButton onClick={handleTileFlip}>{weight}kg</FlipButton>
        </RowLayoutRightAlign>
        <RowLayout>
          <SvgButtonWrapper onClick={() => setWeight(weight - 2.5)}>
            <SubtractionSymbol />
          </SvgButtonWrapper>
          <SvgButtonWrapper onClick={() => setWeight(weight + 2.5)}>
            <AdditionSymbol />
          </SvgButtonWrapper>
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
