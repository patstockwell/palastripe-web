import { css } from 'styled-components';
import {
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../../helpers/constants';

export const tileStyle = css<{ selected: boolean }>`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
  cursor: pointer;
  min-height: ${tileMinHeight}px;
  touch-action: manipulation; // stops double-tap-to-zoom
  overflow: hidden;
`;

export const checkboxWrapperStyle = `
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
