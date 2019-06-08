import React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from './SharedStyles';
import { tileMinHeight } from '../helpers/constants';

const FinishButton = styled.button`
  ${ButtonStyle}
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

const FinishWorkoutButton = () => (
  <FlexWrapper>
    <FinishButton>Finish Workout</FinishButton>
  </FlexWrapper>
);

export default FinishWorkoutButton;
