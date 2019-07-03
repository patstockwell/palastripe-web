import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { purple } from '../helpers/constants';

const Button = styled(Link)`
  background-color: ${purple};
  color: white;
  text-decoration: none;
  padding: 16px;
  box-sizing: border-box;
  margin: 16px;
  display: inline-block;
  border-radius: 25px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 800;
`;

const FourZeroFour = () => (
  <div>
    <Helmet title="404 Page not found" />
    <h2>Uh oh, 404</h2>
    <Button to="/workouts/">Go to workouts</Button>
  </div>
);

export default FourZeroFour;

