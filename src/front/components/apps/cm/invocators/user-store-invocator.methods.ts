import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmUserStoreSokiInvocatorModel } from 'shared/api/invocators/cm/user-store-invocators.model';

export const cmUserStoreSokiInvocatorClient =
  new (class CmUserStore extends SokiInvocatorClient<CmUserStoreSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmUserStore',
        methods: {
          setComComment: true,
          setAboutComFavorites: true,
        },
      });
    }
  })();
