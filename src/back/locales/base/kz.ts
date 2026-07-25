import { Langi } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { localeBaseRu } from './ru';

export const localeBaseKz: LocaleBase<Langi.Kz> = {
  ...localeBaseRu,
  lng: Langi.Kz,
  v: 0,

  each0: 'әрқайсысы',
  each1: 'әрқайсысы',
  each2: 'әрқайсысы',
  each3: 'әрқайсысы',
};
