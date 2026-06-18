import { textCaseTitles } from 'shared/const/textCase';
import { TextCase } from 'shared/model/common';
import { cmTransformToReadableLines, cmTransformToReadableText } from './transformToReadableText';

describe('transformToReadableText', () => {
  it('eq', () => {
    const makeTexts = (textCase: TextCase) => {
      const text = `
текущий кейс- ${textCaseTitles[textCase]}
текст для проверки
многострочного текста [[текст в квадратных скобках]
-с разными. комбинациями
знаков "препинания, "дабы" удостовериться".
в (правильности) работы-функций
    `.trim();

      return [
        cmTransformToReadableLines(text.split('\n'), textCase).lines.join('\n'),
        cmTransformToReadableText(text, textCase).text,
      ];
    };

    [TextCase.AsIs, TextCase.Capitalize, TextCase.Uppercase].forEach(textCase => {
      const [ex, eq] = makeTexts(textCase);
      expect(ex).toEqual(eq);
    });

    const duplicate = (text: string) => [text.trim(), text.trim()];

    expect(
      duplicate(`
Текущий кейс&nbsp;— Первое с большой
Текст для проверки
Многострочного текста
—&nbsp;С разными. Комбинациями
Знаков «Препинания, „Дабы“ удостовериться».
В (правильности) работы-функций
    `),
    ).toEqual(makeTexts(TextCase.Capitalize));

    expect(
      duplicate(`
Текущий кейс&nbsp;— так Как есть
текст для проверки
многострочного текста
—&nbsp;с разными. Комбинациями
знаков «Препинания, „Дабы“ удостовериться».
В (правильности) работы-функций
    `),
    ).toEqual(makeTexts(TextCase.AsIs));

    expect(
      duplicate(`
ТЕКУЩИЙ КЕЙС&nbsp;— ВСЕ С БОЛЬШОЙ
ТЕКСТ ДЛЯ ПРОВЕРКИ
МНОГОСТРОЧНОГО ТЕКСТА
—&nbsp;С РАЗНЫМИ. КОМБИНАЦИЯМИ
ЗНАКОВ «ПРЕПИНАНИЯ, „ДАБЫ“ УДОСТОВЕРИТЬСЯ».
В (ПРАВИЛЬНОСТИ) РАБОТЫ-ФУНКЦИЙ
    `),
    ).toEqual(makeTexts(TextCase.Uppercase));
  });
});
