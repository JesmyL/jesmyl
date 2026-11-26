import { currentLangiAtom } from '#basis/locale';
import { localeLastModifiedAtAtom, takeBaseLanguageAtom } from '#basis/state/locale';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { Langi } from 'shared/api';
import { RemoteBroadcastMessageKind } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { LocaleBase } from 'shared/model/+locale/base';
import { objectLength } from 'shared/utils/object.utils';
import { translateBaseDefine } from 'shared/utils/locale/translate';
import { IncomingRemoteBroadcastMessage } from './model';

type RemoteLocaleStore = {
  modByLangi?: Record<Langi, number>;
  baseModByLangi?: Record<Langi, number>;
  byLangi: Record<Langi, Record<number, string>>;
};

const emptyRemoteLocaleDict: Record<number, string> = {};

const makeModByLangi = (): Record<Langi, number> => ({
  [Langi.Ru]: 0,
  [Langi.Ua]: 0,
  [Langi.Kz]: 0,
  [Langi.En]: 0,
});

const emptyRemoteLocaleStore = (): RemoteLocaleStore => ({
  modByLangi: makeModByLangi(),
  baseModByLangi: makeModByLangi(),
  byLangi: { [Langi.Ru]: {}, [Langi.Ua]: {}, [Langi.Kz]: {}, [Langi.En]: {} },
});

export const remoteLocaleAtom = atom<RemoteLocaleStore>(emptyRemoteLocaleStore(), 'remote:locales');

const takeRemoteLocaleDict = (langi = currentLangiAtom.get()) => remoteLocaleAtom.get().byLangi[langi] ?? {};

const translateRemoteDefine = translateBaseDefine(() => takeRemoteLocaleDict());

export const translateRemote = (key: RemoteLocaleKey, interpolation?: Record<string, string | number | boolean>) =>
  translateRemoteDefine(key as never, interpolation as never) as string;

export const useTranslateRemote = () => {
  const langi = useAtomValue(currentLangiAtom);
  const store = useAtomValue(remoteLocaleAtom);
  const dict = store.byLangi[langi] ?? emptyRemoteLocaleDict;

  return useMemo(() => translateBaseDefine(dict), [dict]);
};

export const applyRemoteLocaleDict = (langi: Langi, remote: Record<number, string>, mod: number) => {
  const store = remoteLocaleAtom.get();
  const modByLangi = store.modByLangi ?? makeModByLangi();
  const currentMod = modByLangi[langi] ?? 0;

  if (mod < currentMod) return;
  if (mod === currentMod && objectLength(store.byLangi[langi])) return;

  remoteLocaleAtom.set({
    ...store,
    modByLangi: { ...modByLangi, [langi]: mod },
    byLangi: { ...store.byLangi, [langi]: remote },
  });
};

const applyBaseLocaleDict = (langi: Langi, base: LocaleBase<Langi>, baseMod: number) => {
  if (langi !== currentLangiAtom.get()) return;

  const store = remoteLocaleAtom.get();
  const baseModByLangi = store.baseModByLangi ?? makeModByLangi();
  const currentBase = takeBaseLanguageAtom().get();
  const currentMod = baseModByLangi[langi] ?? 0;

  if (currentBase[BaseLocaleKey.Langi] === langi && objectLength(currentBase) && baseMod <= currentMod) return;

  takeBaseLanguageAtom().set(base);
  localeLastModifiedAtAtom.set(Math.max(localeLastModifiedAtAtom.get(), baseMod));
  remoteLocaleAtom.set({
    ...store,
    baseModByLangi: { ...baseModByLangi, [langi]: Math.max(currentMod, baseMod) },
  });
};

export const applyRemoteLocaleMessage = (
  message: Extract<IncomingRemoteBroadcastMessage, { k: RemoteBroadcastMessageKind.Locale }>,
) => {
  const { langi, base, baseMod, remote, remoteMod } = message;

  if (base != null && baseMod != null) applyBaseLocaleDict(langi, base, baseMod);

  if (remote != null && remoteMod != null) applyRemoteLocaleDict(langi, remote, remoteMod);
};

export const requestRemoteLocalesIfStale = async () => {
  const langi = currentLangiAtom.get();
  const store = remoteLocaleAtom.get();

  try {
    const result = await indexTsjrpcClientMethods.requestFreshRemoteLocales({
      langi,
      mod: store.modByLangi?.[langi] ?? 0,
    });

    if (result) applyRemoteLocaleDict(langi, result.texts, result.mod);
  } catch {
    return;
  }
};
