import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import BlockPanel from './BlockPanel';
import { exercisePropType } from '../helpers/data';
import { zipSets } from '../helpers/functions';

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

const ListItem = ({ sets, completedSets = [], name, weightInKilos }) => {
  const setCount = zipSets(sets, completedSets)
    .map(({ completed }) => completed ? completed : '-').join('/');

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName>{name}</ExerciseName>
      <Sets>{setCount}</Sets>
      <Weight>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
};

ListItem.propTypes = exercisePropType;

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

const LayoutWrapper = styled(BlockPanel)`
  display: flex;
`;

const Date = styled.h3`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: grey;
`;

const Workout = ({ onGoing, workoutRoutine: { exercises, date }}) => {

  const exerciseTiles = exercises.map((e, i) =>
    <ListItem {...e} key={i} />
  );

  const ActiveExerciseTitle = onGoing ? 'On Going' : 'Up Next';

  return (
    <LayoutWrapper>
      <Title>
        <Date>{date ? moment(date).format('dddd') : ActiveExerciseTitle}</Date>
        <Date>{date ? moment(date).format('D MMM') : ''}</Date>
      </Title>
      <ExerciseList>
        {exerciseTiles}
      </ExerciseList>
    </LayoutWrapper>
  );
};

Workout.propTypes = {
  onGoing: PropTypes.bool,
  workoutRoutine: PropTypes.object,
};

const mapStateToProps = state => ({
  onGoing: state.activeWorkoutOnGoing,
});

export default connect(mapStateToProps)(Workout);

