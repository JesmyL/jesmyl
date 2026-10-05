// @vitest-environment node
import { describe, expect } from 'vitest';

import { CmComTextSquareBracketsMode } from 'shared/api';
import { textCaseTitles } from 'shared/const/textCase';
import { TextCase } from 'shared/model/common';
import { comNbsp } from './com/const';
import { cmTransformToReadableText } from './transformToReadableText';

describe('transformToReadableText', () => {
  it('eq', () => {
    const makeTexts = (textCase: TextCase, squareBracketsMode: CmComTextSquareBracketsMode) => {
      const text = `
текущий кейс- ${textCaseTitles[textCase]}
текст для проверки
многострочного текста [[текст в квадратных скобках]
-с разными. комбинациями
знаков "препинания, "дабы" удостовериться".
в (правильности) работы-функций
    `.trim();

      return cmTransformToReadableText({ level: 0 }, text, textCase, squareBracketsMode).text;
    };

    expect(
      `
Текущий кейс${comNbsp}— Первое с большой
Текст для проверки
Многострочного текста
—${comNbsp}С разными. Комбинациями
Знаков «Препинания, „Дабы“ удостовериться».
В (правильности) работы-функций
    `.trim(),
    ).toEqual(makeTexts(TextCase.Capitalize, CmComTextSquareBracketsMode.Remove));

    expect(
      `
Текущий кейс${comNbsp}— так Как есть
текст для проверки
многострочного текста
—${comNbsp}с разными. Комбинациями
знаков «Препинания, „Дабы“ удостовериться».
В (правильности) работы-функций
    `.trim(),
    ).toEqual(makeTexts(TextCase.AsIs, CmComTextSquareBracketsMode.Remove));

    expect(
      `
ТЕКУЩИЙ КЕЙС${comNbsp}— ВСЕ С БОЛЬШОЙ
ТЕКСТ ДЛЯ ПРОВЕРКИ
МНОГОСТРОЧНОГО ТЕКСТА
—${comNbsp}С РАЗНЫМИ. КОМБИНАЦИЯМИ
ЗНАКОВ «ПРЕПИНАНИЯ, „ДАБЫ“ УДОСТОВЕРИТЬСЯ».
В (ПРАВИЛЬНОСТИ) РАБОТЫ-ФУНКЦИЙ
    `.trim(),
    ).toEqual(makeTexts(TextCase.Uppercase, CmComTextSquareBracketsMode.Remove));
  });
});
