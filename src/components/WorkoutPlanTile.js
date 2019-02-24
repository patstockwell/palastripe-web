import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExerciseList from '../components/ExerciseList';
import LayoutTile from '../components/LayoutTile';

export const ScrollContainer = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  white-space: nowrap;
  overflow-y: hidden;
  overflow: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
  margin: 8px;
`;

const WorkoutTile = styled(LayoutTile)`
  box-shadow: 0px 3px 14px rgba(0,0,0,0.3);
  display: inline-block;
  width: 85%;
  scroll-snap-align: center;
  scroll-padding: 50%;
  background-color: whitesmoke;
`;

const PlanName = styled.h2`
  text-transform: uppercase;
  margin: 8px;
  font-weight: 400;
  font-size: 20px;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgray;
  margin: 0 8px;
`;

const PlanDetail = styled.p`
  margin: 8px;
  color: grey;
  font-size: 14px;
`;

const ScrollingTile = ({ workout }) => {
  const exercises = workout.exercises.map(e =>
    <ExerciseList key={e.name} small showAllSets {...e} />
  );

  const minutes = workout.exercises.reduce((acc, curr) => (
    // 3 minutes per set, plus 2 minutes to set up the exercise
    (curr.sets.length * 3) + acc + 2
  ), 0);

  return (
    <WorkoutTile>
      <PlanDetail>&asymp; {minutes}min</PlanDetail>
      <h5>{workout.name}</h5>
      {exercises}
    </WorkoutTile>
  );
};

ScrollingTile.propTypes = {
  workout: PropTypes.object,
};

const WorkoutPlanTile = ({ plan }) => {
  const tiles = plan.workouts.map(w =>
    <ScrollingTile key={w.id} workout={w} />
  );

  const numberOfExercises = plan.workouts.reduce((acc, curr) => (
    curr.exercises.length + acc
  ), 0);

  return (
    <LayoutTile>
      <PlanName>{plan.name}</PlanName>
      <Hr />
      <PlanDetail>{plan.workouts.length} alternating workouts</PlanDetail>
      <PlanDetail>{numberOfExercises} exercises</PlanDetail>
      <ScrollContainer>
        {tiles}
      </ScrollContainer>
    </LayoutTile>
  );
};

WorkoutPlanTile.propTypes = {
  plan: PropTypes.object,
};

export default WorkoutPlanTile;

