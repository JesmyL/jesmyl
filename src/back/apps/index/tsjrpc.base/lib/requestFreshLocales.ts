import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import {
  langLocaleBaseFileStoragesLazy,
  langLocaleDynamicFileStoragesLazy,
  langLocaleEditorFileStoragesLazy,
} from 'back/locales/file-storages';
import { Langi } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { baseLocaleMinVersion, throwIfNoEditorLocaleAccess } from './requestFreshes';

export const indexTSJRPCBaseRequestFreshLocales = {
  requestFreshLocales: async ({ lastModifiedAt }, { client, auth, visitInfo }) => {
    if (!client || !visitInfo || visitInfo.version < baseLocaleMinVersion) return;

    const langi = visitInfo.langi ?? Langi.Ru;
    const langiChanged = checkIsNotNil(visitInfo.prevLangi) && visitInfo.prevLangi !== visitInfo.langi;
    const baseFileStorage = langLocaleBaseFileStoragesLazy()[langi];
    const { items, maxMod } = (await langLocaleDynamicFileStoragesLazy()).getFreshItems(lastModifiedAt);

    if (baseFileStorage.fileModifiedAt() > lastModifiedAt || langiChanged) {
      indexServerTsjrpcShareMethods.baseLocConf(
        { base: baseFileStorage.getValue(), mod: baseFileStorage.fileModifiedAt() },
        client,
      );
    }

    if (items.length) indexServerTsjrpcShareMethods.dynLocConf({ dyns: items, mod: maxMod }, client);

    // Версия словаря редактора (1325) ниже версии базы (1328) — ранний return выше уже её покрывает.

    try {
      await throwIfNoEditorLocaleAccess(auth);

      const editorFileStorage = langLocaleEditorFileStoragesLazy()[langi];
      const editorMod = editorFileStorage.fileModifiedAt();

      if (editorMod > lastModifiedAt || langiChanged) {
        indexServerTsjrpcShareMethods.editorLocConf({ editor: editorFileStorage.getValue(), mod: editorMod }, client);
      }
    } catch {
      // Фронт без права на редактирование не получает словарь редактора.
    }
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
