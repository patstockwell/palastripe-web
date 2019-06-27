import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonStyle } from './SharedStyles';

const bounceSpace = 7;
const popUpHeight = 253 + bounceSpace;

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
  width: 100vw;
  height: calc(100vh + ${popUpHeight}px);
  transform: translateY(-${popUpHeight - bounceSpace}px);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
  background-color: white;
  border-radius: 24px 24px 0 0;
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
  width: 280px;
  margin: 0 auto;
`;

const Message = styled.p`
  color: black;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

interface Props {
  showAlert: boolean;
  cancelAlert: () => void;
  message: string;
}

const AlertConfirm: React.FC<Props> = ({
  children,
  showAlert,
  cancelAlert,
  message,
}) => {
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpHeight}px)`,
      position: 'fixed',
      top: 0,
      left: 0,
      opacity: 0,
      zIndex: 10,
    },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: `translateY(${popUpHeight}px)` },
    config: { mass: 1, tension: 710, friction: 40 }
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, props }) => {
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
      })}
    </React.Fragment>
  );
};

export default AlertConfirm;

