import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { CmSokiInvocatorBaseMethods } from 'shared/api/invocators/cm/invocator.shares.model';

class CmSokiInvocatorServer extends SokiInvocatorServer<CmSokiInvocatorBaseMethods> {
  constructor() {
    super('CmSokiInvocatorServer', {
      editedCom: true,
      freshComList: true,

      editedCat: true,
      freshCatList: true,

      editedChords: true,
      freshChordPack: true,
    });
  }
}

export const cmServerInvocatorShareMethods = new CmSokiInvocatorServer();
