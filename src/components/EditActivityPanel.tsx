import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import {
  Activity, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { buttonStyle } from './SharedStyles';
import { purple } from '../helpers/constants';
import { isTimed } from '../helpers/types';

const Button = styled.button<{ background?: string }>`
  ${buttonStyle}
  width: 120px;
`;

const ButtonLeftHalf = styled.button<{ background?: string }>`
  ${buttonStyle}
  border-radius: 30px 0 0 30px;
`;

const ButtonRightHalf = styled.button<{ background?: string }>`
  ${buttonStyle}
  border-radius: 0 30px 30px 0;
`;

const Background = styled.div`
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
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
  const transitions = useTransition(show, null, {
    from: {
      transform: `translateX(100%)`,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      opacity: 0,
    },
    enter: { opacity: 1, transform: 'translateX(6%)' },
    leave: { opacity: 0, transform: `translateX(100%)` },
    config: { mass: 1, tension: 710, friction: 40 },
  });

  const repsColour = isTimed(activity) ? 'grey' : purple;
  const timedColour = isTimed(activity) ? purple : 'grey';

  return (
    <React.Fragment>
      {transitions.map(({ item, props }) => {
        return item ?
          <animated.div key={'unique'} style={props}>
            <Background />
            <Dialog>
              <h2>{activity.name}</h2>
              <ButtonLeftHalf background={repsColour}>With Reps</ButtonLeftHalf>
              <ButtonRightHalf background={timedColour}>With Timer</ButtonRightHalf>
              <Button background={'grey'} onClick={hide}>Cancel</Button>
              <Button background={purple}>Save</Button>
            </Dialog>
          </animated.div>
          : null;
      })}
    </React.Fragment>
  );
};

export default EditActivityPanel;
