import React, {useState} from 'react';
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
`;

const setRepetitions = (workout, exerciseIndex, setIndex) => {
  // iterate over the exercises and find the exercise that was clicked
  const exercise = workout.data[exerciseIndex];
  exercise.completedSets = exercise.completedSets || [];
  const { sets, completedSets } = exercise;
  if (completedSets[setIndex] <= 0) {
    completedSets[setIndex] = undefined;
  } else if (completedSets[setIndex] === undefined) {
    completedSets[setIndex] = sets[setIndex];
  } else {
    completedSets[setIndex] -= 1;
  }
  return workout;
};

const ActiveExercise = ({ exerciseIndex, exercise }) => {
  // TODO: replace useState with redux and create a reducer and action creator for setting reps
  const [activeWorkout, setActiveWorkout] = useState();
  console.log(activeWorkout);

  const handleClick = setIndex => {
    const updatedWorkout = setRepetitions(activeWorkout, exerciseIndex, setIndex );
    setActiveWorkout(updatedWorkout);
  };

  const sets = exercise.sets.map((reps, index) =>
    <Set
      key={index}
      onClick={() => handleClick(index)}
    >{reps}</Set>
  );

  return (
    <BlockPanel>
      <HeadingWrapper>
        <h3>{exercise.name}</h3>
        <p>{exercise.weightInKilos}kg</p>
      </HeadingWrapper>
      <SetsWrapper>
        {sets}
      </SetsWrapper>
    </BlockPanel>
  );
};

ActiveExercise.propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string,
    weightInKilos: PropTypes.number,
    sets: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default ActiveExercise;
