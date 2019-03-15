import React from 'react';
import PropTypes from 'prop-types';
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
  justify-content: space-between;
  align-items: center;
  height: ${bannerHeight}px;
  background-color: white;
  border-bottom: solid 0.5px grey;
`;

const BannerForActiveWorkout = ({ showConfirmation }) => (
  <Header>
    <StyledLink to="/home/">
      <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
      <BackArrow style={{ fill: 'grey' }} /> Back
    </StyledLink>
    <StyledLink to="/home/" onClick={showConfirmation}>
      Done
    </StyledLink>
  </Header>
);

BannerForActiveWorkout.propTypes = {
  showConfirmation: PropTypes.func.isRequired,
};

export default BannerForActiveWorkout;

