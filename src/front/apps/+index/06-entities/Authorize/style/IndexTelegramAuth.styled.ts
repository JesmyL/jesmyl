import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import styled from 'styled-components';

export const IndexAuthorizeTelegramStyledPage = styled(PageContainerConfigurer)`
  ol,
  ul,
  menu {
    list-style: auto;
  }

  li {
    text-align: initial;

    li {
      margin-left: 1em;
    }
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .logo-container {
      border-radius: 100%;
      background-color: var(--color--3);
      padding: 15px;

      > .jesmyl-smile {
        --jesmyl-smile-color: var(--color--2);
      }
    }

    > .text {
      margin-top: 0.3em;
      font-size: 2em;
    }
  }

  .input-container {
    --padding-h: 0.8em;

    position: relative;
    margin: 5px 0;
    width: 100%;
    max-width: 500px;

    .icon-button-container {
      margin-right: 10px;
    }

    > .input-wrapper {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;

      > .input {
        --input-keyboard-background: var(--color--2);
        --autofill-background-color: var(--color--2);
        --autofill-color: var(--text-color);

        border: var(--color--2) 2px solid;
        border-radius: 0.7em;

        background-color: var(--color--2);
        padding: 0.5em var(--padding-h);
        padding-right: 1.5em;
        width: 100%;
        height: 60px;
        color: var(--text-color);
        font-size: 1.5em;

        &::placeholder {
          color: var(--text-color);
        }
      }

      > .the-icon {
        position: absolute;
        right: var(--padding-h);
      }
    }
  }

  .send-button {
    margin: 1.5em 0;
    border-radius: 0.8em;
    background-color: var(--color--3);
    padding: 0.5em 2em;
    color: var(--color--2);
    font-size: 1.5em;
  }

  .login-error-message {
    position: absolute;
    bottom: -7px;
    width: 100%;
    color: var(--color--ko);
    text-align: center;

    + .input-wrapper {
      margin-bottom: 1em;

      > input {
        border-color: var(--color--ko);
      }
      > .the-icon {
        --icon-color: var(--color--ko);
      }
    }
  }
`;
