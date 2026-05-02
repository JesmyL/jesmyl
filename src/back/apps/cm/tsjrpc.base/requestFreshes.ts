import { FileStore } from 'back/complect/FileStore';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { SMyLib } from 'shared/utils';
import { cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector } from '../client-selectors-by-visit';
import { mapCmImportableToExportableCom } from '../complect/tools';
import {
  aboutComFavoritesFileStore,
  catsFileStore,
  chordPackFileStore,
  cmComWidRefGroupDictFileStore,
  cmConstantsConfigFileStore,
  comCommentsDirStore,
  comsDirStore,
  comsInSchEventDirStorage,
} from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmServerTsjrpcBaseRequestFreshes = {
  requestFreshes: async ({ lastModfiedAt }, { client, auth, visitInfo }) => {
    if (
      cmComWidRefGroupDictFileStore.fileModifiedAt() > lastModfiedAt &&
      cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector(visitInfo)
    ) {
      const refs = cmComWidRefGroupDictFileStore.getValue();

      cmShareServerTsjrpcMethods.refreshComWidRefDict(
        {
          refs,
          mod: cmComWidRefGroupDictFileStore.fileModifiedAt(),
        },
        client,
      );
    }

    const freshComs = comsDirStore.getFreshItems(lastModfiedAt);

    if (freshComs.items.length) {
      cmShareServerTsjrpcMethods.refreshComList(
        {
          coms: freshComs.items.map(mapCmImportableToExportableCom),
          modifiedAt: freshComs.maxMod,
          existComws: comsDirStore.getAllIds(),
        },
        client,
      );
    }

    sendBasicModifiedableList(lastModfiedAt, catsFileStore, catsFileStore.getValue, (cats, modifiedAt) => {
      const existCatws = catsFileStore.getValue().filter(filterNotRemoved).map(extractItemw);
      cmShareServerTsjrpcMethods.refreshCatList({ cats, modifiedAt, existCatws }, client);
    });

    if (chordPackFileStore.fileModifiedAt() > lastModfiedAt) {
      cmShareServerTsjrpcMethods.refreshChordPack(
        {
          modifiedAt: chordPackFileStore.fileModifiedAt(),
          pack: chordPackFileStore.getValue(),
        },
        client,
      );
    }

    const freshComsInSchEvent = comsInSchEventDirStorage.getFreshItems(lastModfiedAt);

    if (freshComsInSchEvent.items.length) {
      cmShareServerTsjrpcMethods.refreshScheduleEventComPacks(
        { packs: freshComsInSchEvent.items, modifiedAt: freshComsInSchEvent.maxMod },
        client,
      );
    }

    if (visitInfo && visitInfo.version > 1039)
      if (cmConstantsConfigFileStore.fileModifiedAt() > lastModfiedAt) {
        cmShareServerTsjrpcMethods.refreshConstantsConfig(
          {
            config: cmConstantsConfigFileStore.getValue(),
            modifiedAt: cmConstantsConfigFileStore.fileModifiedAt(),
          },
          client,
        );
      }

    if (auth?.login != null) {
      const login = auth.login;
      const commentsLastModified = comCommentsDirStore.getItemModTime(login);

      if (commentsLastModified != null && commentsLastModified > lastModfiedAt) {
        do {
          const commentsHolder = comCommentsDirStore.getItem(login);

          const blocks = commentsHolder?.b;
          if (commentsHolder && (commentsHolder.fio == null || commentsHolder.fio !== auth.fio)) {
            commentsHolder.fio = auth.fio;
            comCommentsDirStore.saveItem(login);
          }

          if (blocks == null) break;

          const comments = SMyLib.keys(blocks)
            .filter(comw => blocks[comw] != null && blocks[comw].m > lastModfiedAt)
            .map(strComw => ({
              m: 0,
              comw: +strComw,
              ...blocks[strComw],
            }));

          if (comments.length > 0) {
            cmShareServerTsjrpcMethods.refreshComCommentBlocks({ comments, modifiedAt: commentsLastModified }, client);
          }
        } while (Math.ceil(0));
      }

      const favoriteItem = aboutComFavoritesFileStore.getValue()[login];

      if (favoriteItem && !favoriteItem.fio) {
        favoriteItem.fio = auth.fio ?? '?';
        aboutComFavoritesFileStore.saveValue();
      }

      if (favoriteItem != null && favoriteItem.m > lastModfiedAt)
        cmShareServerTsjrpcMethods.refreshAboutComFavorites({ value: favoriteItem }, client);
    }
  },
} satisfies Partial<ConstructorParameters<typeof TsjrpcBaseServer<CmTsjrpcModel>>[0]['methods']>;

const sendBasicModifiedableList = <Item extends { m: number }, Value>(
  lastModfiedAt: number,
  store: FileStore<Value>,
  listMapper: () => Item[],
  send: (list: Item[], modifiedAt: number) => void,
) => {
  if (store.fileModifiedAt() <= lastModfiedAt) return;
  const items = listMapper().filter(item => item.m > lastModfiedAt);
  send(items, store.fileModifiedAt());
};

const filterNotRemoved = <Item extends { isRemoved?: 1 }>(item: Item) => item.isRemoved !== 1;
const extractItemw = <Item extends { w: number }>(item: Item) => item.w;
