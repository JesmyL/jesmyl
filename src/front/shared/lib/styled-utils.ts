import { css, SerializedStyles } from '@emotion/react';

export const styledHoverBind = (styles: SerializedStyles, query = '&') => {
  return css`
    @media (hover: hover) {
      ${query}:hover {
        ${styles}
      }
    }

    @media (hover: none) {
      ${query}:active {
        ${styles}
      }
    }
  `;
};
