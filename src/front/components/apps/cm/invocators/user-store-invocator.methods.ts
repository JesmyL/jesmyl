import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';

class CmUserStoreSokiInvocatorClient extends SokiInvocatorClient<CmUserStoreSokiInvocatorModel> {
  constructor() {
    super('CmUserStoreSokiInvocatorClient', {
      setComComment: true,
      setComFavorites: true,
    });
  }
}
export const cmUserStoreSokiInvocatorClient = new CmUserStoreSokiInvocatorClient();
