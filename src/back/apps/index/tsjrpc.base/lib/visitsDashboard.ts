import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { markDashMessagesRead, sendCurrentDashReport, takeVisitsDashboard, updateVisitDayOnline } from 'back/dash/visits';
import { onDashMessageStoredEvent } from 'back/dash/events';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { emptyFunc } from 'shared/utils';
import { WebSocket } from 'ws';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';

const dashWatchers = new Set<WebSocket>();

sokiServer.onOnlineCountChangeEvent.listen(({ count, login, isEnter }) => {
  indexServerTsjrpcShareMethods.visitsOnline({ count, login, isEnter }, dashWatchers).catch(emptyFunc);

  updateVisitDayOnline(count).catch(emptyFunc);
});

sokiServer.onClientCloseEvent.listen(client => dashWatchers.delete(client));

onDashMessageStoredEvent.listen(message => {
  indexServerTsjrpcShareMethods.dashMessage({ message }, dashWatchers).catch(emptyFunc);
});

export const indexTSJRPCBaseVisitsDashboard = {
  getVisitsDashboard_v1: async ({ messages } = {}, { auth, client }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    if (!auth?.login) throw 'Нет прав на это действие';
    if (client) dashWatchers.add(client);

    const { logins, anon } = sokiServer.onlineLogins;

    return {
      value: await takeVisitsDashboard(
        { count: sokiServer.onlineCount, logins, anon },
        auth.login,
        messages,
      ),
    };
  },

  markDashMessagesRead_v1: async ({ kind }, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    if (!auth?.login) throw 'Нет прав на это действие';

    return { value: await markDashMessagesRead(auth.login, kind) };
  },

  sendDashEmailReport_v1: async (_, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    if (!auth?.login) throw 'Нет прав на это действие';

    return { value: await sendCurrentDashReport(auth.login) };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
