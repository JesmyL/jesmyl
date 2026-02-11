import { makeRegExp } from 'regexpert';
import { RuleSet } from 'styled-components';

export const cmComCommentMakePseudoCommentContentAccentsCss = (
  text: string,
  elseCss: RuleSet<object> | nil | string = `opacity: var(--comment-opacity);`,
) => {
  text = text.trimStart();

  if (text[0] !== '!') return elseCss;
  if (text[1] === '!') return `color: var(--color-xKO);`;

  return `color: var(--color-x7);`;
};

export const cmComCommentMakeContentTextWithoutHighlightMarkers = (text: string) => {
  text = text.trimStart();

  return text[0] === '!' ? (text[1] === '!' ? text.slice(2) : text.slice(1)) : text;
};

export const cmComCommentMakePseudoCommentContentPropCss = (text: string, pre = '', post = '') => {
  return `content:${pre}'${cmComCommentMakePseudoElementCorrectContentText(
    cmComCommentMakeContentTextWithoutHighlightMarkers(text),
  )}'${post};`;
};

const replaces: Record<string, string> = {
  "'": "\\'",
  '\\': '\\\\',
  '\n': "''\\A''",
};
const replaceContentParts = (all: string) => replaces[all];

export const cmComCommentMakePseudoElementCorrectContentText = (text: string) =>
  text?.replace(makeRegExp("/['\\\\\\n]/g"), replaceContentParts);
