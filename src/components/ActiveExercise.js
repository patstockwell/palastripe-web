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
  background-color: lightgrey;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  border: 1px solid grey;
  font-size: 20px;
`;

const ActiveExercise = ({ decrementReps, exerciseIndex, exercise }) => {
  const { name, weightInKilos, completedSets = [] } = exercise;

  const handleClick = setIndex => {
    decrementReps({ setIndex, exerciseIndex });
  };

  const sets = exercise.sets.map((reps, index) => {
    const completedReps = !isNaN(completedSets[index]) ? completedSets[index] : reps;
    return (
      <Set
        key={index}
        onClick={() => handleClick(index)}
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
  exercise: state.activeWorkout.data[ownProps.exerciseIndex],
});

const mapDispatchToProps = {
  decrementReps: ({ setIndex, exerciseIndex }) => ({
    type: 'DECREMENT_REPS',
    payload: { setIndex, exerciseIndex },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveExercise);
