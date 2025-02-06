import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorSharesModel } from 'shared/api/invocators/cm/invocator.shares.model';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorSharesModel> {
  constructor() {
    super('CmSokiInvocatorServer', {
      editedCom: true,
      refreshComList: true,

      editedCat: true,
      refreshCatList: true,

      editedChords: true,
      refreshChordPack: true,

      refreshComComments: true,
      refreshAboutComFavorites: true,

      refreshScheduleEventComPacks: true,
    });
  }
}
export const cmServerInvocatorShareMethods = new CmSokiInvocatorServer();
