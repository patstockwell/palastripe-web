import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const AlertConfirmEndWorkout = ({
  removeExercise,
  cancelRemove,
  showAlert,
}) => (
  <AlertConfirm showAlert={showAlert} cancelAlert={cancelRemove}>
    <Message>Are you sure you want to remove this exercise?</Message>
    <ButtonWrapper>
      <Button onClick={cancelRemove} background={'grey'}>No</Button>
      <Button
        onClick={() => {
          removeExercise();
          cancelRemove();
        }}
        background={purple}
      >
        Yes
      </Button>
    </ButtonWrapper>
  </AlertConfirm>
);

AlertConfirmEndWorkout.propTypes = {
  removeExercise: PropTypes.func,
  cancelRemove: PropTypes.func,
  showAlert: PropTypes.bool,
};

export default AlertConfirmEndWorkout;
