import { LangCode, Langi } from 'shared/api';
import { LocaleNameSpace } from 'shared/model/+locale';

export const langCodeDict: Record<Langi, LangCode> = {
  [Langi.Ru]: 'ru',
  [Langi.Ua]: 'ua',
  [Langi.Kz]: 'kz',
};

export const localeKeySeparator = '/';
export const localeDefaultNameSpace: LocaleNameSpace = 'B';
