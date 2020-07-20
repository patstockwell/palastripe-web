import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  bannerHeight,
  gutterWidth,
  green,
  purple,
} from '../helpers/constants';

export const AppLogoStyle = `
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  font-weight: 900;
  font-style: italic;
  background-color: ${purple};
  background-image: linear-gradient(140deg, ${green}, ${purple});
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

const AppLogo = styled(Link)`
  position: absolute;
  left: 14px;
  top: 16px;
  text-decoration: none;
  font-size: 15px;
  ${AppLogoStyle}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
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
      <AppLogo to="/">palastripe</AppLogo>
      <Heading>{heading}</Heading>
    </Header>
  );
};
