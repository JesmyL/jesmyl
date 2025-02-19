import { css } from 'styled-components';
import { base64Cursors } from '../../shared/lib/base64Cursors';

const lightTheme = (selector: string) => css`
  ${selector && `${selector} {`}
  --color--1-rgb: 234, 241, 233;
  --color--2-rgb: 213, 232, 213;
  --color--3-rgb: 18, 34, 23;
  --color--4-rgb: 65, 72, 64;
  --color--5-rgb: 251, 253, 248;
  --color--6-rgb: 248, 251, 244;
  --color--7-rgb: 45, 153, 90;
  --color--8-rgb: 251, 253, 248;
  --color--ok-rgb: 71, 187, 0;
  --color--ko-rgb: 236, 105, 105;

  --url-icon-edit-02-stroke-rounded: var(--url-icon-for-light-edit-02-stroke-rounded);
  --url-icon-link-backward-stroke-rounded: var(--url-icon-for-light-link-backward-stroke-rounded);

  &,
  * {
    ${base64Cursors.defaultDark}
  }

  input[type='radio'],
  input[type='button'],
  .pointer,
  .pointer * {
    ${base64Cursors.pointerDark}
  }
  ${selector && '}'}
`;

const darkTheme = (selector: string) => css`
  ${selector && `${selector} {`}
  --color--1-rgb: 36, 42, 38;
  --color--2-rgb: 59, 75, 64;
  --color--3-rgb: 213, 230, 214;
  --color--4-rgb: 178, 185, 177;
  --color--5-rgb: 26, 28, 25;
  --color--6-rgb: 211, 229, 215;
  --color--7-rgb: 181, 242, 200;
  --color--8-rgb: 251, 253, 248;
  --color--ok-rgb: 155, 236, 105;
  --color--ko-rgb: 236, 105, 105;

  --url-icon-edit-02-stroke-rounded: var(--url-icon-for-dark-edit-02-stroke-rounded);
  --url-icon-link-backward-stroke-rounded: var(--url-icon-for-dark-link-backward-stroke-rounded);

  &,
  * {
    ${base64Cursors.defaultLight}
  }

  input[type='radio'],
  input[type='button'],
  .pointer,
  .pointer * {
    ${base64Cursors.pointerLight}
  }
  ${selector && '}'}
`;

export const bodyThemeStyles = css`
  @media (prefers-color-scheme: light) {
    ${lightTheme('&:not(.reverse-theme)')}
    ${darkTheme('')}
  }

  @media (prefers-color-scheme: dark) {
    ${darkTheme('&:not(.reverse-theme)')}
    ${lightTheme('')}
  }

  --color--1: rgb(var(--color--1-rgb));
  --color--2: rgb(var(--color--2-rgb));
  --color--3: rgb(var(--color--3-rgb));
  --color--4: rgb(var(--color--4-rgb));
  --color--5: rgb(var(--color--5-rgb));
  --color--6: rgb(var(--color--6-rgb));
  --color--7: rgb(var(--color--7-rgb));
  --color--8: rgb(var(--color--8-rgb));
  --color--ok: rgb(var(--color--ok-rgb));
  --color--ko: rgb(var(--color--ko-rgb));
`;
