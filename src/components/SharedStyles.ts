import styled, {createGlobalStyle, css} from 'styled-components';

import {
  purple,
  workoutWindowViewport,
  gutterWidth,
} from '../helpers/constants';
import {Link} from 'react-router-dom';

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

export interface ButtonStyleProps { background?: string; color?: string; }

const buttonStyle = `
  border: none;
  font-size: 12px;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: 800;
  z-index: 1;
  text-decoration: none;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

export const ButtonBaseWithLink = styled(Link)<ButtonStyleProps>`
${buttonStyle}
  color: ${props => props.color || 'white'};
  background-color: ${props => props.background || purple};
`;

export const ButtonBase = styled.button<ButtonStyleProps>`
${buttonStyle}
  color: ${props => props.color || 'white'};
  background-color: ${props => props.background || purple};
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
  background-color: ${props => props.colour || 'black'};
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${gutterWidth}px;
`;
