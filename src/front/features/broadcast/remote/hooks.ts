import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { useEffect } from 'react';
import { RemoteBroadcastBibleSnapshot, RemoteBroadcastCmSnapshot } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { BibleRemoteBroadcastProvider, CmRemoteBroadcastProvider } from './model';
import {
  registerBibleRemoteBroadcastProvider,
  registerCmRemoteBroadcastProvider,
  scheduleRemoteBroadcastSnapshot,
  startRemoteBroadcastServer,
} from './controller';

export const useCmRemoteBroadcast = (
  snapshot: RemoteBroadcastCmSnapshot,
  actions: Omit<CmRemoteBroadcastProvider, 'snapshot'>,
) => {
  const providerRef = useActualRef<CmRemoteBroadcastProvider>({ snapshot: () => snapshot, ...actions });

  useEffect(() => {
    if (isElectronApp) void startRemoteBroadcastServer();

    return registerCmRemoteBroadcastProvider({
      snapshot: () => providerRef.current.snapshot(),
      toSlide: dir => providerRef.current.toSlide(dir),
      setSlidei: slidei => providerRef.current.setSlidei(slidei),
      selectCom: comw => providerRef.current.selectCom(comw),
    });
  }, [providerRef]);

  useEffect(() => scheduleRemoteBroadcastSnapshot());
};

export const useBibleRemoteBroadcast = (
  snapshot: RemoteBroadcastBibleSnapshot,
  actions: Omit<BibleRemoteBroadcastProvider, 'snapshot'>,
) => {
  const providerRef = useActualRef<BibleRemoteBroadcastProvider>({ snapshot: () => snapshot, ...actions });

  useEffect(() => {
    if (isElectronApp) void startRemoteBroadcastServer();

    return registerBibleRemoteBroadcastProvider({
      snapshot: () => providerRef.current.snapshot(),
      applyAddress: patch => providerRef.current.applyAddress(patch),
      applyTranslation: tName => providerRef.current.applyTranslation(tName),
      search: term => providerRef.current.search(term),
    });
  }, [providerRef]);

  useEffect(() => scheduleRemoteBroadcastSnapshot());
};
