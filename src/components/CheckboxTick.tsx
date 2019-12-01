import React from 'react';
import styled from 'styled-components';
import CircleTick from '../assets/svg/CircleTick';
import { checkboxWrapperStyle } from '../components/ActivityTile/ActivityTileSharedStyles';

const IconWrapper = styled.div`
  ${checkboxWrapperStyle}
`;

interface Props {
  checked: boolean;
  animate?: boolean;
  onAnimationEnd?: () => void;
}

const CheckboxTick: React.FC<Props> = ({
  onAnimationEnd,
  animate,
  checked,
}) => (
  <IconWrapper>
    {checked &&
      <CircleTick onAnimationEnd={onAnimationEnd} animate={animate} />
    }
  </IconWrapper>
);

export default CheckboxTick;
