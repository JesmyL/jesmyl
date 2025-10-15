import { css } from 'styled-components';

export const otherStyles = css`
  .list-title {
    display: flex;
    justify-content: space-between;
    background-color: var(--current-bg);
    padding: var(--main-gap);
  }

  .debounced-searcher.round-styled {
    --height: calc(var(--header-container-height) - var(--main-gap) * 2);

    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: calc(var(--main-gap) * 3);
    background-color: var(--color--2);
    padding: var(--main-gap);
    width: 100%;
    height: var(--height);

    .input {
      outline: 0;
      border: 0;
      background: none;
      width: calc(100% - 30px);
      color: var(--text-color);
    }

    .clear-button {
      &.hidden {
        opacity: 0;
      }
    }
  }

  .the-icon {
    &.as-button-circle {
      margin: 5px;
      border-radius: 100%;
      background: var(--color--2);
      padding: 7px;
    }
  }

  html,
  body {
    > #telegram-login-jesmylbot {
      display: none;
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  body:has(.wedding-proposition-page) {
    &,
    * {
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
