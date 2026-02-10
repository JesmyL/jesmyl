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
