import React, { useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { GlobalOverFlowHiddenStyle, buttonStyle } from '../components/SharedStyles';
import { appMaxWidth, gutterWidth } from '../helpers/constants';
import { Link } from 'react-router-dom';

const bounceSpace = 9;
const popUpHeight = 353 + bounceSpace;

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

  // use min height here instead of height so that the dialog can take any
  // number of children (buttons) and still stack upwards. If the height is
  // larger than the translate, it won't matter, as it is accompanied by
  // opacity and look fine sliding in from half height.
  min-height: ${popUpHeight}px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: ${appMaxWidth}px;
  transform: translateY(${popUpHeight + bounceSpace}px);
`;

const ButtonWrapper = styled.div`
  width: 280px;
  margin: 0 auto;
`;

export const ConfirmButton = styled.button<{ fontColour?: string, background?: string }>`
  ${buttonStyle}
  display: block;
  margin: ${gutterWidth}px 0;
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
  padding: 20px;
  text-align: center;
  margin: 15px auto;
`;

interface Props {
  showAlert: boolean;
  cancelAlert: () => void;
  onClose?: () => void;
}

export const AlertConfirm: React.FC<Props> = ({
  children,
  showAlert,
  cancelAlert,
  onClose,
}) => {
  const backgroundRef = useRef(null);
  const transitions = useTransition(showAlert, null, {
    from: {
      transform: `translateY(${popUpHeight}px)`,
      opacity: 0,
    },
    enter: { opacity: 1, transform: `translateY(${bounceSpace}px)` },
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
          <FixedWrapper key={'unique'} style={{ opacity: props.opacity }}>
            <GlobalOverFlowHiddenStyle hidden={showAlert} />
            <Background ref={backgroundRef} onClick={clickHandler}>
              <Dialog style={props}>
                <ButtonWrapper>
                  {children}
                </ButtonWrapper>
              </Dialog>
            </Background>
          </FixedWrapper>
          : null;
      })}
    </React.Fragment>
  );
};
