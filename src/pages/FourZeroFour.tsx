import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { buttonStyle } from '../components/SharedStyles';

const Button = styled(Link)`
  ${buttonStyle}
  display: inline-block;
  margin: 16px;
`;

const FourZeroFour: React.FC<{}> = () => (
  <div>
    <Helmet title="404 Page not found" />
    <h2>Uh oh, 404</h2>
    <Button to="/workouts/">Go to workouts</Button>
  </div>
);

export default FourZeroFour;
