import { currentLangiAtom } from '#basis/locale';
import { takeEffectiveGamutIndex } from '#basis/model/ColorGamut.model';
import { localeLastModifiedAtAtom, takeBaseLanguageAtom } from '#basis/state/locale';
import { syncPultFrontFiles } from '#basis/tsjrpc.electron/pult-front-sync';
import { electronRemoteBroadcastTsjrpcClientMethods } from '#basis/tsjrpc.electron/remote-broadcast.cli.methods';
import { broadcastNextLiveDataAtom } from '#features/broadcast/atoms';
import { applyRemoteLocaleDict, remoteLocaleAtom } from '#features/broadcast/remote/remote-locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { indexIDB } from '$index/shared/state';
import { indexTsjrpcClientMethods, schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { liveQuery } from 'dexie';
import { Langi, ScheduleWidgetWidDef } from 'shared/api';
import { RemoteBroadcastPublishedControl, RemoteLocalePayload } from 'shared/api/tsjrpc.electtron/remote-broadcast';
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

const pushScreenScheme = async () => {
  const gamuti = takeEffectiveGamutIndex(await indexIDB.get.appColorGamutIndex());

  void electronRemoteBroadcastTsjrpcClientMethods.sendScreenScheme({ gamuti }, mainWindowTool).catch(emptyFunc);
};

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
    void electronRemoteBroadcastTsjrpcClientMethods
      .sharePublishedControls({ controls }, mainWindowTool)
      .catch(emptyFunc);

  try {
    const { schw } = broadcastNextLiveDataAtom.get();
    const controls = await schLiveTsjrpcClient.requestPublishedRemoteControls_2(
      { schw: schw && schw !== ScheduleWidgetWidDef ? schw : null },
      { timeout: 8_000 },
    );

    share(controls);
  } catch {
    share([]);
  }
};

let isRemoteBroadcastRelayRegistered = false;

export const registerRemoteBroadcastRelay = () => {
  if (!isElectronApp || isRemoteBroadcastRelayRegistered) return;

  isRemoteBroadcastRelayRegistered = true;

  liveQuery(async () => indexIDB.get.appColorGamutIndex()).subscribe(pushScreenScheme);
  pushScreenScheme();
  takeBaseLanguageAtom().subscribe(pushInstalledLocales);
  remoteLocaleAtom.subscribe(pushInstalledLocales);
  currentLangiAtom.subscribe(pushInstalledLocales);
  pushInstalledLocales();
  void syncPultFrontFiles();
};
