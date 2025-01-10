import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IExportableCat, IExportableCom } from 'shared/api';
import { CmSokiInvocatorMethods as CmFreshesSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-invocators';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmFreshesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmFreshesSokiInvocatorMethods> {}
export const cmServerInvocatorBase = new CmFreshesSokiInvocatorBaseServer('CmFreshesSokiInvocatorBaseServer', {
  getFreshComList: () => async lastModfiedMs => {
    return comsFileStore.getValue().filter(icom => (icom.m ?? icom.w) > lastModfiedMs);
  },
  getFreshCatList: () => async lastModfiedMs => {
    return catsFileStore.getValue().filter(icat => (icat.m ?? icat.w) > lastModfiedMs);
  },
});
