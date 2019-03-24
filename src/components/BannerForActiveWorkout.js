import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackArrow from '../assets/svg/BackArrow';
import AlertConfirm, { Button, LinkButton } from '../components/AlertConfirm';
import { purple, bannerHeight } from '../helpers/constants';

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

const BannerForActiveWorkout = ({ endWorkout }) => {
  const [showAlertEndWorkout, setShowAlertEndWorkout] = useState(false);

  const showConfirmation = e => {
    e.preventDefault();
    setShowAlertEndWorkout(true);
  };

  return (
    <Header>
      <StyledLink to="/home/">
        <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
        <BackArrow style={{ fill: 'grey' }} /> Back
      </StyledLink>
      <StyledLink to="/home/" onClick={showConfirmation}>
        Done
      </StyledLink>

      <AlertConfirm
        cancelAlert={() => setShowAlertEndWorkout(false)}
        showAlert={showAlertEndWorkout}
        message={'Are you sure you want to finish this workout?'}
      >
        <Button onClick={() => setShowAlertEndWorkout(false)} background={'grey'}>No</Button>
        <LinkButton to="/home/" onClick={endWorkout} background={purple} >
          <span>Yes</span>
        </LinkButton>
      </AlertConfirm>
    </Header>
  );
};

export default BannerForActiveWorkout;

