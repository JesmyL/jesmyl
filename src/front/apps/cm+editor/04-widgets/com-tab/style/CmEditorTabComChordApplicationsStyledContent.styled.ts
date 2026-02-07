import { styledHoverBind } from '#shared/lib/styled-utils';
import styled, { css } from 'styled-components';

export const CmEditorComTabChordApplicationsStyledContent = styled.div`
  max-width: 100vw;

  .composition-line {
    display: inline;
  }

  .binder {
    display: inline-block;
    vertical-align: middle;
    background-color: var(--color--2);
    width: 1em;
    height: 1em;

    &.active {
      background-color: var(--color--3);
    }

    &[com-letter-chorded='pre'] {
      margin-right: 0.3em;
    }

    &[com-letter-chorded='post'] {
      margin-left: 0.3em;
    }
  }

  [com-letter-index] {
    cursor: pointer;

    ${styledHoverBind(css`
      background-color: var(--color--2);
    `)}

    &:before,
    &:after {
      font-size: 1em;
    }

    &[com-letter-chorded]:not([com-letter-chorded='pre']):not([com-letter-chorded='post']) {
      > [word-fragment] > * {
        &[com-letter-space-word] {
          background-color: var(--color--ko);
        }

        &:first-letter {
          background-color: var(--color--ko);
        }
      }

      &:first-letter,
      &[com-letter-spaced-word]:after,
      &[attr-chord] > [word-fragment] > *:first-letter {
        background-color: rgba(255, 209, 0, 0.3);
      }

      &[attr-chord][com-letter-spaced-word] > [word-fragment] > *:first-letter {
        background-color: transparent;
      }
    }
  }
`;
