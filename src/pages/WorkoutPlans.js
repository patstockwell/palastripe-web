import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import BackSplash from '../components/BackSplash';
import EmptyTile from '../components/EmptyTile';
import Navigation from '../components/Navigation';
import WorkoutPlanTile from '../components/WorkoutPlanTile';
import Banner from '../components/Banner';
import { tileMinHeight, green, yellow } from '../helpers/constants';

const BottomScreenSpace = styled.div`
  height: ${2 * tileMinHeight}px;
`;

const WorkoutPlans = ({ entities, location }) => {
  const {
    plans: { byId: byPlan, allIds: allPlans },
    workouts: { byId: byWorkout },
    exercises: { byId: byExercise },
  } = entities;

  const plans = allPlans.map(p => ({
    name: byPlan[p].name,
    id: byPlan[p].id,
    workouts: byPlan[p].workouts.map(w => {
      const { name, id, order, exercises } = byWorkout[w];

      return {
        name: name,
        id: id,
        exercises: order.map(e => ({
          ...byExercise[e], // data from exercise entity
          ...exercises[e], // data from workout entity
          sets: exercises[e].sets.map(s => ({ max: s }))
        })),
      };
    })
  }));

  const tiles = plans.map(p => <WorkoutPlanTile key={p.id} plan={p} />);

  return (
    <BackSplash topLeft={green} bottomRight={yellow}>
      <Banner />
      {tiles}
      <Navigation pathname={location.pathname}/>
      <EmptyTile>
        + Create you own workout plan - coming soon
      </EmptyTile>
      <BottomScreenSpace />
    </BackSplash>
  );
};

const mapStateToProps = state => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(WorkoutPlans);

