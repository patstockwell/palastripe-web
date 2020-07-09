import { createGlobalStyle } from 'styled-components';
import muli from '../assets/muli.woff2';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    margin: 0;
    color: black;
    background-color: white;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -webkit-tap-highlight-color: transparent;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  a, button {
    -webkit-tap-highlight-color: transparent;
    outline-style: none;
    cursor: pointer;
  }

  @font-face {
    font-family: 'Muli';
    font-style: italic;
    font-weight: 900;
    src: url(${muli}) format('woff2');
  }
}
`;
