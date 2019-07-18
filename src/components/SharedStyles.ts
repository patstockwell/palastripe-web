import { css } from 'styled-components';
import {
  purple,
  workoutWindowViewport,
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../helpers/constants';

export const unorderedListStyle = `
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style: none;
`;

export const opaqueImageInAfter = css<{ image: string }>`
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position-y: top;
  background-position-x: center;
  opacity: 0.5;
  z-index: -1;
`;

export const tileStyle = css<{ selected: boolean }>`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
  cursor: pointer;
  min-height: ${tileMinHeight}px;
  touch-action: manipulation; // stops double-tap-to-zoom
`;

export const buttonStyle = css<{ background?: string }>`
  color: white;
  border: none;
  font-size: 12px;
  border-radius: 30px;
  background-color: ${({ background }) => background || purple};
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

export const workoutHeroWindowStyle = css<{ colour?: string }>`
  min-height: ${workoutWindowViewport}vh;
  position: relative;
  background-color: ${({ colour }) => colour ? colour : 'black'};
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
