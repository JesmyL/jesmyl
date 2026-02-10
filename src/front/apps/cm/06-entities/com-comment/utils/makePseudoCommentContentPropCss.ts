import { makePseudoElementCorrectContentText } from '#shared/lib/getParentNodeWithClassName';

export const cmComCommentMakePseudoCommentContentPropCss = (text: string, pre = '', post = '') => {
  text = text.trimStart();

  return `
    content: ${pre}'${makePseudoElementCorrectContentText(
      text[0] === '!' ? (text[1] === '!' ? text.slice(2) : text.slice(1)) : text,
    )}'${post};
  `;
};
