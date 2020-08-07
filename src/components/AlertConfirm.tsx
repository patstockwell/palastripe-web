import React, { useState, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import styled, { keyframes } from 'styled-components';

import { CheckboxTick } from '../components/Checkbox';
import { GlobalOverFlowHiddenStyle, buttonStyle } from '../components/SharedStyles';
import { appMaxWidth, gutterWidth } from '../helpers/constants';
import { Link } from 'react-router-dom';

const bounceSpace = 9;
const popUpSlideDistance = 353 + bounceSpace;

const CentrePanel = styled.div`
  margin: 0 auto;
  max-width: ${appMaxWidth}px;
  height: 100%;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

const FixedWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Dialog = styled(animated.div)`
  background-color: white;
  border-radius: 24px 24px 0 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${appMaxWidth}px;
  max-height: calc(100vh - 130px);
  overflow: scroll;
`;

const ButtonWrapper = styled.div`
  width: 320px;
  margin: 0 auto 40px;
  padding: ${gutterWidth}px;
  padding-top: 0;
  box-sizing: border-box;
`;

export const ConfirmButton = styled.button<{ fontColour?: string, background?: string }>`
  ${buttonStyle}
  display: block;
  margin-top: ${gutterWidth}px;
  width: 100%;
`;

export const ConfirmButtonLink = styled(Link)<{ background?: string; fontColour?: string; }>`
  ${buttonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const MessageText = styled.p`
  color: black;
  padding: 24px ${gutterWidth}px;
  text-align: center;
  margin: 0 auto;
  position: sticky;
  top: 0;
  background: rgba(256, 256, 256, 0.98);
`;

interface Props {
  showAlert: boolean;
  cancelAlert: () => void;
  onClose?: () => void;
  messageText?: string;
}

export const AlertConfirm: React.FC<Props> = ({
  children,
  showAlert,
  cancelAlert,
  onClose,
  messageText,
}) => {
  const backgroundRef = useRef(null);
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpSlideDistance}px)`,
      opacity: 0,
    },
    enter: { opacity: 1, transform: `translateY(${bounceSpace}px)` },
    leave: { opacity: 0, transform: `translateY(${popUpSlideDistance}px)` },
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
    <>
      {transitions.map(({ item, props }) => {
        return item ?
          <FixedWrapper key={'unique'} style={{ opacity: props.opacity }}>
            <GlobalOverFlowHiddenStyle hidden={showAlert} />
            <Background>
              <CentrePanel ref={backgroundRef} onClick={clickHandler}>
                <Dialog style={props}>
                  <ButtonWrapper>
                    <MessageText>{messageText}</MessageText>
                    {children}
                  </ButtonWrapper>
                </Dialog>
              </CentrePanel>
            </Background>
          </FixedWrapper>
          : null;
      })}
    </>
  );
};

const scale = keyframes `
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  animation: ${scale} 0.5s linear;
`;

interface SuccessAlertProps {
  message: string;
  showMessage: boolean;
  setShowMessage: (show: boolean) => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  message,
  setShowMessage,
  showMessage,
}) => {
  const [ showCircleTick, setShowCircleTick ] = useState(false);

  return (
    <AlertConfirm
      cancelAlert={() => setShowMessage(false)}
      showAlert={showMessage}
      onClose={() => setShowCircleTick(false)}
      messageText={message}
    >
      <IconWrapper onAnimationEnd={() => setShowCircleTick(true)}>
        <CheckboxTick
          checked={showCircleTick}
          onAnimationEnd={() => setShowMessage(false)}
        />
      </IconWrapper>
    </AlertConfirm>
  );
};
