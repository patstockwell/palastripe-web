import React from 'react';
import styled from 'styled-components';
import {CheckboxTick} from '../../../components/Checkbox';
import {selectCompleteButtonStyle} from './ActivityTileSharedStyles';

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface Props {
  handleClick: () => void;
  completed: boolean;
  onAnimationEnd: () => void;
}

export const ToggleSetCompleteButton: React.FC<Props> = ({
  handleClick,
  completed,
  onAnimationEnd,
}) => (
  <SelectCompleteButton onClick={handleClick}>
    <CheckboxTick checked={completed} onAnimationEnd={onAnimationEnd} />
  </SelectCompleteButton>
);
