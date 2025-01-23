import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorSharesModel } from 'shared/api/invocators/cm/invocator.shares.model';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorSharesModel> {
  constructor() {
    super('CmSokiInvocatorServer', {
      editedCom: true,
      freshComList: true,

      editedCat: true,
      freshCatList: true,

      editedChords: true,
      freshChordPack: true,

      freshComComments: true,
      freshComFavorites: true,
    });
  }
}
export const cmServerInvocatorShareMethods = new CmSokiInvocatorServer();
