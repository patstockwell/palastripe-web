import React, { useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { GlobalOverFlowHiddenStyle } from '../components/SharedStyles';
import { appMaxWidth } from '../helpers/constants';

const bounceSpace = 9;
const popUpHeight = 353 + bounceSpace;

const Background = styled.div`
  width: 100vw;
  height: calc(100vh + ${popUpHeight}px);
  transform: translateY(-${popUpHeight - bounceSpace}px);
  background-color: rgba(0, 0, 0, 0.6);
`;

const Dialog = styled.div`
  background-color: white;
  border-radius: 24px 24px 0 0;
  height: ${popUpHeight}px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: ${appMaxWidth}px;
  transform: translateX(-50%);
  left: 50%;
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
  onClose?: () => void;
}

const AlertConfirm: React.FC<Props> = ({
  children,
  showAlert,
  cancelAlert,
  message,
  onClose,
}) => {
  const backgroundRef = useRef(null);
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
    config: { mass: 1, tension: 710, friction: 40 },
    onDestroyed: () => { if (onClose) { onClose(); } },
  });

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // only cancel alert if background was clicked
    if (e.target === backgroundRef.current) {
      cancelAlert();
    }
  };

  return (
    <React.Fragment>
      {transitions.map(({ item, props }) => {
        return item ?
          <animated.div key={'unique'} style={props}>
            <GlobalOverFlowHiddenStyle hidden={showAlert} />
            <Background ref={backgroundRef} onClick={clickHandler}>
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
