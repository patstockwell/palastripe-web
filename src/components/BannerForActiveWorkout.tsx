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
  z-index: 2;
  background-color: white
`;

const BannerForActiveWorkout = () => {
  return (
    <Header>
      <StyledLink to={{ pathname: '/workouts/', state: { immediate: false } }}>
        <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
        <BackArrow style={{ fill: 'grey' }} /> Back
      </StyledLink>
    </Header>
  );
};

export default BannerForActiveWorkout;

