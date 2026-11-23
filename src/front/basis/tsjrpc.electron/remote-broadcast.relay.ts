import { currentLangiAtom } from '#basis/locale';
import { localeLastModifiedAtAtom, takeBaseLanguageAtom } from '#basis/state/locale';
import { electronRemoteBroadcastTsjrpcClientMethods } from '#basis/tsjrpc.electron/remote-broadcast.cli.methods';
import { applyRemoteLocaleDict, remoteLocaleAtom } from '#features/broadcast/remote/remote-locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { indexTsjrpcClientMethods, schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { Langi } from 'shared/api';
import {
  RemoteBroadcastPublishedControl,
  RemoteLocalePayload,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { emptyFunc } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';

const mainWindowTool = { toWinNum: 0, winNum: 0 };

const makeInstalledLocalesPayload = (langi: Langi): RemoteLocalePayload => {
  const store = remoteLocaleAtom.get();
  const remote = store.byLangi[langi];
  const base = takeBaseLanguageAtom().get();

  return {
    langi,
    ...(langi === currentLangiAtom.get() && objectLength(base)
      ? { base, baseMod: localeLastModifiedAtAtom.get() }
      : {}),
    ...(objectLength(remote) ? { remote, remoteMod: store.modByLangi?.[langi] ?? 0 } : {}),
  };
};

const pushInstalledLocales = () =>
  void electronRemoteBroadcastTsjrpcClientMethods
    .sendInstalledLocales(makeInstalledLocalesPayload(currentLangiAtom.get()), mainWindowTool)
    .catch(emptyFunc);

export const handlePultLocalesRequest = async ({
  langi,
  baseMod,
  remoteMod,
}: {
  langi: Langi;
  baseMod: number;
  remoteMod: number;
}) => {
  const installed = makeInstalledLocalesPayload(langi);

  try {
    const [baseResult, remoteResult] = await Promise.all([
      indexTsjrpcClientMethods.requestFreshBaseLocalesFor({ langi, lastModifiedAt: baseMod }),
      indexTsjrpcClientMethods.requestFreshRemoteLocales({ langi, mod: remoteMod }),
    ]);

    if (remoteResult) applyRemoteLocaleDict(langi, remoteResult.texts, remoteResult.mod);

    void electronRemoteBroadcastTsjrpcClientMethods
      .sharePultLocales(
        {
          langi,
          ...(baseResult != null
            ? { base: baseResult.base, baseMod: baseResult.mod }
            : installed.base != null
              ? { base: installed.base, baseMod: installed.baseMod }
              : {}),
          ...(remoteResult != null
            ? { remote: remoteResult.texts, remoteMod: remoteResult.mod }
            : installed.remote != null
              ? { remote: installed.remote, remoteMod: installed.remoteMod }
              : {}),
        },
        mainWindowTool,
      )
      .catch(emptyFunc);
  } catch {
    void electronRemoteBroadcastTsjrpcClientMethods.sharePultLocales(installed, mainWindowTool).catch(emptyFunc);
  }
};

export const handlePublishedControlsRequest = async () => {
  const share = (controls: RemoteBroadcastPublishedControl[]) =>
    void electronRemoteBroadcastTsjrpcClientMethods.sharePublishedControls({ controls }, mainWindowTool).catch(emptyFunc);

  try {
    const controls = await schLiveTsjrpcClient.requestPublishedRemoteControls_1(undefined, { timeout: 8_000 });

    share(controls);
  } catch {
    share([]);
  }
};

let isRemoteBroadcastRelayRegistered = false;

export const registerRemoteBroadcastRelay = () => {
  if (!isElectronApp || isRemoteBroadcastRelayRegistered) return;

  isRemoteBroadcastRelayRegistered = true;

  takeBaseLanguageAtom().subscribe(pushInstalledLocales);
  remoteLocaleAtom.subscribe(pushInstalledLocales);
  currentLangiAtom.subscribe(pushInstalledLocales);
  pushInstalledLocales();
};
