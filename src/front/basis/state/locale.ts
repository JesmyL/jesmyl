import { appInitEvent, localeIsLoadingAtom } from '$app/store/triggers';
import { indexUserAccessRightsAtom } from '$index/shared/state/atoms';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { LocaleCmEditor } from 'shared/model/+locale/editor';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';

const dynamicLangAtoms: { [L in Langi]?: Atom<LocaleDynamic<L>> } = {};

/** Мёртвые ключи тоже доставляются — пустыми `''`-текстами в конце словаря. */
const deprecatedBaseLocaleKeysCount = 2;

/** Нумерация `BaseLocaleKey` непрерывная: словарь другой длины собран под другой набор ключей. */
const baseLocaleKeysCount = BaseLocaleKey.NumberSymbols + 1 + deprecatedBaseLocaleKeysCount;

/** Нумерация `EditorLocaleKey` непрерывная: словарь другой длины собран под другой набор ключей. */
const editorLocaleKeysCount = EditorLocaleKey.Language + 1;

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

/** Словарь редактора запрашивается только при наличии права на редактирование `cm`. */
export const takeEditorLanguageAtom = lazyInit(() => {
  const confAtom = atom({}, 'loc:E') as never as Atom<LocaleCmEditor>;
  const cachedEditorLocale = confAtom.get();

  if (!checkUserScopeAccessRight(null, indexUserAccessRightsAtom.get(), 'cm', 'EDIT')) return confAtom;

  if (!objectLength(cachedEditorLocale)) {
    indexTsjrpcClientMethods.reqLocaleEditorConfig();
  } else if (objectLength(cachedEditorLocale) !== editorLocaleKeysCount) {
    // Кэш, собранный до перенумерации `EditorLocaleKey`, отдаёт старые тексты по старым индексам.
    indexTsjrpcClientMethods.reqLocaleEditorConfig();
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
