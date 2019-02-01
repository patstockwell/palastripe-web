import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const GreenOverviewSlider = styled.div`
  background-color: green;
`

const BackArrow = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 30px;
`

const ActiveWorkoutOverview = () => (
  <GreenOverviewSlider>
    <BackArrow to="/">&#9667;</BackArrow>
    <p>some content</p>
  </GreenOverviewSlider>
)

export default ActiveWorkoutOverview;

