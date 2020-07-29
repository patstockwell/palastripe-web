import { createGlobalStyle, css } from 'styled-components';

import {
  purple,
  workoutWindowViewport,
} from '../helpers/constants';

export const GlobalOverFlowHiddenStyle = createGlobalStyle<{ hidden: boolean }>`
  html, body {
    // used for when the modal is displayed
    // to avoid background scrolling
    overflow: ${({ hidden }) => hidden && 'hidden'};
  }
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

interface ButtonProps { background?: string; fontColour?: string; }

export const buttonStyle = css<ButtonProps | any>`
  color: ${({ fontColour }) => fontColour || 'white'};
  border: none;
  font-size: 12px;
  border-radius: 30px;
  background-color: ${({ background }) => background || purple};
  text-transform: uppercase;
  font-weight: 800;
  z-index: 1;
  text-decoration: none;
  padding: 17px 25px;
`;

export const workoutTitleStyle = `
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Muli','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-style: italic;
`;

export const workoutHeroWindowStyle = css<{ colour?: string; imageUrl?: string }>`
  min-height: ${workoutWindowViewport}vh;
  position: relative;
  background-color: ${({ colour }) => colour ? colour : 'black'};
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;
