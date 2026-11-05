import { Langi } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { translateBaseDefine } from 'shared/utils/locale/translate';
import { stringTemplater } from 'shared/utils/stringTemplater';
import { backLocalesEn } from './en';
import { backLocalesKz } from './kz';
import { backLocalesRu } from './ru';
import { backLocalesUa } from './ua';

const backLocales: { [L in Langi]: Record<BackLocaleKey, string> } = {
  [Langi.Ru]: backLocalesRu,
  [Langi.Ua]: backLocalesUa,
  [Langi.Kz]: backLocalesKz,
  [Langi.En]: backLocalesEn,
};

export const translateBackTexts = (
  langi: Langi | nil,
  key: BackLocaleKey,
  interpolation?: Record<string, string | number | boolean>,
) => {
  const text = translateBaseDefine(backLocales[langi ?? Langi.Ru] ?? backLocalesRu)(key);

  return interpolation ? stringTemplater(text, interpolation) : text;
};
