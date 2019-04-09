import React from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import BackArrow from '../assets/svg/BackArrow';
import { bannerHeight } from '../helpers/constants';

const StyledLink = styled(HashLink)`
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
  background-color: white;
`;

interface Props {
  hash: string;
}

const BannerForActiveWorkout = ({ hash }) => {
  return (
    <Header>
      <StyledLink to={`/workouts#${hash}`}>
        <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
        <BackArrow style={{ fill: 'grey' }} /> Back
      </StyledLink>
    </Header>
  );
};

export default BannerForActiveWorkout;

