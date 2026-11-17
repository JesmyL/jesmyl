import { Langi } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { checkIsString } from 'shared/utils/checkIs';
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
  // Текст берётся напрямую из словаря: функция сама решает, применять ли подстановку, и не зависит от типа ключа.
  const text: unknown = baseLocales[langi ?? Langi.Ru][key];
  if (!checkIsString(text)) return '';

  return interpolation ? stringTemplater(text, interpolation) : text;
};

/** Словарь базовых переводов выбранного языка: нужен для ключей-записей, которые не сводятся к строке. Язык обязателен, подстановки другого языка нет. */
export const takeBaseLocaleDict = (langi: Langi) => baseLocales[langi] ?? baseLocales[Langi.Ru];
