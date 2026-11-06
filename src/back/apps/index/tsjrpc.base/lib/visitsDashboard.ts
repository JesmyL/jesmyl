import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { markDashMessagesRead, sendCurrentDashReport, takeVisitsDashboard, updateVisitDayOnline } from 'back/dash/visits';
import { onDashMessageStoredEvent } from 'back/dash/events';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { Langi } from 'shared/api';
import { validEmailRegExp } from 'shared/const/index/regExp.validators';
import { emptyFunc } from 'shared/utils';
import { objectEntries } from 'shared/utils/object.utils';
import { WebSocket } from 'ws';
import { dashReportRecipientsFileStorage } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';

const dashWatchers = new Set<WebSocket>();
const langis = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En] as const;
const isLangi = (value: unknown): value is Langi => langis.some(langi => langi === value);

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

    if (!auth?.login) throw backLocaleError(BackLocaleKey.NoAccess);
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

    if (!auth?.login) throw backLocaleError(BackLocaleKey.NoAccess);

    return { value: await markDashMessagesRead(auth.login, kind) };
  },

  sendDashEmailReport_v2: async (_, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    if (!auth?.login) throw backLocaleError(BackLocaleKey.NoAccess);

    return { value: await sendCurrentDashReport() };
  },

  getDashReportRecipients: async (_, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    return { value: dashReportRecipientsFileStorage.getValue() };
  },

  setDashReportRecipients: async ({ recipients }, { auth }) => {
    await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH');

    const parsedRecipients: PRecord<string, Langi> = {};

    objectEntries(recipients).forEach(([email, langi]) => {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail.match(validEmailRegExp)) throw backLocaleError(BackLocaleKey.EmailIncorrect);
      if (!isLangi(langi)) throw `Invalid langi: ${langi}`;

      parsedRecipients[normalizedEmail] = langi;
    });

    dashReportRecipientsFileStorage.setValue(parsedRecipients);

    return { value: parsedRecipients };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
