import React from 'react';
import styled from 'styled-components';
import CircleTick from '../../assets/svg/CircleTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';

const SelectComplete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  background-color: lightgrey;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  color: white;
  padding: 0;
`;

const SelectionArea = styled.button`
  padding: 0;
  order: 3;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: none;
`;

interface Props {
  toggleSetComplete: (completed?: boolean) => ReduxAction<SingleSetAction & {
    completed?: boolean,
  }>;
  completed: boolean;
}

const ToggleSetCompleteButton: React.FC<Props> = ({
  toggleSetComplete,
  completed,
}) => (
  <SelectionArea onClick={() => toggleSetComplete()}>
    <SelectComplete>
      {completed && <CircleTick />}
    </SelectComplete>
  </SelectionArea>
);

export default ToggleSetCompleteButton;
