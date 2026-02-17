import { css } from 'styled-components';

export const cmComCommentPseudoCommentStaticPropsCss = css`
  opacity: var(--comment-opacity);
  display: block;
  white-space: break-spaces;
  word-wrap: break-word;
  max-width: calc(100vw - var(--comment-margin-left) - var(--styled-block-margin-left) - 45px);
  line-height: normal;
  margin-bottom: 0.5em;
  text-decoration: underline;
  font-weight: bold;
`;
