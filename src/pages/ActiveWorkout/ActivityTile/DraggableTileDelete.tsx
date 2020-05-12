import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const deleteButtonWidth = 100;
const restingPositionLeft = -deleteButtonWidth;
const snapThresholdLeft = -70;

const Button = styled.button`
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: red;
  width: ${deleteButtonWidth}px;
  border: none;
`;

const SlidingLayer = styled(animated.div)`
  z-index: 4;
  background-color: white;
  position: relative;
`

const SlidingTray = styled.div`
  position: relative;
`;

export const DraggableTileDelete: React.FC = ({ children }) => {
  const [{ x }, set] = useSpring(() => ({
    x: 0,
    config: { mass: 1, tension: 710, friction: 40 },
  }))

  const bind = useDrag(({ last, down, movement: [jx, jy] }) => {
    if (last) { // reset the scroll when swiping has finished.
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    if (jy < -15 || jy > 15 && x.getValue() === 0) {
      // if we have scrolled more than 15px, do not trigger swipe
      return;
    }

    if (jx < -15) { // disable scroll for better horizontal swiping
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }

    if (jx > 0) {
      // do nothing if swiping past the right hand side of the screen
    } else if (jx < snapThresholdLeft) {
      set({ x: restingPositionLeft }) // snap to resting position
    } else {
      set({ x: down ? jx : 0 }) // else snap back to zero when you let go.
    }
  })

  return (
    <SlidingTray>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
      <SlidingLayer
        {...bind()}
        style={{ x }}
      >
        {children}
      </SlidingLayer>
    </SlidingTray>
  );
};
