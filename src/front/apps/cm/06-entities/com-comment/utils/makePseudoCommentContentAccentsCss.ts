import { css } from 'styled-components';

export const cmComCommentMakePseudoCommentContentAccentsCss = (text: string) => {
  return css`
    ${text.includes('!!')
      ? css`
          color: var(--color--ko);
        `
      : text.includes('!')
        ? css`
            color: var(--color--7);
          `
        : css`
            opacity: var(--comment-opacity);
          `}
  `;
};
