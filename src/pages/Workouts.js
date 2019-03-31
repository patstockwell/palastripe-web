import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';

const Big = styled.div`
  height: 2000px;
`;

const Workouts = ({ location }) => (
  <Big>
    <Banner heading={'Workouts'}/>
    <p>something here</p>
    <p>something here</p>
    <p>something here</p>
    <Navigation pathname={location.pathname}/>
  </Big>
);

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Workouts);

