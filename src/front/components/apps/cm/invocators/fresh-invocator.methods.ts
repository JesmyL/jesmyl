import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmFreshSokiInvocatorModel } from 'shared/api/invocators/cm/fresh-invocators.model';

export const cmFreshesSokiInvocatorClient =
  new (class CmFreshSokiInvocatorClient extends SokiInvocatorClient<CmFreshSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmFreshSokiInvocatorClient',
        methods: {
          requestFreshes: true,
          exchangeFreshComComments: true,
        },
      });
    }
  })();
