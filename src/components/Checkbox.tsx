import React from 'react';
import styled from 'styled-components';
import { CircleTick } from '../assets/svg/CircleTick';
import { AdditionSymbol } from '../assets/svg/AdditionSymbol';
import { checkboxWrapperStyle } from '../components/SharedStyles';

const IconWrapper = styled.div<{ bg?: string }>`
  ${checkboxWrapperStyle}
  ${props => props.bg && `background: ${props.bg}`}
`;

interface CheckboxTickProps {
  checked: boolean;
  animate?: boolean;
  onAnimationEnd?: () => void;
}

export const CheckboxTick: React.FC<CheckboxTickProps> = ({
  onAnimationEnd,
  animate,
  checked,
}) => (
  <IconWrapper>
    {checked && <CircleTick onAnimationEnd={onAnimationEnd} animate={animate}/>}
  </IconWrapper>
);

export const CheckboxCross: React.FC<{ checked?: boolean }> =
  ({ checked = true }) => (
    <IconWrapper bg={'orange'}>
      {checked && <AdditionSymbol style={{ transform: 'rotateZ(45deg)' }} />}
    </IconWrapper>
  );

