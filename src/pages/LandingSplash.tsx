import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DownloadArrow } from '../assets/svg/DownloadArrow';
import { buttonStyle } from '../components/SharedStyles';
import { ColouredDot } from '../assets/svg/ColouredDot';
import { gutterWidth, green, bannerHeight } from '../helpers/constants';
import { ThreeBars } from '../assets/svg/ThreeBars';

const LogoWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-style: italic;
  font-size: 2em;
  border-radius: 0;
  padding: 0;
  margin-left: 8px;
  color: black;
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
  padding: 0 ${gutterWidth}px;
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
      <LogoWrapper>
        <ThreeBars style={{
          margin: '0 0.3em',
          transform: 'rotate(45deg)',
          fill: 'black',
        }}/>
        <Logo>
          palastripe
        </Logo>
      </LogoWrapper>
      <p>Track your gym workouts, visualise your progress, and meet your strength training goals with <strong>palastripe</strong>.</p>
      <StartButton to="/workouts/">
        <ColouredDot fill={green} />
        Start a workout
      </StartButton>
    </Page>
  );
};
