import { css } from 'styled-components';
import {
  purple,
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../helpers/constants';

export const TileStyle = css`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
  cursor: ${({ selectable }) => selectable ? 'pointer' : 'default'};
  min-height: ${tileMinHeight}px;
  touch-action: manipulation; // stops double-tap-to-zoom
`;

export const ButtonStyle = `
  color: white;
  border: none;
  font-size: 12px;
  border-radius: 30px;
  background-color: ${purple};
  text-transform: uppercase;
  font-weight: 800;
  z-index: 1;
  text-decoration: none;
  padding: 15px 25px;
`;

