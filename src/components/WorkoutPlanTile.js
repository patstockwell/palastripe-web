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
`;

const WorkoutTile = styled(LayoutTile)`
  box-shadow: 0px 3px 14px rgba(0,0,0,0.3);
  display: inline-block;
  width: 80%;
  scroll-snap-align: center;
  scroll-padding: 50%;
  background-color: whitesmoke;
`;

const ScrollingTile = ({ workout }) => {
  const exercises = workout.exercises.map(e =>
    <ExerciseList key={e.name} small showAllSets {...e} />
  );

  return (
    <WorkoutTile>
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

  return (
    <LayoutTile>
      <div>{plan.name}</div>
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

