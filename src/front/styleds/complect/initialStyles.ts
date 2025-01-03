import { css } from 'styled-components';

export const initialStyles = css`
  html,
  body,
  #root {
    overscroll-behavior: none;
  }

  body {
    --font-family: -apple-system, montserrat, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', main, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    --input-keyboard-background: var(--color--1);

    --icon-color: var(--color--4);

    --icon-fill: var(--icon-color);
    --icon-stroke: var(--icon-color);
    --icon-stroke-width: 2;
    --icon-opacity: 0.4;
    --icon-size: 24px;
    --icon-scale: 1;

    --text-color: var(--color--4);
    --current-bg: var(--color--5);

    margin: 0;

    background-color: var(--current-bg);
    padding: 0;
    width: 100vw;
    height: 100%;
    color: var(--text-color);
    font-size: 16px;
    font-family: var(--font-family);

    #root {
      height: 100%;
      overflow: hidden;
    }

    * {
      -webkit-touch-callout: none;
    }
  }
`;
