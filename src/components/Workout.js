import React from 'react';
import styled from 'styled-components';

const ExerciseListItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const ExerciseName = styled.h5`
  flex-basis: 40%;
`

const Sets = styled.p`
  flex-basis: 30%;
`

const ExerciseListItem = ({ sets, name, weightInKilos }) => {
  const setCount = sets.join('/');

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName>{name}</ExerciseName>
      <Sets>{setCount}</Sets>
      <p>{weightInKilos}kg</p>
    </ExerciseListItemWrapper>
  );
}

const Panel = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 30px;
  box-sizing: border-box;
`

const Title = styled.div`
  flex-basis: 100px;
  margin-right: 8px;
`

const ExerciseList = styled.div`
  flex: 1;
`

const Workout = props => {
  const {
    workoutRoutine : {
      workoutName,
      data,
      date,
    },
  } = props;

  const exercises = data.map(ExerciseListItem);

  return (
    <Panel>
      <Title>
        <h3>{date ? date.toDateString() : 'Next'}</h3>
        <h4>{workoutName}</h4>
      </Title>
      <ExerciseList>
        {exercises}
      </ExerciseList>
    </Panel>
  );
}

export default Workout;

