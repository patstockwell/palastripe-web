import React from 'react';
import styled from 'styled-components';
import BlockPanel from './BlockPanel';

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  padding: 0 10px;
`

const SetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`

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
`

const ActiveExercise = ({ exercise }) => {
  console.log(exercise)
  const sets = exercise.sets.map((reps, i) =>
    <Set key={i}>{reps}</Set>
  )

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
  )
}

export default ActiveExercise;

