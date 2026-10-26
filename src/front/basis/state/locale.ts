import { appInitEvent, localeIsLoadingAtom } from '$app/store/triggers';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';

const dynamicLangAtoms: { [L in Langi]?: Atom<LocaleDynamic<L>> } = {};

/** Нумерация `BaseLocaleKey` непрерывная: словарь другой длины собран под другой набор ключей. */
const baseLocaleKeysCount = BaseLocaleKey.CmEditorCategoryKindLocked + 1;

const checkValue = (value: LocaleBase<Langi> | LocaleDynamic<Langi>, onRequest: () => void) => {
  if (!objectLength(value)) {
    appInitEvent.listen(onRequest);
    localeIsLoadingAtom.do.increment();
  }
};

export const takeBaseLanguageAtom = lazyInit(() => {
  const confAtom = atom({}, 'loc:B') as never as Atom<LocaleNameSpaceConfigs['B']>;
  const cachedBaseLocale = confAtom.get();

  checkValue(cachedBaseLocale, () => indexTsjrpcClientMethods.reqLocaleBaseConfig());

  // Кэш, собранный до перенумерации `BaseLocaleKey`, отдаёт старые тексты по старым индексам:
  // обновляем его в фоне, не блокируя приложение устаревшим словарём.
  if (objectLength(cachedBaseLocale) && objectLength(cachedBaseLocale) !== baseLocaleKeysCount) {
    appInitEvent.listen(() => indexTsjrpcClientMethods.reqLocaleBaseConfig());
  }

  return confAtom;
});

export const takeDynamicLanguageAtom = <L extends Langi>(langi: L) => {
  const confAtomCheck = dynamicLangAtoms[langi];
  if (confAtomCheck) return confAtomCheck;

  const confAtom = atom({} as LocaleDynamic<L>, `loc:D${langi}`);
  dynamicLangAtoms[langi] = confAtom as never;

  checkValue(confAtom.get(), () => indexTsjrpcClientMethods.reqLocaleDynConfig({ langi }));

  return confAtom;
};
