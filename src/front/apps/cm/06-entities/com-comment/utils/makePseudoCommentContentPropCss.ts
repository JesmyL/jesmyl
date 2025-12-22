import { makePseudoElementCorrectContentText } from '#shared/lib/getParentNodeWithClassName';
import { css } from 'styled-components';

export const cmComCommentMakePseudoCommentContentPropCss = (text: string) => css`
  content: '${makePseudoElementCorrectContentText(text.trim())}';
`;
