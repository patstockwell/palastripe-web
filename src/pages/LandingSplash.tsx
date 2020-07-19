import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DownloadArrow } from '../assets/svg/DownloadArrow';
import { AppLogoStyle } from '../components/Banner';
import { buttonStyle } from '../components/SharedStyles';
import { ColouredDot } from '../assets/svg/ColouredDot';
import { gutterWidth, green, bannerHeight, purple, pink } from '../helpers/constants';

const Logo = styled.h1`
  ${AppLogoStyle}
  display: inline-block;
  font-size: 3em;
  border-radius: 0;
  padding: 2px;
  color: transparent;
  background-clip: text;
  background-image: linear-gradient( 140deg, ${pink}, ${purple});
`;

const StartButton = styled(Link)`
  ${buttonStyle}
  display: inline-block;
  background: black;
`;

const Page = styled.div`
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const Install = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  margin-left: ${gutterWidth}px;
  font-weight: bold;
`;

const Banner = styled.div`
  height: ${bannerHeight}px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LandingSplash: React.FC = () => {
  return (
    <Page>
      <Banner>
        <Install to="/install/">
          <DownloadArrow style={{ marginRight: '8px', width: '20px', height: '20px' }}/>
          Install app
        </Install>
      </Banner>
      <Logo>hbff</Logo>
      <p>
        {/* Use a javascript quotes to explicitly show trailing space. */}
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
