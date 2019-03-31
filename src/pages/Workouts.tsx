import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import { State, Workout } from '../helpers/types';

const Big = styled.div`
  height: 2000px;
`;

const Workouts = ({ location, workouts}) => {
  console.log(workouts);

  return (
    <Big>
      <Banner heading={'Workouts'}/>
      <p>something here</p>
      <p>something here</p>
      <p>something here</p>
      <Navigation pathname={location.pathname}/>
    </Big>
  );
};

const mapStateToProps = ({ entities: { workouts: { allIds, byId }}}: State) => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts };
};

export default connect(mapStateToProps)(Workouts);

