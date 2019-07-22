import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import {
  Activity, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { buttonStyle } from './SharedStyles';
import { gutterWidth, purple } from '../helpers/constants';

const TRANSLATE_X_SIZE = 6;
const BOUNCE_SPACE = 9;

const Button = styled.button<{ fontColour?: string, background?: string }>`
  ${buttonStyle}
  width: 120px;
`;

const buttonStyleOverrides = `
  border: #6702ff 4px solid;
  margin: 0;
  padding: 11px 25px;
  flex-grow: 1;
`;

const ButtonLeftHalf = styled.button<{ fontColour?: string, background?: string }>`
  ${buttonStyle}
  ${buttonStyleOverrides}
  border-radius: 30px 0 0 30px;
  border-right: none;
`;

const ButtonRightHalf = styled.button<{ fontColour?: string, background?: string }>`
  ${buttonStyle}
  ${buttonStyleOverrides}
  border-radius: 0 30px 30px 0;
  border-left: none;
`;

const Background = styled(animated.div)`
  position: absolute;
  right: 0;
  width: 200vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Dialog = styled.div`
  cursor: default;
  background-color: white;
  border-radius: 24px 0 0 24px;
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: calc(${100 - TRANSLATE_X_SIZE}vw + ${BOUNCE_SPACE}px);
  padding-right: ${BOUNCE_SPACE + gutterWidth}px;
  padding-left: ${gutterWidth}px;
  box-sizing: border-box;
`;

const DisplayArea = styled.div`
  position: relative;
  height: 100%;
`;

const ConfirmPanel = styled.div`
  position: absolute;
  bottom: 72px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const IsTimedPanel = styled.div`
  display: flex;
`;

interface Props {
  hide: () => void;
  onDestroyed?: () => void;
  show: boolean;
  activity: Activity;
  groupId: string;
  index: number;
}

const EditActivityPanel: React.FC<Props> = ({
  show,
  onDestroyed,
  hide,
  activity,
}) => {
  const [isTimed, setIsTimed] = useState(true);
  const transitions = useTransition(show, null, {
    from: {
      transform: 'translateX(100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      opacity: 0,
    },
    onDestroyed,
    enter: { opacity: 1, transform: `translateX(${TRANSLATE_X_SIZE}%)` },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    // This is the animation style for AlertConfirm popup
    config: { mass: 1, tension: 710, friction: 40 },
    // This is the animation style for a page transition
    // config: { tension: 410, friction: 40 },
  });

  const displayedActivity = activity; // || editableActivity;

  const repsBackground = isTimed ? 'white' : purple;
  const repsFontColour = isTimed ? 'grey' : 'white';

  const timedBackground = isTimed ? purple : 'white';
  const timedFontColour = isTimed ? 'white' : 'grey';

  return (
    <React.Fragment>
      {transitions.map(({ item, props }) => {
        return item ?
          <animated.div key={'unique'} style={{ ...props, opacity: 1 }}>
            <Background style={{ opacity: props.opacity }}/>
            <Dialog>
              <DisplayArea>
                <h2>{activity.name}</h2>
                <IsTimedPanel>
                  <ButtonLeftHalf
                    onClick={() => setIsTimed(false)}
                    fontColour={repsFontColour}
                    background={repsBackground}>With Reps</ButtonLeftHalf>
                  <ButtonRightHalf
                    onClick={() => setIsTimed(true)}
                    fontColour={timedFontColour}
                    background={timedBackground}>With Timer</ButtonRightHalf>
                </IsTimedPanel>

                <ConfirmPanel>
                  <Button background={'grey'} onClick={hide}>Cancel</Button>
                  <Button background={purple}>Save</Button>
                </ConfirmPanel>
              </DisplayArea>
            </Dialog>
          </animated.div>
          : null;
      })}
    </React.Fragment>
  );
};

export default EditActivityPanel;
