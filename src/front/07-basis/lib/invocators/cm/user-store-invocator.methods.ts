import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';

class CmUserStoreSokiInvocatorClient extends SokiInvocatorClient<CmUserStoreSokiInvocatorModel> {}
export const cmUserStoreSokiInvocatorClient = new CmUserStoreSokiInvocatorClient('CmUserStoreSokiInvocatorClient', {
  setComComment: true,
  setAboutComFavorites: true,
});
