import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LayoutTile from '../components/LayoutTile';
import ScrollingWorkoutTile from '../components/ScrollingWorkoutTile';

export const ScrollContainer = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  white-space: nowrap;
  overflow-y: hidden;
  overflow: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
  margin: 8px;
`;

const PlanName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  margin: 8px;
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

const WorkoutPlanTile = ({ plan }) => {
  const tiles = plan.workouts.map(w =>
    <ScrollingWorkoutTile key={w.id} workout={w} />
  );
  const { name, workouts: { length } } = plan;

  return (
    <LayoutTile>
      <PlanName>{name}</PlanName>
      <Hr />
      <PlanDetail>{length} {length === 1 ? 'day' : 'days'} / week</PlanDetail>
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

