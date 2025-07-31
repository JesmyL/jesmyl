import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';

export const cmTsjrpcClient = new (class Cm extends TsjrpcClient<CmTsjrpcModel> {
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
