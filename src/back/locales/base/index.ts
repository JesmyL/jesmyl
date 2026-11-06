import { Langi } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { checkIsString } from 'shared/utils/checkIs';
import { translateBaseDefine } from 'shared/utils/locale/translate';
import { stringTemplater } from 'shared/utils/stringTemplater';
import { localeBaseEn } from './en';
import { localeBaseKz } from './kz';
import { localeBaseRu } from './ru';
import { localeBaseUa } from './ua';

const baseLocales: Record<Langi, LocaleBase<Langi>> = {
  [Langi.Ru]: localeBaseRu,
  [Langi.Ua]: localeBaseUa,
  [Langi.Kz]: localeBaseKz,
  [Langi.En]: localeBaseEn,
};

export const translateBaseTexts = <K extends BaseLocaleKey>(
  langi: Langi | nil,
  key: K,
  interpolation?: Record<string, string | number | boolean>,
) => {
  const text: unknown = translateBaseDefine(baseLocales[langi ?? Langi.Ru])(key);
  if (!checkIsString(text)) throw `Base locale text is not a string: ${key}`;

  return interpolation ? stringTemplater(text, interpolation) : text;
};
