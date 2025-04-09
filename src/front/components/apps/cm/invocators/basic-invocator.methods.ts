import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmBasicSokiInvocatorModel } from 'shared/api/invocators/cm/basic-invocators.model';

export const cmBasicSokiInvocatorClient =
  new (class CmBasicSokiInvocatorClient extends SokiInvocatorClient<CmBasicSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmBasicSokiInvocatorClient',
        methods: {
          requestFreshes: true,
          exchangeFreshComComments: true,
          getComwVisits: true,
          printComwVisit: true,
          takeComwVisitsCount: true,
        },
      });
    }
  })();
