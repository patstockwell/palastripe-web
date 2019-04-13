import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const bounceSpace = 7;
const popUpHeight = 253 + bounceSpace;

export const buttonStyle = `
  color: white;
  border: none;
  border-radius: 25px;
  height: 50px;
  width: 100px;
  font-size: 16px;
  margin: 0 15px;
`;

export const Button = styled.button`
  ${buttonStyle}
  background-color: ${({ background }) => background};
`;

export const LinkButton = styled(Link)`
  ${buttonStyle}
  background-color: ${({ background }) => background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
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

const AlertConfirm = ({
  children,
  showAlert,
  cancelAlert,
  message,
}) => {
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpHeight}px)`,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      zIndex: 10,
    },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: `translateY(${popUpHeight}px)` },
    config: { mass: 1, tension: 710, friction: 40 }
  });

  return transitions.map(({ item, props }) => {
    return item ?
      <animated.div key={'unique'} style={props}>
        <Background>
          <ClickableSpace onClick={cancelAlert}/>
          <Dialog>
            <Message>{message}</Message>
            <ButtonWrapper>
              {children}
            </ButtonWrapper>
          </Dialog>
        </Background>
      </animated.div>
      : null;
  });
};

export default AlertConfirm;

