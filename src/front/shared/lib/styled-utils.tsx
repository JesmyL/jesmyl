import { RuleSet, css } from 'styled-components';

export const styledHoverBind = (styles: RuleSet<object>, query = '&') => {
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
