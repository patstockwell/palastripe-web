import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThreeBars } from '../assets/svg/ThreeBars';

import { bannerHeight, gutterWidth } from '../helpers/constants';

export const AppLogoStyle = `
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  font-weight: 900;
  font-style: italic;
  background-clip: text;
  -webkit-background-clip: text;
  color: black;
`;

const AppLogo = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  ${AppLogoStyle}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  z-index: 3;
  overflow: hidden;
  min-height: ${bannerHeight}px;
  position: sticky;
  top: 0;
  padding: 0 ${gutterWidth}px;
`;

const Heading = styled.p`
  font-weight: 800;
  margin: 0;
`;

interface Props {
  heading?: string;
}

export const Banner: React.FC<Props> = ({ heading }) => {

  return (
    <Header>
      <AppLogo to="/">
        <ThreeBars style={{
          margin: '0 0.3em',
          transform: 'rotate(45deg)',
          height: '10px',
          width: '10px',
        }}/>
        palastripe
      </AppLogo>
      <Heading>{heading}</Heading>
    </Header>
  );
};
