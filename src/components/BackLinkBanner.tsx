import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackArrow from '../assets/svg/BackArrow';
import { bannerHeight } from '../helpers/constants';

const StyledLink = styled(Link)`
  color: grey;
  text-decoration: none;
  font-size: 17px;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 16px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: ${bannerHeight}px;
  z-index: 3;
  background-color: white
`;

interface Props {
  linkTo: string;
}

const backText = ' Back'; // <-- Leading space

const BackLinkBanner: React.FC<Props> = ({ linkTo }) => (
  <Header>
    <StyledLink to={{ pathname: linkTo , state: { immediate: false } }}>
      <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
      <BackArrow style={{ fill: 'grey' }} />
      {backText}
    </StyledLink>
  </Header>
);

export default BackLinkBanner;

