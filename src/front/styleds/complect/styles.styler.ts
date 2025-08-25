import { css } from 'styled-components';

export const attrStylerStyles = css`
  [st-mood='ko'] {
    color: var(--color--3);
    background-color: var(--color--ko);
  }

  [st-mood='2'] {
    color: var(--color--3);
    background-color: var(--color--2);
  }

  [st-mood='1'] {
    color: var(--color--3);
    background-color: var(--color--1);
  }
`;
