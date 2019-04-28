import React from 'react';
import styled from 'styled-components';
import { activeWorkoutWindowHeight } from '../helpers/constants';

const Window = styled.div`
  position: sticky;
  top: 0;
  height: ${activeWorkoutWindowHeight}px;
  border-bottom: 1px solid lightgrey;
  box-sizing: border-box;
  z-index: 2;
  background-color: white;
`;

const ActiveWorkoutWindow = () => (
  <Window>
    This is the window
  </Window>
);

export default ActiveWorkoutWindow;
