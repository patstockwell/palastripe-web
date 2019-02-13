import { createGlobalStyle } from 'styled-components';
import muli from '../assets/muli.woff2';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: black;
    background-color: white;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a, button {
    -webkit-tap-highlight-color: transparent;
    outline-style: none;
  }

  @font-face {
    font-family: 'Muli';
    font-style: italic;
    font-weight: 900;
    src: url(${muli}) format('woff2');
  }
}
`;

