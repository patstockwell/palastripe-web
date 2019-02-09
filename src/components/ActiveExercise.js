import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BlockPanel from './BlockPanel';
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
  margin: 10px 5px;
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


const ActiveExercise = ({ setShowRestTimer, decrementReps, exerciseIndex, exercise }) => {
  const { sets, name, weightInKilos, completedSets = [] } = exercise;
  const handleClick = (setIndex, reps) => {
    setShowRestTimer(reps !== 0);
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
    <BlockPanel>
      <HeadingWrapper>
        <h3>{name}</h3>
        <p>{weightInKilos}kg</p>
      </HeadingWrapper>
      <SetsWrapper>
        {hightlightedSets}
      </SetsWrapper>
    </BlockPanel>
  );
};

ActiveExercise.propTypes = {
  setShowRestTimer: PropTypes.func,
  decrementReps: PropTypes.func,
  exerciseIndex: PropTypes.number,
  exercise: PropTypes.shape({
    name: PropTypes.string,
    weightInKilos: PropTypes.number,
    sets: PropTypes.arrayOf(PropTypes.number),
  }),
};

const mapStateToProps = (state, ownProps) => ({
  exercise: state.activeWorkout.exercises[ownProps.exerciseIndex],
});

const mapDispatchToProps = {
  decrementReps: ({ setIndex, exerciseIndex }) => ({
    type: DECREMENT_REPS,
    payload: { setIndex, exerciseIndex },
  }),
};

const areEqualProps = (prev, next) => (
  JSON.stringify(prev.exercise) === JSON.stringify(next.exercise)
);

const PureActiveExercise = React.memo(ActiveExercise, areEqualProps);

export default connect(mapStateToProps, mapDispatchToProps)(PureActiveExercise);
