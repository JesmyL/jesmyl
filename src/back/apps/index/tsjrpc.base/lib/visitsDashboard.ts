import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { markDashMessagesRead, sendCurrentDashReport, takeVisitsDashboard, updateVisitDayOnline } from 'back/dash/visits';
import { onDashMessageStoredEvent } from 'back/dash/events';
import { IndexDashTsjrpcModel } from 'shared/api/tsjrpc/index/dash.tsjrpc.model';
import { Langi, LocalSokiAuth, SokiAuthLogin, UserId } from 'shared/api';
import { validEmailRegExp } from 'shared/const/index/regExp.validators';
import { emptyFunc } from 'shared/utils';
import { objectEntries } from 'shared/utils/object.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { WebSocket } from 'ws';
import { db } from 'back/drizzle/drizzle.db';
import { pushSubscriptionsDB, userDB } from 'back/drizzle.schema';
import { count, eq } from 'drizzle-orm';
import { dashReportRecipientsFileStorage } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { sendSchedulePush } from '../../schedules/app-inform/web-push';
import { takeAllUsersTiny, takeUserTiny } from '../../tinies/userTiny';

/** Считает живые подписки пользователя: нужно и для проверки перед отправкой, и для подсчёта реально обработанных устройств. Считает сама БД через $count, без выгрузки строк. */
const takeUserPushSubscriptionsCount = (userId: UserId) =>
  db.$count(pushSubscriptionsDB, eq(pushSubscriptionsDB.userId, userId));

/**
 * Собирает готовую подсказку точки подписок сразу на языке запрашивающего пользователя:
 * при отсутствии подписок отдаём отдельный текст, при mute добавляем к числу предупреждение, иначе — только число.
 */
const makePushSubscriptionsTitle = (langi: Langi | nil, subscriptionsCount: number, isMuted: boolean) => {
  if (subscriptionsCount === 0)
    return translateBackTexts(langi, BackLocaleKey.PushSubscriptionsAbsent);

  return isMuted
    ? `${subscriptionsCount} • ${translateBackTexts(langi, BackLocaleKey.PushCheckMuted)}`
    : `${subscriptionsCount}`;
};

const dashWatchers = new Set<WebSocket>();
const langis = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En] as const;
const isLangi = (value: unknown): value is Langi => langis.some(langi => langi === value);

/**
 * Проверяет доступ к инструментам PUSH-проверки: подходит либо доступ к дашборду (dash.DASH),
 * либо полный доступ (general.ALL). Сначала пробуем dash, при отказе — general;
 * если не подошёл ни один вариант, вторая проверка бросает locale-ошибку доступа.
 */
const throwIfNoPushTestAccess = async (auth: SokiAuthLogin | LocalSokiAuth | WebSocket | nil) => {
  const hasDashAccess = await throwIfNoUserScopeAccessRight(auth, 'dash', 'DASH').then(
    () => true,
    () => false,
  );

  if (hasDashAccess) return;

  await throwIfNoUserScopeAccessRight(auth, 'general', 'ALL');
};

sokiServer.onOnlineCountChangeEvent.listen(({ count, login, isEnter }) => {
  indexServerTsjrpcShareMethods.visitsOnline({ count, login, isEnter }, dashWatchers).catch(emptyFunc);

  updateVisitDayOnline(count).catch(emptyFunc);
});

sokiServer.onClientCloseEvent.listen(client => dashWatchers.delete(client));

onDashMessageStoredEvent.listen(message => {
  indexServerTsjrpcShareMethods.dashMessage({ message }, dashWatchers).catch(emptyFunc);
});

/**
 * Методы админского потока `IndexDash`: живут отдельно от основного потока `Index`,
 * поэтому в общий клиент и его модель не попадают. Гварды доступа остаются внутри каждого метода.
 */
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

  /**
   * Список пользователей для секции проверки PUSH: имя берётся по правилу fio → nick → email → login,
   * количество подписок считается групповым COUNT по pushSubscriptions, а mutedUntil отдаётся клиенту как isMuted.
   * Подсказка точки подписок формируется сразу на языке запрашивающего пользователя (visitInfo.langi).
   */
  getDashPushTestUsers: async (_, { auth, visitInfo }) => {
    await throwIfNoPushTestAccess(auth);

    const langi = visitInfo?.langi;
    // Один групповой запрос вместо выгрузки всех строк: БД сама считает подписки по каждому пользователю.
    const [users, subscriptionCounts] = await Promise.all([
      takeAllUsersTiny(),
      db
        .select({ userId: pushSubscriptionsDB.userId, count: count() })
        .from(pushSubscriptionsDB)
        .groupBy(pushSubscriptionsDB.userId),
    ]);

    // Раскладываем готовые счётчики в мапу: отсутствие пользователя в ней означает ноль устройств.
    const subscriptionsCountByUserId = new Map(
      subscriptionCounts.map(({ userId, count: subscriptionsCount }) => [userId, subscriptionsCount]),
    );

    const now = Date.now();

    return {
      value: users
        .map(user => {
          const subscriptionsCount = subscriptionsCountByUserId.get(user.id) ?? 0;
          // Mute действует, пока mutedUntil в будущем; null или прошедшая дата означают активные уведомления.
          const isMuted = user.mutedUntil != null && user.mutedUntil > now;

          return {
            id: user.id,
            name: takeUserAuthName({ ...user.uauth, login: user.l }),
            subscriptionsCount,
            isMuted,
            subscriptionsTitle: makePushSubscriptionsTitle(langi, subscriptionsCount, isMuted),
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  },

  /**
   * Отправляет тестовый PUSH на все устройства выбранного пользователя.
   * Перед отправкой проверяем, что пользователь существует и у него есть подписки: иначе бросаем locale-ошибку
   * вместо молчаливого no-op. Результат отражает реальную доставку: при mute отправка не выполняется (0 устройств),
   * а удалённые web-push'ем мёртвые подписки (404/410) вычитаются повторным подсчётом.
   */
  sendTestPushToUser: async ({ userId }, { auth, visitInfo }) => {
    await throwIfNoPushTestAccess(auth);

    const langi = visitInfo?.langi;
    const user = await takeUserTiny({ id: userId }, false);
    if (!user) throw backLocaleError(BackLocaleKey.UserNotFound);

    // takeUserTiny не типизирует поле mutedUntil, поэтому статус приглушения читаем отдельным запросом к userDB.
    const [subscriptionsCount, mutedUntil] = await Promise.all([
      takeUserPushSubscriptionsCount(userId),
      db
        .select({ mutedUntil: userDB.mutedUntil })
        .from(userDB)
        .where(eq(userDB.id, userId))
        .limit(1)
        .then(rows => rows.at(0)?.mutedUntil ?? null),
    ]);

    if (subscriptionsCount === 0) throw backLocaleError(BackLocaleKey.DashPushNoSubscriptions);

    const isMuted = mutedUntil != null && mutedUntil > Date.now();

    // Язык получателя берём внутри langi-функции: заголовок и тело одинаковые, чтобы проверка читалась целиком.
    await sendSchedulePush([userId], langi => {
      const text = translateBackTexts(langi, BackLocaleKey.DashPushCheckText);

      return { title: text, body: text, url: '/' };
    });

    // При mute sendSchedulePush не рассылает; иначе оставшиеся подписки — это устройства без ответа 404/410.
    const deliveredCount = isMuted ? 0 : await takeUserPushSubscriptionsCount(userId);

    // Тексты тостов отдаём сразу на языке запрашивающего пользователя: фронт показывает их как есть.
    return {
      value: {
        sentMessage: translateBackTexts(langi, BackLocaleKey.PushCheckSentToDevices, { n: deliveredCount }),
        mutedMessage: isMuted ? translateBackTexts(langi, BackLocaleKey.PushCheckMuted) : null,
      },
    };
  },
} satisfies ServerTsjrpcSatisfy<IndexDashTsjrpcModel>;
