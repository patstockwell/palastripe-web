import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyle } from './SharedStyles';
import { tileMinHeight } from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const FinishButton = styled.button`
  ${buttonStyle}
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

interface Props {
  clickHandler: () => void;
}

const FinishWorkoutButton: React.FC<Props> = ({
  clickHandler,
}) => (
  <FlexWrapper>
    <FinishButton onClick={clickHandler}>
      Finish Workout
    </FinishButton>
  </FlexWrapper>
);

export default FinishWorkoutButton;
