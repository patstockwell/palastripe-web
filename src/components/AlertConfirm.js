import React from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { purple } from '../helpers/constants';

const bounceSpace = 50;
const popUpHeight = 200 + bounceSpace;

const slideUp = keyframes`
  0% {
    transform: translateY(${popUpHeight}px);
  }

  70% {
    transform: translateY(0px);
  }

  85% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0px);
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh + ${popUpHeight}px);
  transform: translateY(-${popUpHeight - bounceSpace}px);
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
  background-color: white;
  border-radius: 5px 5px 0 0;
  height: ${popUpHeight}px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  // animation: ${slideUp} 300ms ease-in-out;
`;

const Message = styled.p`
  color: black;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 0 auto;
`;

const buttonStyle = `
  color: white;
  border: none;
  border-radius: 5px;
  height: 50px;
  width: 100px;
  font-size: 20px;
  margin: 0 15px;
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

const ClickableSpace = styled.div`
  height: 100%;
  transform: translateY(-${popUpHeight}px);
`;

const AlertConfirm = ({ showAlert, endWorkout, setShowAlert }) => {
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpHeight}px)`,
      position: `absolute`,
      top: 0,
      left: 0,
      opacity: 0,
    },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(${popUpHeight}px)` },
    config: { tension: 810, friction: 40 }
  });

  return transitions.map(({ item, props }) => {
    return item ?
      <animated.div key={'unique'} style={props}>
        <Background>
          <ClickableSpace onClick={() => setShowAlert(false)}/>
          <Dialog>
            <Message>Are you sure you want to finish this workout?</Message>
            <ButtonWrapper>
              <Button onClick={() => setShowAlert(false)} background={'grey'}>No</Button>
              <LinkButton to="/home/" onClick={endWorkout} background={purple}>
                <span>Yes</span>
              </LinkButton>
            </ButtonWrapper>
          </Dialog>
        </Background>
      </animated.div>
      : null
  });
};

AlertConfirm.propTypes = {
  endWorkout: PropTypes.func,
  setShowAlert: PropTypes.func,
  showAlert: PropTypes.bool,
};

export default AlertConfirm;

