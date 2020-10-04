import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import styled from 'styled-components';
import { Activity } from '../helpers/types';
import {
  GlobalOverFlowHiddenStyle,
  ButtonBase,
  ButtonStyleProps,
} from './SharedStyles';
import { gutterWidth, purple } from '../helpers/constants';

const Button = styled(ButtonBase)<ButtonStyleProps>`
  width: 120px;
`;

const buttonStyleOverrides = `
  border: #6702ff 4px solid;
  margin: 0;
  padding: 11px 25px;
  flex-grow: 1;
`;

const ButtonLeftHalf = styled(ButtonBase)<ButtonStyleProps>`
  ${buttonStyleOverrides}
  border-radius: 30px 0 0 30px;
  border-right: none;
`;

const ButtonRightHalf = styled(ButtonBase)<ButtonStyleProps>`
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
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 0 ${gutterWidth}px;
  box-sizing: border-box;
`;

const DisplayArea = styled.div`
  position: relative;
  height: 100%;
`;

const ConfirmPanel = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8px;
`;

const IsTimedPanel = styled.div`
  display: flex;
`;

const FixedWrapper = styled(animated.div)`
  position: fixed;
`;

interface Props {
  hide: () => void;
  show: boolean;
  activity: Activity;
  groupId: string;
  index: number;
}

const EditActivityPanel: React.FC<Props> = ({
  show,
  hide,
  activity,
}) => {
  const [isTimed, setIsTimed] = useState(true);
  const [addGlobalStyle, setAddGlobalStyle] = useState(false);

  const transitions = useTransition(show, null, {
    from: {
      transform: 'translateX(100%)',
      top: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      opacity: 0,
    },
    // when the animation transition is complete and at rest ('destroyed'), set
    // the overflow style on the body to stop background scrolling.
    onDestroyed: () => setAddGlobalStyle(show),
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    config: { tension: 410, friction: 40 },
  });

  // const displayedActivity = activity; // || editableActivity;

  const repsBackground = isTimed ? 'white' : purple;
  const repsFontColour = isTimed ? 'grey' : 'white';

  const timedBackground = isTimed ? purple : 'white';
  const timedFontColour = isTimed ? 'white' : 'grey';

  return (
    <React.Fragment>
      {transitions.map(({ item, props }) => {
        return item ?
          <FixedWrapper key={'unique'} style={{ ...props, opacity: 1 }}>
            <GlobalOverFlowHiddenStyle hidden={addGlobalStyle} />
            <Background style={{ opacity: props.opacity }}/>

            <Dialog>
              <DisplayArea>
                <h2>{activity.name}</h2>
                <IsTimedPanel>
                  <ButtonLeftHalf
                    onClick={() => setIsTimed(false)}
                    color={repsFontColour}
                    background={repsBackground}>With Reps</ButtonLeftHalf>
                  <ButtonRightHalf
                    onClick={() => setIsTimed(true)}
                    color={timedFontColour}
                    background={timedBackground}>With Timer</ButtonRightHalf>
                </IsTimedPanel>

                <ConfirmPanel>
                  <Button
                    background={'grey'}
                    onClick={() => {
                      hide();
                      setAddGlobalStyle(false);
                    }}>Cancel</Button>
                  <Button background={purple}>Save</Button>
                </ConfirmPanel>
              </DisplayArea>
            </Dialog>
          </FixedWrapper>
          : null;
      })}
    </React.Fragment>
  );
};

export default EditActivityPanel;
