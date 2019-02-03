import React from 'react';
import styled from 'styled-components';
import BlockPanel from './BlockPanel';

const ExerciseListItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const ExerciseName = styled.h5`
  flex-basis: 50%;
  font-size: 12px;
  font-weight: 400;
`

const Sets = styled.p`
  flex-basis: 28%;
  font-size: 12px;
`

const Weight = styled.p`
  font-size: 12px;
`

const ExerciseListItem = ({ sets, name, weightInKilos }) => {
  const setCount = sets.join('/');

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName>{name}</ExerciseName>
      <Sets>{setCount}</Sets>
      <Weight>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
}

const Title = styled.div`
  flex-basis: 100px;
  margin-right: 8px;
`

const ExerciseList = styled.div`
  flex: 1;
`

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Date = styled.h3`
  font-size: 17px;
`

const WorkoutName = styled.h4`
  font-size: 15px;
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
    <BlockPanel>
      <LayoutWrapper>
        <Title>
          <Date>{date ? date.toDateString() : 'Next'}</Date>
          <WorkoutName>{workoutName}</WorkoutName>
        </Title>
        <ExerciseList>
          {exercises}
        </ExerciseList>
      </LayoutWrapper>
    </BlockPanel>
  );
}

export default Workout;

