import { dashErrorDB, dashReadDB, visitDayDB, visitDB } from 'back/drizzle.schema';
import { db, dbDelete, dbUpdate, dbUpsert } from 'back/drizzle/drizzle.db';
import { appVersionFileStore } from 'back/apps/index/file-stores';
import { takeAllUsersTiny, takeUserTiny } from 'back/apps/index/tinies/userTiny';import { takeUserRoleTiny } from 'back/apps/index/tinies/userRoleTiny';
import { sendSchedulePush } from 'back/apps/index/schedules/app-inform/web-push';
import { backConfig } from 'back/config/backConfig';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { and, count, desc, eq, gt, gte, inArray, lt, lte, max as sqlMax, sql } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { DeviceId, SokiVisit, UserLogin } from 'shared/api';
import { howMillisecondsInDay, howMillisecondsInHour } from 'shared/const/ms';
import { IndexAccessScopeRules, UserAccessRole } from 'shared/model/index/access-rights';
import {
  DashMessageKind,
  DashMessageUser,
  VisitsDashboard,
  VisitsDashboardMessagesArgs,
} from 'shared/model/index/visitsDashboard';
import { emptyFunc } from 'shared/utils';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { mapObjectEntries, objectLength } from 'shared/utils/object.utils';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { onDashMessageStoredEvent } from './events';

const mskShiftMs = 3 * howMillisecondsInHour;
const hoursInDay = 24;
const messagesPageSize = 20;
const errorPushTitle = 'Новая ошибка';
const errorPushSystemAuthor = 'Система';
const errorPushUrl = '/!other/index/actions/dash';
const errorPushTextMaxLength = 100;
const errorPushArgsMarker = 'Аргументы:';
const localhostUrlReg = makeRegExp('/^[^?]+?\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}:\\d{3,5}/');
const pushDivReg = makeRegExp('/<div[^>]*>[\\s\\S]*?<\\/div>/gi');
const pushBlockquoteReg = makeRegExp('/<blockquote[^>]*>[\\s\\S]*?<\\/blockquote>/gi');
const pushHtmlTagReg = makeRegExp('/<[^>]*>/g');
const pushEmailReg = makeRegExp('/[\\w.+-]+@[\\w.-]+\\.[\\w.-]+/g');
const pushWhitespaceReg = makeRegExp('/\\s+/g');
const dashMessageKinds = [
  DashMessageKind.Support,
  DashMessageKind.Log,
  DashMessageKind.Errors,
  DashMessageKind.Changes,
  DashMessageKind.VisitError,
] as const;
const emptyDashUser: DashMessageUser = { fio: null, nick: null, email: null };

const takeMskDayKey = (timeStamp: number) => new Date(timeStamp + mskShiftMs).toISOString().slice(0, 10);
const takeMskDayStartMs = (timeStamp: number) => {
  const shifted = timeStamp + mskShiftMs;
  return shifted - (shifted % howMillisecondsInDay) - mskShiftMs;
};

const messageKindFilter = (kind: DashMessageKind) => eq(dashErrorDB.kind, kind);

const takeUserInfo = async (login: UserLogin | null): Promise<DashMessageUser> => {
  if (!login) return emptyDashUser;

  const user = await takeUserTiny({ l: login }, false);

  return {
    fio: user?.uauth.fio || null,
    nick: user?.uauth.nick || null,
    email: user?.uauth.email || null,
  };
};

const takeDashReads = async (login: UserLogin) => {
  const reads = (
    await db.select({ reads: dashReadDB.reads }).from(dashReadDB).where(eq(dashReadDB.l, login)).limit(1)
  ).at(0)?.reads;

  return reads ?? ({} satisfies PRecord<DashMessageKind, number>);
};

const isLocalhostVisit = (visitInfo: SokiVisit | nil) => {
  const url = visitInfo?.urls[0];

  return !url || url.includes('localhost') || url.split(localhostUrlReg, 2).length > 1;
};

const takeErrorPushSummary = (message: string) => {
  const text = message
    .replace(pushDivReg, ' ')
    .replace(pushBlockquoteReg, ' ')
    .split(errorPushArgsMarker)[0]
    .replace(pushEmailReg, '***')
    .replace(pushHtmlTagReg, ' ')
    .replace(pushWhitespaceReg, ' ')
    .trim();

  return text.length > errorPushTextMaxLength ? `${text.slice(0, errorPushTextMaxLength)}…` : text;
};

const sendDashErrorPush = async (summary: string, login: UserLogin | nil) => {
  if (backConfig.isTest) return;

  const author = await takeUserInfo(login ?? null);
  const authorName = author.fio || author.nick || author.email || errorPushSystemAuthor;
  const users = await takeAllUsersTiny();
  const roleNamesSet = new Set<UserAccessRole>();

  users.forEach(user => {
    if (user.r) roleNamesSet.add(user.r);
  });

  const roleRights: PRecord<UserAccessRole, IndexAccessScopeRules | nil> = {};

  await Promise.all(
    [...roleNamesSet].map(async role => {
      roleRights[role] = (await takeUserRoleTiny({ n: role }, false))?.r;
    }),
  );

  const userIds = users
    .filter(
      user =>
        user.r === 'TOP' ||
        (user.r != null && checkUserScopeAccessRight(roleRights[user.r], user.rights, 'dash', 'DASH')),
    )
    .map(user => user.id);

  if (userIds.length === 0) return;

  await sendSchedulePush(userIds, {
    title: `${errorPushTitle} - ${authorName}`,
    body: summary,
    url: errorPushUrl,
    tag: 'dash-error',
  });
};

type VisitRow = { id: number; l: UserLogin | null; deviceId: DeviceId | null; createdAt: number; v: number };

const makeDayStats = (date: string, rows: VisitRow[]) => {
  const visitors: PRecord<UserLogin, number> = {};
  const anonDeviceIds = new Set<DeviceId>();
  const versions: PRecord<number, number> = {};
  const hours = Array<number>(hoursInDay).fill(0);
  let anonVisits = 0;
  let minVersion: number | null = null;

  rows.forEach(({ l, deviceId, createdAt, v }) => {
    hours[new Date(createdAt + mskShiftMs).getUTCHours()]++;
    versions[v] = (versions[v] ?? 0) + 1;
    if (minVersion === null || v < minVersion) minVersion = v;

    if (l) visitors[l] = (visitors[l] ?? 0) + 1;
    else {
      anonVisits++;
      if (deviceId) anonDeviceIds.add(deviceId);
    }
  });

  const anonUniq = anonDeviceIds.size;

  return {
    date,
    total: rows.length,
    uniq: objectLength(visitors) + anonUniq,
    visitors,
    hours,
    versions,
    minVersion,
    anonVisits,
    anonUniq,
  };
};

const makeHoursChart = (hours: number[]) => {
  const barWidth = 20;
  const barGap = 4;
  const chartHeight = 120;
  const max = Math.max(...hours, 1);
  const bars = hours
    .map((count, hour) => {
      const height = Math.round((count / max) * chartHeight);
      const x = hour * (barWidth + barGap);

      return (
        `<rect x="${x}" y="${chartHeight - height}" width="${barWidth}" height="${height}" fill="#e07a3f"><title>${hour}:00 — ${count}</title></rect>` +
        `<text x="${x + barWidth / 2}" y="${chartHeight + 14}" font-size="9" text-anchor="middle" fill="#777">${hour}</text>`
      );
    })
    .join('');

  return `<svg width="${hoursInDay * (barWidth + barGap)}" height="${chartHeight + 20}" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
};

const sendVisitsDigest = async (stats: ReturnType<typeof makeDayStats>) => {
  const visitors = (
    await Promise.all(
      mapObjectEntries(stats.visitors, async (login, count) => {
        const name = takeUserAuthName((await takeUserTiny({ l: login }, false))?.uauth) || login;

        return `<li><b>${escapeHtmlLazy()(name)}</b> — ${count}</li>`;
      }),
    )
  ).join('');
  const minVersionText =
    stats.minVersion === null
      ? '—'
      : `${stats.minVersion} (отставание: ${Math.max(0, appVersionFileStore.getValue().num - stats.minVersion)})`;

  await sendEmailMessage(EmailerAuthConfigKey.Self, {
    isSameTo: true,
    subject: `Визиты за ${stats.date}`,
    html:
      `<h2>Визиты за ${stats.date}</h2>` +
      `<p>Всего визитов: <b>${stats.total}</b></p>` +
      `<p>Уникальных посетителей: <b>${stats.uniq}</b></p>` +
      `<p>Минимальная версия за день: <b>${minVersionText}</b></p>` +
      `<h3>Посещения по посетителям</h3><ul>${visitors || '<li>—</li>'}</ul>` +
      `<h3>Посещения по часам (МСК)</h3>${makeHoursChart(stats.hours)}`,
  });
};

export const insertVisit = (login: UserLogin | nil, visitInfo: SokiVisit) =>
  db.insert(visitDB).values({
    l: login ?? null,
    deviceId: visitInfo.deviceId || null,
    url: visitInfo.urls[0] ?? '',
    agent: visitInfo.agent,
    v: visitInfo.version,
  });

export const insertDashMessage = (
  message: string,
  visitInfo: SokiVisit | nil,
  kind: DashMessageKind,
  login: UserLogin | nil,
) => {
  const write = db
    .insert(dashErrorDB)
    .values({
      m: message,
      visit: visitInfo ? JSON.stringify(visitInfo) : '',
      kind,
      l: login ?? null,
    })
    .returning({
      id: dashErrorDB.id,
      kind: dashErrorDB.kind,
      m: dashErrorDB.m,
      visit: dashErrorDB.visit,
      createdAt: dashErrorDB.createdAt,
      l: dashErrorDB.l,
    });

  write
    .then(async ([row]) => {
      if (!row) return;

      onDashMessageStoredEvent.invoke({
        id: row.id,
        kind: row.kind,
        m: row.m,
        visit: row.visit,
        createdAt: row.createdAt,
        user: await takeUserInfo(row.l).catch(() => emptyDashUser),
        isSystem: !row.l,
      });
    })
    .catch(emptyFunc);

  if (
    (kind === DashMessageKind.Errors || kind === DashMessageKind.VisitError) &&
    !isLocalhostVisit(visitInfo)
  )
    write.then(() => sendDashErrorPush(takeErrorPushSummary(message), login)).catch(emptyFunc);

  return write;
};

export const deleteOldDashMessages = () =>
  dbDelete(dashErrorDB, lt(dashErrorDB.createdAt, Date.now() - howMillisecondsInDay * 60));

export const updateVisitDayMaxOnline = async (online: number) => {
  const date = takeMskDayKey(Date.now());
  const existing = (
    await db.select({ maxOnline: visitDayDB.maxOnline }).from(visitDayDB).where(eq(visitDayDB.date, date)).limit(1)
  ).at(0);

  if (!existing) {
    await db
      .insert(visitDayDB)
      .values({
        date,
        total: 0,
        uniq: 0,
        visitors: {},
        hours: Array<number>(hoursInDay).fill(0),
        maxOnline: online,
      })
      .onConflictDoNothing();
    return;
  }

  if (online > existing.maxOnline) await dbUpdate(visitDayDB, { maxOnline: online }, eq(visitDayDB.date, date));
};

export const markDashMessagesRead = async (login: UserLogin, kind: DashMessageKind) => {
  if (!dashMessageKinds.some(readKind => readKind === kind)) throw 'Недопустимый тип сообщений';

  const [maxRow] = await db
    .select({ max: sqlMax(dashErrorDB.createdAt) })
    .from(dashErrorDB)
    .where(messageKindFilter(kind));
  const lastReadAt = maxRow?.max ?? Date.now();
  const reads = { ...(await takeDashReads(login)), [kind]: lastReadAt };

  await dbUpsert(dashReadDB, { l: login, reads }, ['l']);

  return reads;
};

let isFlushing = false;

export const flushVisits = async (isNeedSendDigest: boolean) => {
  if (isFlushing) return;

  isFlushing = true;

  try {
    const rows = await db
      .select({ id: visitDB.id, l: visitDB.l, deviceId: visitDB.deviceId, createdAt: visitDB.createdAt, v: visitDB.v })
      .from(visitDB)
      .orderBy(visitDB.id);

    const finishedRows = rows.filter(it => it.createdAt < takeMskDayStartMs(Date.now()));

    if (finishedRows.length === 0) return;

    const lastId = finishedRows.at(-1)!.id;
    const rowsByDate = new Map<string, VisitRow[]>();

    finishedRows.forEach(row => {
      const date = takeMskDayKey(row.createdAt);
      const dateRows = rowsByDate.get(date);

      if (dateRows) dateRows.push(row);
      else rowsByDate.set(date, [row]);
    });

    const existingMaxOnlineByDate = new Map(
      (
        await db
          .select({ date: visitDayDB.date, maxOnline: visitDayDB.maxOnline })
          .from(visitDayDB)
          .where(inArray(visitDayDB.date, [...rowsByDate.keys()]))
      ).map(row => [row.date, row.maxOnline]),
    );

    for (const [date, dateRows] of rowsByDate) {
      const { anonVisits: _anonVisits, anonUniq: _anonUniq, ...dayStats } = makeDayStats(date, dateRows);

      await dbUpsert(visitDayDB, { ...dayStats, maxOnline: existingMaxOnlineByDate.get(date) ?? 0 }, ['date']);
    }

    if (isNeedSendDigest) {
      const finishedDate = takeMskDayKey(Date.now() - howMillisecondsInDay);
      const yesterdayRows = rowsByDate.get(finishedDate);

      if (yesterdayRows) await sendVisitsDigest(makeDayStats(finishedDate, yesterdayRows));
    }

    await dbDelete(visitDB, lte(visitDB.id, lastId));
  } finally {
    isFlushing = false;
  }
};

export const takeVisitsDashboard = async (
  online: { count: number; logins: UserLogin[]; anon: number },
  login: UserLogin,
  messagesArgs: VisitsDashboardMessagesArgs = { kind: DashMessageKind.Errors, beforeId: null },
): Promise<VisitsDashboard> => {
  const now = Date.now();
  const dayStart = takeMskDayStartMs(now);
  const messageKindCondition = messageKindFilter(messagesArgs.kind);
  const isVisitErrorKind = messagesArgs.kind === DashMessageKind.VisitError;

  const [todayRows, visitRows, messageRows, reads, dayRows] = await Promise.all([
    db
      .select({ id: visitDB.id, l: visitDB.l, deviceId: visitDB.deviceId, createdAt: visitDB.createdAt, v: visitDB.v })
      .from(visitDB)
      .where(gte(visitDB.createdAt, dayStart)),
    isVisitErrorKind
      ? db
          .select({ id: visitDB.id, l: visitDB.l, url: visitDB.url, v: visitDB.v, createdAt: visitDB.createdAt })
          .from(visitDB)
          .where(
            messagesArgs.beforeId === null ? undefined : lt(visitDB.id, sql`${messagesArgs.beforeId}`),
          )
          .orderBy(desc(visitDB.id))
          .limit(messagesPageSize + 1)
      : Promise.resolve([]),
    isVisitErrorKind
      ? Promise.resolve([])
      : db
          .select({
            id: dashErrorDB.id,
            kind: dashErrorDB.kind,
            l: dashErrorDB.l,
            m: dashErrorDB.m,
            visit: dashErrorDB.visit,
            createdAt: dashErrorDB.createdAt,
          })
          .from(dashErrorDB)
          .where(
            messagesArgs.beforeId === null
              ? messageKindCondition
              : and(messageKindCondition, lt(dashErrorDB.id, sql`${messagesArgs.beforeId}`)),
          )
          .orderBy(desc(dashErrorDB.id))
          .limit(messagesPageSize + 1),
    takeDashReads(login),
    db
      .select({
        date: visitDayDB.date,
        total: visitDayDB.total,
        maxOnline: visitDayDB.maxOnline,
        versions: visitDayDB.versions,
        minVersion: visitDayDB.minVersion,
      })
      .from(visitDayDB)
      .where(lt(visitDayDB.date, takeMskDayKey(now)))
      .orderBy(visitDayDB.date),
  ]);

  const stats = makeDayStats(takeMskDayKey(now), todayRows);

  const visitors = await Promise.all(
    mapObjectEntries(stats.visitors, async (visitorLogin, count) => ({
      ...(await takeUserInfo(visitorLogin)),
      count: count ?? 0,
    })),
  );

  const onlineUsers = await Promise.all(online.logins.map(takeUserInfo));

  const visitsHasMore = visitRows.length > messagesPageSize;
  const visits = await Promise.all(
    visitRows.slice(0, messagesPageSize).map(async visit => ({
      id: visit.id,
      createdAt: visit.createdAt,
      v: visit.v,
      url: visit.url,
      user: await takeUserInfo(visit.l),
    })),
  );

  const messagesHasMore = messageRows.length > messagesPageSize;
  const pageRows = messageRows.slice(0, messagesPageSize);
  const messages = await Promise.all(
    pageRows.map(async message => ({
      id: message.id,
      kind: message.kind,
      m: message.m,
      visit: message.visit,
      createdAt: message.createdAt,
      user: await takeUserInfo(message.l),
      isSystem: !message.l,
    })),
  );

  const unreadCounts: PRecord<DashMessageKind, number> = {};

  await Promise.all(
    dashMessageKinds.map(async kind => {
      const [countRow] = await db
        .select({ count: count() })
        .from(dashErrorDB)
        .where(and(messageKindFilter(kind), gt(dashErrorDB.createdAt, reads[kind] ?? 0)));

      unreadCounts[kind] = countRow?.count ?? 0;
    }),
  );

  return {
    online: online.count,
    onlineUsers,
    onlineAnon: online.anon,
    today: stats.total,
    uniq: stats.uniq,
    visitors: visitors.sort((a, b) => b.count - a.count),
    anonVisits: stats.anonVisits,
    anonUniq: stats.anonUniq,
    hours: stats.hours,
    versions: stats.versions,
    todayMinVersion: stats.minVersion,
    dayStats: dayRows,
    messages,
    messagesHasMore,
    visits,
    visitsHasMore,
    messageReads: reads,
    unreadCounts,
  };
};
