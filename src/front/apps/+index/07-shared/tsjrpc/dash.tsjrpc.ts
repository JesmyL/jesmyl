import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { IndexDashTsjrpcModel } from 'shared/api/tsjrpc/index/dash.tsjrpc.model';

/**
 * Клиент админского потока `IndexDash`: подключается только в админских экранах дашборда
 * и списка пользователей, поэтому обычные пользователи его не импортируют.
 */
export const indexDashTsjrpcClient = new (class IndexDash extends TsjrpcClient<IndexDashTsjrpcModel> {
  constructor() {
    super({
      scope: 'IndexDash',
    });
  }
})();
