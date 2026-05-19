import { css, Global } from '@emotion/react';

export const bibleTagControledContentGlobalCssNode = (
  <Global
    styles={css`
      .bible-tag-controled-content {
        insertedtext {
          opacity: var(--insertedtext-opacity, 0.7);
          display: var(--insertedtext-display, initial);
          color: var(--insertedtext-color, inherit);
          font-style: var(--insertedtext-fontStyle, inherit);
          -webkit-text-stroke-color: var(--insertedtext-stroke, inherit);
          -webkit-text-stroke-width: calc(1em * var(--insertedtext-strokeW, inherit));
        }

        textinbrackets {
          opacity: var(--textinbrackets-opacity, 1);
          display: var(--textinbrackets-display, initial);
          color: var(--textinbrackets-color, inherit);
          font-style: var(--textinbrackets-fontStyle, inherit);
          -webkit-text-stroke-color: var(--textinbrackets-stroke, inherit);
          -webkit-text-stroke-width: calc(1em * var(--textinbrackets-strokeW, inherit));
        }

        godswords {
          opacity: var(--godswords-opacity, 0.5);
          color: var(--godswords-color, var(--color--ok));
          font-style: var(--godswords-fontStyle, inherit);
          -webkit-text-stroke-color: var(--godswords-stroke, inherit);
          -webkit-text-stroke-width: calc(1em * var(--godswords-strokeW, inherit));
        }
      }
    `}
  />
);
