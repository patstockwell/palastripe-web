import React, {useState} from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { orange } from '../../../helpers/constants';
import AlertConfirm from '../../../components/AlertConfirm';
import { buttonStyle } from '../../../components/SharedStyles';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';

const deleteButtonWidth = 100;
const restingPositionLeft = -deleteButtonWidth;
const snapThresholdLeft = -70;

const ConfirmButton = styled.button<{ background?: string }>`
  ${buttonStyle}
`;

const DeleteButton = styled(animated.button)`
  height: 100%;
  position: absolute;
  right: -${deleteButtonWidth}px;
  top: 0;
  background-color: ${orange}
  width: ${deleteButtonWidth}px;
  border: none;
`;

const SlidingLayer = styled(animated.div)`
  position: relative;
`;

const SlidingTray = styled.div`
  position: relative;
`;

interface Props {
  id: string;
}

// TODO: Ensure that only one tray is open at a time.
export const DraggableTileDelete: React.FC<Props> = ({ id, children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { deleteActivity } = useActiveWorkout();
  const [{ x }, set] = useSpring(() => ({
    x: 0,
    config: { mass: 1, tension: 710, friction: 40 },
  }));

  const bind = useDrag(({ last, down, movement: [jx, jy] }) => {
    if (last) { // reset the scroll when swiping has finished.
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    if (jy < -15 || jy > 15) {
      // if we have scrolled more than 15px, do not trigger swipe
      return;
    }

    if (jx < -15 && !last) { // disable scroll for better horizontal swiping
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }

    if (jx > 0) {
      // do nothing if swiping past the right hand side of the screen
    } else if (jx < snapThresholdLeft) {
      set({ x: restingPositionLeft }); // snap to resting position
    } else {
      set({ x: down ? jx : 0 }); // else snap back to zero when you let go.
    }
  });

  return (
    <>
      <SlidingTray>
        <SlidingLayer
          {...bind()}
          style={{ x }}
        >
          {children}
        </SlidingLayer>
        <DeleteButton
          onClick={() => setShowAlert(true)}
          style={{ x }}
        >
          Delete
        </DeleteButton>
      </SlidingTray>
      <AlertConfirm
        showAlert={showAlert}
        message={'Delete this activity?'}
        cancelAlert={() => setShowAlert(false)}
      >
        <ConfirmButton onClick={() => setShowAlert(false)} background={'grey'}>
          No
        </ConfirmButton>
        <ConfirmButton onClick={() => deleteActivity(id)}>Yes</ConfirmButton>
      </AlertConfirm>
    </>
  );
};
