import { css } from 'styled-components';
import {
  purple,
  charcoal,
  workoutWindowViewport,
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../helpers/constants';

export const tileStyle = css`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
  cursor: ${({ selectable }) => selectable ? 'pointer' : 'default'};
  min-height: ${tileMinHeight}px;
  touch-action: manipulation; // stops double-tap-to-zoom
`;

export const buttonStyle = `
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

export const workoutTitleStyle = `
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Muli','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-style: italic;
`;

export const workoutHeroWindowStyle = `
  min-height: ${workoutWindowViewport}vh;
  position: relative;
  background-color: ${charcoal};
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
