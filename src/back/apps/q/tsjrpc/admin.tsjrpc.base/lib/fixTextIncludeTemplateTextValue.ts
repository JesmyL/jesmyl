import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { takeQuestionerTextIncludeSymbols } from 'shared/const/q/textIncludeSymbols';
import { QuestionerTextIncludeTemplate } from 'shared/model/q';

export const questionerTSJRPCFixTextIncludeTemplateTextValue = (
  text: string,
  template: QuestionerTextIncludeTemplate,
) => {
  const correct = (template.correct ??= {});
  const newCorrect: Record<string, string> = {};
  const punctuationRegExp = makeRegExp('/[«„.,?;:!"\'“»]+/g');

  template.text = text.replace(
    makeRegExp(`/(\\S*?)([${escapeRegExpSymbols(takeQuestionerTextIncludeSymbols(template))}]+)(\\S*)/g`),
    (all, preText, symbolsText, postText) => {
      const fullWord = `${preText}${postText}`.replace(punctuationRegExp, '');

      if (!fullWord) {
        newCorrect[symbolsText] = correct[symbolsText];
        return all;
      }

      let symbolKey = symbolsText;

      if (newCorrect[symbolKey] != null || fullWord) {
        const keys = takeQuestionerTextIncludeSymbols(template).split('');
        let i = 0;

        for (; symbolKey in correct || symbolKey in newCorrect; i++) {
          symbolKey = i
            .toString(keys.length)
            .split('')
            .map(index => keys[+index])
            .join('');
        }
      }

      newCorrect[symbolKey] = correct[symbolKey] ?? `${preText || ''}${postText || ''}`;

      let result = correct[symbolKey] != null ? all : symbolKey;

      newCorrect[symbolKey] = newCorrect[symbolKey].replace(punctuationRegExp, all => {
        if ('«„'.includes(all)) result = `${all}${result}`;
        else result = `${result}${all}`;
        return '';
      });

      return result;
    },
  );

  template.correct = newCorrect;
};
