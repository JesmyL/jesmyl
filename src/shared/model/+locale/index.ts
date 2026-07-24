import { UseTranslationResponse } from 'react-i18next';
import { Langi } from 'shared/api';
import { localeDefaultNameSpace, localeKeySeparator } from 'shared/const/+locale';
import { LocaleBase } from './base';
import { LocaleDynamic } from './dynamic';

export type LocaleKey<N extends LocaleNameSpace> = Exclude<
  LocaleKeyList<N> extends (infer V)[] ? V : never,
  TemplateStringsArray
>;

type LocaleKeyList<N extends LocaleNameSpace> = Exclude<
  Parameters<UseTranslationResponse<N, undefined>['t']>[0],
  TemplateStringsArray | string | string[]
>;

export type LocaleNameSpaceConfigs = {
  B: LocaleBase<Langi>;
} & {
  [K in `D${Langi}`]: LocaleDynamic<K extends `D${infer L extends Langi}` ? L : Langi>;
};

export type LocaleNameSpace = keyof LocaleNameSpaceConfigs;

declare module 'i18next' {
  interface CustomTypeOptions {
    nsSeparator: typeof localeKeySeparator;
    keySeparator: typeof localeKeySeparator;

    resources: LocaleNameSpaceConfigs;

    defaultNS: typeof localeDefaultNameSpace;
  }
}
