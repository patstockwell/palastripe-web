import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {ButtonBaseWithLink} from '../components/SharedStyles';

const Button = styled(ButtonBaseWithLink)`
  margin: 16px;
`;

export const FourZeroFour: React.FC<{}> = () => (
  <div>
    <Helmet title="404 Page not found" />
    <h2>Uh oh, 404</h2>
    <Button to="/workouts/">Go to workouts</Button>
  </div>
);
