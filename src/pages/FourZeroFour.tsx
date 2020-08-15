import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {ButtonBaseWithLink} from '../components/SharedStyles';

const Button = styled(ButtonBaseWithLink)`
  margin: 16px;
`;

const H2 = styled.h2`
  text-align: center;
`;

export const FourZeroFour: React.FC<{}> = () => (
  <div>
    <Helmet title="404 Page not found" />
    <H2>Uh oh, page not found.</H2>
    <Button to="/workouts/">Go to workouts</Button>
  </div>
);
