import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';

export const cmUserStoreSokiInvocatorClient =
  new (class CmUserStoreSokiInvocatorClient extends SokiInvocatorClient<CmUserStoreSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmUserStoreSokiInvocatorClient',
        methods: {
          setComComment: true,
          setAboutComFavorites: true,
        },
      });
    }
  })();
