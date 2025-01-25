import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import { IExportableCat, IExportableCom } from 'shared/api';
import { CmFreshSokiInvocatorModel } from 'shared/api/invocators/cm/fresh-invocators.model';
import { smylib } from 'shared/utils';
import { cmCatServerInvocatorBase } from './cat-invocator.base';
import { cmComExternalsSokiInvocatorBaseServer } from './com-externals-invocator.base';
import { cmComServerInvocatorBase } from './com-invocator.base';
import { cmComOrderServerInvocatorBase } from './com-order-invocator.base';
import { chordPackFileStore, cmEditorSokiInvocatorBaseServer, eePackFileStore } from './editor-invocator.base';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
import { eventPacksFileStore } from './file-stores';
import { cmServerInvocatorShareMethods } from './invocator.shares';
import {
  cmUserStoreSokiInvocatorBaseServer,
  comCommentsFileStore,
  favoriteComwsFileStore,
} from './user-store-invocator.base';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmFreshSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshSokiInvocatorModel> {
  constructor() {
    super('CmFreshSokiInvocatorBaseServer', {
      getFreshes:
        ({ client, auth }) =>
        async lastModfiedMs => {
          const coms = comsFileStore.getValue().filter(icom => (icom.m ?? icom.w) > lastModfiedMs);
          if (coms.length) cmServerInvocatorShareMethods.refreshComList(client, coms);

          const cats = catsFileStore.getValue().filter(icat => (icat.m ?? icat.w) > lastModfiedMs);
          if (cats.length) cmServerInvocatorShareMethods.refreshCatList(client, cats);

          const chordPackModifiedAt = chordPackFileStore.fileModifiedAt();
          if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedMs) {
            cmServerInvocatorShareMethods.refreshChordPack(client, {
              modifiedAt: chordPackModifiedAt,
              pack: chordPackFileStore.getValue(),
            });
          }

          const comPacks = smylib.values(eventPacksFileStore.getValue()).filter(pack => pack.m > lastModfiedMs);
          if (comPacks.length) cmServerInvocatorShareMethods.refreshScheduleEventComPacks(client, comPacks);

          if (auth != null) {
            if (auth.level >= 50) {
              const eePackModifiedAt = eePackFileStore.fileModifiedAt();
              if (!eePackModifiedAt || eePackModifiedAt > lastModfiedMs) {
                cmEditorServerInvocatorShareMethods.refreshEEPack(client, {
                  modifiedAt: chordPackModifiedAt,
                  pack: eePackFileStore.getValue(),
                });
              }
            }

            if (auth.login != null) {
              const comComments = mylib.values(comCommentsFileStore.getValue()[auth.login]);
              const freshComments = comComments.filter(({ m }) => m > lastModfiedMs);
              if (freshComments.length) cmServerInvocatorShareMethods.refreshComComments(client, freshComments);

              const favoriteComws = favoriteComwsFileStore.getValue()[auth.login];
              if (favoriteComws != null && favoriteComws.m > lastModfiedMs)
                cmServerInvocatorShareMethods.refreshComFavorites(client, favoriteComws.comws, favoriteComws.m);
            }
          }
        },
    });
  }
}
export const cmFreshServerInvocatorBase = new CmFreshSokiInvocatorBaseServer();

cmComServerInvocatorBase.$$register();
cmComExternalsSokiInvocatorBaseServer.$$register();
cmCatServerInvocatorBase.$$register();
cmComOrderServerInvocatorBase.$$register();
cmEditorSokiInvocatorBaseServer.$$register();
cmUserStoreSokiInvocatorBaseServer.$$register();
