import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppLogoStyle } from '../components/Banner';
import { buttonStyle } from '../components/SharedStyles';
import { ColouredDot } from '../assets/svg/ColouredDot';
import { green } from '../helpers/constants';

const Logo = styled.h1`
  ${AppLogoStyle}
  display: inline-block;
`;

const StartButton = styled(Link)`
  ${buttonStyle}
  display: inline-block;
  background: black;
`;

const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

export const LandingSplash: React.FC = () => {
  // Use a javascript single space in quotes to explicitly show trailing space.
  return (
    <Page>
      <Logo>hbff</Logo>
      <p>
        Track your gym workouts to get{' '}
        <strong>harder</strong>,{' '}
        <strong>better</strong>,{' '}
        <strong>faster</strong>,{' '}
        <strong>fitter</strong>.{' '}
      </p>
      <StartButton to="/workouts/">
        <ColouredDot fill={green} />
        Start a workout
      </StartButton>
    </Page>
  );
};
