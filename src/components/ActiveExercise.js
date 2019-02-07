import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BlockPanel from './BlockPanel';

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
  border-radius: 50%;
  background-color: ${({ theme: { background } }) => background};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  border: 3px solid ${({ theme: { border } }) => border};
  font-size: 20px;
`;

const ActiveExercise = ({ decrementReps, exerciseIndex, exercise }) => {
  const { name, weightInKilos, completedSets = [] } = exercise;

  const handleClick = setIndex => {
    decrementReps({ setIndex, exerciseIndex });
  };

  const sets = exercise.sets.map((reps, index) => {
    // TODO: pull all this out into a '<Set /> component'
    const completedReps =
      !isNaN(completedSets[index]) ? completedSets[index] : reps;
    const isIncomplete = completedSets[index] === undefined;
    const theme = {
      border: isIncomplete ? 'grey' : 'green',
      background: isIncomplete ? 'lightgrey' : 'lightgreen',
    };

    return (
      <Set
        key={index}
        onClick={() => handleClick(index)}
        theme={theme}
      >{completedReps}</Set>
    );
  });

  return (
    <BlockPanel>
      <HeadingWrapper>
        <h3>{name}</h3>
        <p>{weightInKilos}kg</p>
      </HeadingWrapper>
      <SetsWrapper>
        {sets}
      </SetsWrapper>
    </BlockPanel>
  );
};

ActiveExercise.propTypes = {
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
    type: 'DECREMENT_REPS',
    payload: { setIndex, exerciseIndex },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveExercise);
