import { cursors } from 'front/cursorsBase64';
import { css } from 'styled-components';

export const globalThemeStyles = css`
  --color--1: var(--color-x1);
  --color--2: var(--color-x2);
  --color--3: var(--color-x3);
  --color--4: var(--color-x4);
  --color--5: var(--color-x5);
  --color--6: var(--color-x6);
  --color--7: var(--color-x7);
  --color--8: var(--color-x8);
  --color--ko: var(--color-xKO);
  --color--ok: var(--color-xOK);

  --color-x1: #eaf1e9;
  --color-x2: #d5e8d5;
  --color-x3: #122217;
  --color-x4: #414840;
  --color-x5: #fbfdf8;
  --color-x6: #f8fbf4;
  --color-x7: #2d995a;
  --color-x8: #fbfdf8;
  --color-xOK: #47bb00;
  --color-xKO: #ec6969;

  --url-icon-edit-02-stroke-rounded: var(--url-icon-for-light-edit-02-stroke-rounded);
  --url-icon-link-backward-stroke-rounded: var(--url-icon-for-light-link-backward-stroke-rounded);

  &,
  * {
    ${cursors.defaultDark}
  }

  input[type='radio'],
  input[type='button'],
  .pointer,
  .pointer * {
    ${cursors.pointerDark}
  }

  &.dark {
    --color-x1: #242a26;
    --color-x2: #3b4b40;
    --color-x3: #d5e6d6;
    --color-x4: #b2b9b1;
    --color-x5: #1a1c19;
    --color-x6: #d3e5d7;
    --color-x7: #b5f2c8;
    --color-x8: #fbfdf8;
    --color-xKO: #ec6969;
    --color-xOK: #9bec69;

    --url-icon-edit-02-stroke-rounded: var(--url-icon-for-dark-edit-02-stroke-rounded);
    --url-icon-link-backward-stroke-rounded: var(--url-icon-for-dark-link-backward-stroke-rounded);

    &,
    * {
      ${cursors.defaultLight}
    }

    input[type='radio'],
    input[type='button'],
    .pointer,
    .pointer * {
      ${cursors.pointerLight}
    }
  }
`;
