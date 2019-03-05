import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { purple } from '../helpers/constants';
import AlertConfirm, { buttonStyle } from './AlertConfirm';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 0 auto;
`;

const Message = styled.p`
  color: black;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const Button = styled.button`
  ${buttonStyle}
  background-color: ${({ background }) => background};
`;

const LinkButton = styled(Link)`
  ${buttonStyle}
  background-color: ${({ background }) => background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const AlertConfirmEndWorkout = ({
  continueWorkout,
  endWorkout,
  showAlert,
}) => (
  <AlertConfirm showAlert={showAlert} cancelAlert={continueWorkout}>
    <Message>Are you sure you want to finish this workout?</Message>
    <ButtonWrapper>
      <Button onClick={continueWorkout} background={'grey'}>No</Button>
      <LinkButton to="/home/" onClick={endWorkout} background={purple}>
        <span>Yes</span>
      </LinkButton>
    </ButtonWrapper>
  </AlertConfirm>
);

AlertConfirmEndWorkout.propTypes = {
  endWorkout: PropTypes.func,
  continueWorkout: PropTypes.func,
  showAlert: PropTypes.bool,
};

export default AlertConfirmEndWorkout;

