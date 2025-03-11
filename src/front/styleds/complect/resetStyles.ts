import { css } from 'styled-components';

export const resetStyles = css`
  a {
    text-decoration: none;
    color: var(--text-color);
  }

  * {
    -webkit-tap-highlight-color: transparent;
    outline: 0;
    border: none;
    scrollbar-gutter: stable;
  }

  :not(svg) {
    box-sizing: border-box;
  }

  svg {
    box-sizing: content-box;
  }

  .bgcolor-black {
    background-color: black;
  }

  .input,
  input,
  textarea {
    background-color: transparent;
    color: var(--text-color);
    font-size: 1em;
    font-family: var(--font-family);

    &::placeholder {
      color: var(--color--5);
    }
  }

  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    background-color: darkgrey;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  :not(.user-select) {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .user-select {
    -moz-user-select: text;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  .user-select-all {
    -moz-user-select: all;
    -webkit-user-select: all;
    -ms-user-select: all;
    user-select: all;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    --autofill-background-color: var(--color--2);
    --autofill-color: var(--text-color);

    box-shadow: 0 0 0 30px var(--autofill-background-color) inset !important;
    -webkit-text-fill-color: var(--autofill-color);
    font-size: 1em;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;
