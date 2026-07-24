import { Langi } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { localeBaseRu } from './ru';

export const localeBaseUa: LocaleBase<Langi.Ua> = {
  ...localeBaseRu,
  lng: Langi.Ua,

  cm: {
    com: {
      ...localeBaseRu.cm.com,
      forEachBlock: 'Для кожного блоку "$n;"',
    },
  },

  each0: 'кожен',
  each1: 'кожен',
  each2: 'кожна',
  each3: 'кожне',
};
