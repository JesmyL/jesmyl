import { appInitEvent, localeForceUpdateAtom, localeIsBlurringAtom, localeIsLoadingAtom } from '$app/store/triggers';
import { indexUserAccessRightsAtom } from '$index/shared/state/atoms';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { Langi } from 'shared/api';
import { LocaleNameSpaceConfigs } from 'shared/model/+locale';
import { LocaleBase } from 'shared/model/+locale/base';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { LocaleCmEditor } from 'shared/model/+locale/editor';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectLength } from 'shared/utils/object.utils';
import { loadLocaleCache, saveLocaleCache } from './locale.storage';

const dynamicLangAtoms: { [L in Langi]?: Atom<LocaleDynamic<L>> } = {};

/** Отметка свежести локальных словарей: сервер досылает только изменившееся после неё. */
export const localeLastModifiedAtAtom = atom(0, 'app:localesModifiedAt');

export const isLangiPickerOpenAtom = atom(false);

const requestFreshLocales = (lastModifiedAt = localeLastModifiedAtAtom.get()) =>
  indexTsjrpcClientMethods.requestFreshLocales({ lastModifiedAt });

/** Отсутствующий кэш нельзя вылечить разницей отметок: сервер обязан прислать словари целиком. */
const requestFullLocales = () => requestFreshLocales(0);

let pendingLocaleCacheLoads = 0;
let isAppInitInvoked = false;

appInitEvent.listen(() => {
  isAppInitInvoked = true;
});

/** App init may already be over while Cache Storage is still being read: then run the fallback immediately. */
const runOnAppInit = (cb: () => void) => (isAppInitInvoked ? cb() : appInitEvent.listenFirst(cb));

/** Cached JSON is untrusted: only plain objects make it into the locale atoms. */
const isLocaleDict = <Value extends object>(value: unknown): value is Value =>
  typeof value === 'object' && value !== null;

const releaseLocaleCacheLoad = () => {
  if (--pendingLocaleCacheLoads) return;

  localeIsBlurringAtom.set(false);
};

const checkValue = (value: LocaleBase<Langi> | LocaleDynamic<Langi>, onRequest: () => void) => {
  if (!objectLength(value)) {
    runOnAppInit(onRequest);
    localeIsLoadingAtom.do.increment();
  }
};

/**
 * Hydrates a memory-only locale atom from Cache Storage and persists every later server fresh.
 * The server fallback runs only after the cache read settles, so a cached dictionary never races a request.
 */
const hydrateLocaleAtom = <Value extends object>(
  key: string,
  confAtom: Atom<Value>,
  applyValue: (value: Value) => void,
) => {
  pendingLocaleCacheLoads++;

  void loadLocaleCache(key)
    .then(cached => {
      const current = confAtom.get();

      if (isLocaleDict<Value>(cached) && objectLength(cached) && !objectLength(current)) {
        confAtom.set(cached);
      } else if (objectLength(current)) {
        // A server fresh may arrive while the cache is still being read: the late subscription alone would lose it.
        void saveLocaleCache(key, current);
      }

      applyValue(confAtom.get());
      confAtom.subscribe(value => void saveLocaleCache(key, value));
    })
    .catch(() => {})
    .finally(releaseLocaleCacheLoad);
};

export const takeBaseLanguageAtom = lazyInit(() => {
  const confAtom = atom({}) as never as Atom<LocaleNameSpaceConfigs['B']>;

  hydrateLocaleAtom('B', confAtom, cachedBaseLocale => checkValue(cachedBaseLocale, requestFullLocales));

  return confAtom;
});

/** Словарь редактора запрашивается только при наличии права на редактирование `cm` или на дашборд. */
export const takeEditorLanguageAtom = lazyInit(() => {
  const confAtom = atom({}) as never as Atom<LocaleCmEditor>;

  // Тексты редактора читаются через нереактивный провайдер: свежий словарь должен перемонтировать дерево.
  confAtom.subscribe(editor => {
    if (objectLength(editor)) localeForceUpdateAtom.do.increment();
  });

  hydrateLocaleAtom('E', confAtom, cachedEditorLocale => {
    const rights = indexUserAccessRightsAtom.get();
    const hasEditorAccess =
      checkUserScopeAccessRight(null, rights, 'cm', 'EDIT') ||
      checkUserScopeAccessRight(null, rights, 'dash', 'DASH');

    // Отметка свежести переживает потерю кэша: без словаря её разница скроет словарь от сервера.
    if (hasEditorAccess && !objectLength(cachedEditorLocale)) runOnAppInit(requestFullLocales);
  });

  return confAtom;
});

export const takeDynamicLanguageAtom = <L extends Langi>(langi: L) => {
  const confAtomCheck = dynamicLangAtoms[langi];
  if (confAtomCheck) return confAtomCheck;

  const confAtom = atom({} as LocaleDynamic<L>);
  dynamicLangAtoms[langi] = confAtom as never;

  hydrateLocaleAtom(`D${langi}`, confAtom, cachedDynamicLocale =>
    checkValue(cachedDynamicLocale, requestFullLocales),
  );

  return confAtom;
};
