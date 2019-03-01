import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExerciseListItem from '../components/ExerciseListItem';
import LayoutTile from '../components/LayoutTile';

const WorkoutTile = styled(LayoutTile)`
  box-shadow: 0px 3px 14px rgba(0,0,0,0.3);
  display: inline-block;
  width: 85%;
  scroll-snap-align: center;
  scroll-padding: 50%;
  background-color: whitesmoke;
`;

const WorkoutDetail = styled.p`
  color: grey;
  font-size: 14px;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const ExerciseListWrapper = styled.div`
  margin: 4px;
`;

export const calculateWorkoutTime = exercises => (
  exercises.reduce((acc, curr) => (
    // 3 minutes per set, plus 2 minutes to set up the exercise
    (curr.sets.length * 3) + acc + 2
  ), 0)
);

const ScrollingWorkoutTile = ({ workout }) => {
  const exerciseList = workout.exercises.map(e =>
    <ExerciseListItem key={e.name} small showAllSets {...e} />
  );

  const minutes = calculateWorkoutTime(workout.exercises);

  return (
    <WorkoutTile>
      <DetailWrapper>
        <h5>{workout.name}</h5>
        <WorkoutDetail>&asymp; {minutes}min</WorkoutDetail>
      </DetailWrapper>
      <ExerciseListWrapper>
        {exerciseList}
      </ExerciseListWrapper>
    </WorkoutTile>
  );
};

ScrollingWorkoutTile.propTypes = {
  workout: PropTypes.object,
};

export default ScrollingWorkoutTile;
