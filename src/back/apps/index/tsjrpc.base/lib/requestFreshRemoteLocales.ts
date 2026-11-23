import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { langLocaleRemoteFileStoragesLazy } from 'back/locales/file-storages';
import { Langi } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { baseLocaleMinVersion } from './requestFreshes';
import { takeFreshBaseLocalePayload } from './takeFreshBaseLocalePayload';

export const indexTSJRPCBaseRequestFreshRemoteLocales = {
  requestFreshRemoteLocales: async ({ langi, mod }, { client, visitInfo }) => {
    if (!client || !visitInfo) return { value: null };

    const remoteLangi = langi ?? visitInfo.langi ?? Langi.Ru;
    const remoteFileStorage = langLocaleRemoteFileStoragesLazy()[remoteLangi];
    const remoteMod = remoteFileStorage.fileModifiedAt();

    if (remoteMod <= mod) return { value: null };

    return { value: { texts: remoteFileStorage.getValue(), mod: remoteMod } };
  },

  requestFreshBaseLocalesFor: async ({ langi, lastModifiedAt }, { client, visitInfo }) => {
    if (!client || !visitInfo || visitInfo.version < baseLocaleMinVersion) return { value: null };

    return { value: takeFreshBaseLocalePayload(langi, lastModifiedAt) };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
