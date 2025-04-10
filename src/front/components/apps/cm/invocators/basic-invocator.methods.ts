import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmSokiInvocatorModel } from 'shared/api/invocators/cm/invocators.model';

export const cmSokiInvocatorClient = new (class Cm extends SokiInvocatorClient<CmSokiInvocatorModel> {
  constructor() {
    super({
      scope: 'Cm',
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
