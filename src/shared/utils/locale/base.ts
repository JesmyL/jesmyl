import type { Langi } from 'shared/api';
import type { LocaleBase } from 'shared/model/+locale/base';
import { translateBaseDefine } from './translate';

type BaseLocale = LocaleBase<Langi>;

let takeBaseLocale: () => BaseLocale = () => {
  throw new Error('setBaseLocaleProvider was never called');
};

// Provider must be registered before any module-scope translateBase call.
export const setBaseLocaleProvider = (provider: () => BaseLocale) => {
  takeBaseLocale = provider;
};

export const translateBase = translateBaseDefine(() => takeBaseLocale());
