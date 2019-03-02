import React from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const bounceSpace = 7;
const popUpHeight = 253 + bounceSpace;

export const buttonStyle = `
  color: white;
  border: none;
  border-radius: 5px;
  height: 50px;
  width: 100px;
  font-size: 20px;
  margin: 0 15px;
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
`;

const ClickableSpace = styled.div`
  height: 100%;
  transform: translateY(-${popUpHeight}px);
`;

const AlertConfirm = ({ children, showAlert, setShowAlert }) => {
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpHeight}px)`,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
    },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: `translateY(${popUpHeight}px)` },
    config: { mass: 1, tension: 710, friction: 40 }
  });

  return transitions.map(({ item, props }) => {
    return item ?
      <animated.div key={'unique'} style={props}>
        <Background>
          <ClickableSpace onClick={() => setShowAlert(false)}/>
          <Dialog>
            {children}
          </Dialog>
        </Background>
      </animated.div>
      : null;
  });
};

AlertConfirm.propTypes = {
  endWorkout: PropTypes.func,
  setShowAlert: PropTypes.func,
  showAlert: PropTypes.bool,
};

export default AlertConfirm;

