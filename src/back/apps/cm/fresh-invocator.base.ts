import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IExportableCat, IExportableCom } from 'shared/api';
import { CmFreshSokiInvocatorMethods } from 'shared/api/invocators/cm/fresh-invocators.model';
import { cmCatServerInvocatorBase } from './cat-invocator.base';
import { cmComServerInvocatorBase } from './com-invocator.base';
import { cmComOrderServerInvocatorBase } from './com-order-invocator.base';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './invocator.shares';
import { chordPackFileStore, cmOtherServerInvocatorBase, eePackFileStore } from './other-invocator.base';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmFreshSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshSokiInvocatorMethods> {
  constructor() {
    super('CmFreshSokiInvocatorBaseServer', {
      getFreshes:
        ({ client }) =>
        async lastModfiedMs => {
          const coms = comsFileStore.getValue().filter(icom => (icom.m ?? icom.w) > lastModfiedMs);
          if (coms.length) cmServerInvocatorShareMethods.freshComList(client, coms);

          const cats = catsFileStore.getValue().filter(icat => (icat.m ?? icat.w) > lastModfiedMs);
          if (cats.length) cmServerInvocatorShareMethods.freshCatList(client, cats);

          const chordPackModifiedAt = chordPackFileStore.getFileModifiedAt();
          if (!chordPackModifiedAt || chordPackModifiedAt > lastModfiedMs) {
            cmServerInvocatorShareMethods.freshChordPack(client, {
              modifiedAt: chordPackModifiedAt,
              pack: chordPackFileStore.getValue(),
            });
          }

          const eePackModifiedAt = eePackFileStore.getFileModifiedAt();
          if (!eePackModifiedAt || eePackModifiedAt > lastModfiedMs) {
            cmEditorServerInvocatorShareMethods.freshEEPack(client, {
              modifiedAt: chordPackModifiedAt,
              pack: eePackFileStore.getValue(),
            });
          }
        },
    });
  }
}
export const cmFreshServerInvocatorBase = new CmFreshSokiInvocatorBaseServer();

cmComServerInvocatorBase.$$register();
cmCatServerInvocatorBase.$$register();
cmComOrderServerInvocatorBase.$$register();
cmOtherServerInvocatorBase.$$register();
