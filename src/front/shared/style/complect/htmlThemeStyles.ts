import { ColorGamut, builtInColorGamuts } from '#basis/model/ColorGamut.model';
import { cursors } from '#shared/const/cursorsBase64';
import { css } from '@emotion/react';
import { mapObjectEntries } from 'shared/utils/object.utils';

const gamutCssVars = (gamut: ColorGamut) =>
  mapObjectEntries(gamut, (key, color) => `--color-${key}: ${color};`).join('');

const defaultLightGamutCssVars = gamutCssVars(builtInColorGamuts[0].light);
const defaultDarkGamutCssVars = gamutCssVars(builtInColorGamuts[0].dark);

const gamutStyles = builtInColorGamuts.map(
  ({ light, dark }, gamuti) => css`
    &.gamut-${gamuti + 1}:not(.dark) {
      ${gamutCssVars(light)}
    }

    &.gamut-${gamuti + 1}.dark {
      ${gamutCssVars(dark)}
    }
  `,
);

export const htmlThemeStyles = css`
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

  &:not(.dark) {
    ${defaultLightGamutCssVars}

    --url-icon-edit-02-stroke-rounded: var(--url-icon-for-light-edit-02-stroke-rounded);
    --url-icon-link-backward-stroke-rounded: var(--url-icon-for-light-link-backward-stroke-rounded);

    &,
    * {
      ${cursors.defaultDark}
    }
    ${pointer(cursors.pointerDark)}
  }

  &.dark {
    ${defaultDarkGamutCssVars}

    --url-icon-edit-02-stroke-rounded: var(--url-icon-for-dark-edit-02-stroke-rounded);
    --url-icon-link-backward-stroke-rounded: var(--url-icon-for-dark-link-backward-stroke-rounded);

    &,
    * {
      ${cursors.defaultLight}
    }
    ${pointer(cursors.pointerLight)}
  }

  ${gamutStyles}
`;

function pointer(style: string) {
  return css`
    &.dark *,
    * {
      input[type='radio'],
      input[type='button'],
      a,
      a[href],
      .pointer,
      .pointer * {
        ${style}
      }
    }
  `;
}
