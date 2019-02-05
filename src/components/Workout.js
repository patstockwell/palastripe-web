import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import BlockPanel from './BlockPanel';

const ExerciseListItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 9px 0;
`;

const ExerciseName = styled.h5`
  flex-basis: 51%;
  font-size: 14px;
  font-weight: 400;
`;

const Sets = styled.p`
  flex-basis: 28%;
  font-size: 14px;
`;

const Weight = styled.p`
  font-size: 14px;
`;

const ExerciseListItem = ({ sets, name, weightInKilos }) => {
  const setCount = sets.join('/');

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName>{name}</ExerciseName>
      <Sets>{setCount}</Sets>
      <Weight>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
};

ExerciseListItem.propTypes = {
  name: PropTypes.string,
  weightInKilos: PropTypes.number,
  sets: PropTypes.arrayOf(PropTypes.number),
};

const Title = styled.div`
  flex-basis: 88px;
  margin-right: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80px;
`;

const ExerciseList = styled.div`
  flex: 1;
`;

const LayoutWrapper = styled.div`
  min-height: 90px;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
`;

const Date = styled.h3`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: grey;
`;

const Workout = props => {
  const {
    workoutRoutine : {
      data,
      date,
    },
  } = props;

  const exercises = data.map((e, i) =>
    <ExerciseListItem {...e} key={i} />
  );

  return (
    <BlockPanel>
      <LayoutWrapper>
        <Title>
          <Date>{date ? moment(date).format('dddd') : 'Next'}</Date>
          <Date>{date ? moment(date).format('D MMM') : ''}</Date>
        </Title>
        <ExerciseList>
          {exercises}
        </ExerciseList>
      </LayoutWrapper>
    </BlockPanel>
  );
};

Workout.propTypes = {
  workoutRoutine: PropTypes.object,
};

export default Workout;

