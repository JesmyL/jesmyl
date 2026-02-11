import { makeRegExp } from 'regexpert';
import { RuleSet } from 'styled-components';

export const cmComCommentPseudoCommentContentAccentsKind = (text: string) => {
  text = text.trimStart();

  if (text[0] !== '!') return 0;
  if (text[1] === '!') return 2;

  return 1;
};

export const cmComCommentAccentsColorList = [null, `color: var(--color-x7);`, `color: var(--color-xKO);`];

export const cmComCommentMakePseudoCommentContentAccentsColorCss = (
  text: string,
  elseCss?: RuleSet<object> | nil | string,
) =>
  cmComCommentAccentsColorList[cmComCommentPseudoCommentContentAccentsKind(text)] ??
  elseCss ??
  `opacity: var(--comment-opacity);`;

export const cmComCommentTrimHighlightMarkers = (text: string) =>
  text.slice(cmComCommentPseudoCommentContentAccentsKind(text));

export const cmComCommentMakePseudoCommentContentPropCss = (text: string, pre = '', post = '') => {
  return `content:${pre}'${cmComCommentMakePseudoElementCorrectContentText(
    cmComCommentTrimHighlightMarkers(text),
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
