import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { IndexDashTsjrpcModel } from 'shared/api/tsjrpc/index/dash.tsjrpc.model';
import { indexTSJRPCBaseVisitsDashboard } from './lib/visitsDashboard';

/**
 * Отдельный TSJRPC-поток админского дашборда: те же методы, что раньше лежали в общем `Index`,
 * но под собственным scope. Регистрируется в `back.index.ts` и доступен только админскому клиенту.
 */
export const indexDashTsjrpcServer = new (class IndexDash extends TsjrpcBaseServer<IndexDashTsjrpcModel> {
  constructor() {
    super({
      scope: 'IndexDash',
      methods: indexTSJRPCBaseVisitsDashboard,
    });
  }
})();
