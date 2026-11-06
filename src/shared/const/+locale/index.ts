import { LangCode, Langi } from 'shared/api';
import { LocaleNameSpace } from 'shared/model/+locale';

export const langCodeDict: Record<Langi, LangCode> = {
  [Langi.Ru]: 'ru',
  [Langi.Ua]: 'ua',
  [Langi.Kz]: 'kz',
  [Langi.En]: 'en',
};

export const langSystemCodeDict: Record<Langi, string> = {
  [Langi.Ru]: 'ru-RU',
  [Langi.Ua]: 'uk-UA',
  [Langi.Kz]: 'kk-KZ',
  [Langi.En]: 'en-GB',
};

export const takeLangSystemCode = (langi?: Langi | nil) => langSystemCodeDict[langi!] || langSystemCodeDict[Langi.Ru];

export const langCodeLoadingTitleDict: Record<Langi, string> = {
  [Langi.Ru]: 'Загрузка текстов',
  [Langi.Ua]: 'Завантаження текстів',
  [Langi.Kz]: 'Мәтіндерді жүктеу',
  [Langi.En]: 'Loading texts',
};

export const localeKeySeparator = '/';
export const localeDefaultNameSpace: LocaleNameSpace = 'B';
