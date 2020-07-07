import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  bannerHeight,
  gutterWidth,
  pink,
  purple,
} from '../helpers/constants';

export const AppLogoStyle = `
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  font-size: 16px;
  font-weight: 900;
  font-style: italic;
  border-radius: 5px;
  padding: 3px 9px;
  background-color: ${purple};
  background-image: linear-gradient( 140deg, ${pink}, ${purple});
`;

const AppLogo = styled(Link)`
  position: absolute;
  left: ${gutterWidth}px;
  top: 11px;
  text-decoration: none;
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
`;

interface Props {
  heading?: string;
}

const Banner: React.FC<Props> = ({ heading }) => {

  return (
    <Header>
      <AppLogo to="/">hbff</AppLogo>
      <Heading>{heading}</Heading>
    </Header>
  );
};

export default Banner;
