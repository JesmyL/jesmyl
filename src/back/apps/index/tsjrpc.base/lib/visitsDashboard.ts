import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { markDashMessagesRead, takeVisitsDashboard, updateVisitDayMaxOnline } from 'back/dash/visits';
import { onDashMessageStoredEvent } from 'back/dash/events';
import { SokiAuthLogin } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { emptyFunc } from 'shared/utils';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';

const dashLogins = new Set<SokiAuthLogin>();

sokiServer.onOnlineCountChangeEvent.listen(count => {
  indexServerTsjrpcShareMethods
    .visitsOnline({ count }, (_, auth) => !!auth?.login && dashLogins.has(auth.login))
    .catch(emptyFunc);

  updateVisitDayMaxOnline(count).catch(emptyFunc);
});

onDashMessageStoredEvent.listen(message => {
  indexServerTsjrpcShareMethods
    .dashMessage({ message }, (_, auth) => !!auth?.login && dashLogins.has(auth.login))
    .catch(emptyFunc);
});

export const indexTSJRPCBaseVisitsDashboard = {
  getVisitsDashboard_v1: async ({ messages } = {}, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    if (!auth?.login) throw 'Нет прав на это действие';

    dashLogins.add(auth.login);

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
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
