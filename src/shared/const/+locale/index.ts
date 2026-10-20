import { LangCode, Langi } from 'shared/api';
import { LocaleNameSpace } from 'shared/model/+locale';

export const langCodeDict: Record<Langi, LangCode> = {
  [Langi.Ru]: 'ru',
  [Langi.Ua]: 'ua',
  [Langi.Kz]: 'kz',
  [Langi.En]: 'en',
};

export const langCodeLoadingTitleDict: Record<Langi, string> = {
  [Langi.Ru]: 'Загрузка текстов',
  [Langi.Ua]: 'Завантаження текстів',
  [Langi.Kz]: 'Мәтіндерді жүктеу',
  [Langi.En]: 'Loading texts',
};

export const localeKeySeparator = '/';
export const localeDefaultNameSpace: LocaleNameSpace = 'B';
