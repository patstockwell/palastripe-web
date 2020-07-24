import { css } from 'styled-components';
import {
  lightGrey1,
  lightGrey3,
  tileMinHeight,
  charcoal,
} from '../../../helpers/constants';

export const tileStyle = css<{ selected: boolean }>`
  position: relative;
  color: ${props => props.selected ? 'black' : charcoal};
  border: none;
  border-bottom: 1px solid ${lightGrey1};
  background-color: ${props => props.selected ? 'white' : lightGrey3};
  cursor: pointer;
  min-height: ${tileMinHeight}px;
  touch-action: manipulation; // stops double-tap-to-zoom
  overflow: hidden;
`;

export const selectCompleteButtonStyle = `
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
