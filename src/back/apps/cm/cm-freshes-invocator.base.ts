import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IExportableCat, IExportableCom } from 'shared/api';
import { CmSokiInvocatorMethods as CmFreshesSokiInvocatorMethods } from 'shared/api/invocators/cm/invocators.model';
import { cmEditorServerInvocatorShareMethods } from './cm-editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './cm-invocator.shares';
import { chordPackFileStore, eePackFileStore } from './cm-other-invocator.base';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmFreshesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshesSokiInvocatorMethods> {}
export const cmServerInvocatorBase = new CmFreshesSokiInvocatorBaseServer('CmFreshesSokiInvocatorBaseServer', {
  getFreshes: client => async lastModfiedMs => {
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
