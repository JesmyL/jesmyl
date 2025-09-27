import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { QuestionerTemplateByItsType, QuestionerType } from 'shared/model/q';

export const questionerTextIncludeSymbols = '@#$^&*+%'.split('').sort().join('');

type TemplateWithSymbols = Pick<QuestionerTemplateByItsType<QuestionerType.TextInclude>, 'symbols'>;

export const takeQuestionerTextIncludeSymbols = (template: TemplateWithSymbols) =>
  template.symbols || questionerTextIncludeSymbols;

export const makeQuestionerTextIncludeSymbolSplitRegExp = (template: TemplateWithSymbols) => {
  return makeRegExp(`/([${escapeRegExpSymbols(takeQuestionerTextIncludeSymbols(template))}]+)/`);
};
