import React from 'react';
import styled from 'styled-components';
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
  box-shadow: 0px 4px 12px lightgrey;
  display: inline-block;
  width: 80%;
  scroll-snap-align: center;
  scroll-padding: 50%;
  background-color: whitesmoke;
`;

const ScrollingTile = ({ workout }) => {
  const exercises = workout.exercises.map(e =>
    <div key={e.id}>{e.name}, {e.weightInKilos}kg</div>
  );

  return (
    <WorkoutTile>
      <h5>{workout.name}</h5>
      {exercises}
    </WorkoutTile>
  );
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
export default WorkoutPlanTile;

