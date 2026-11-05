import { backLocaleError, makeBackLocaleErrorDuoText } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { appVersionFileStore } from 'back/apps/index/file-stores';
import { sendSchedulePush } from 'back/apps/index/schedules/app-inform/web-push';
import { takeUserRoleTiny } from 'back/apps/index/tinies/userRoleTiny';
import { takeAllUsersTiny, takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { backConfig } from 'back/config/backConfig';
import { dashErrorDB, dashReadDB, visitDayDB, visitDB } from 'back/drizzle.schema';
import { db, dbDelete, dbUpdate, dbUpsert } from 'back/drizzle/drizzle.db';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { and, count, desc, eq, gt, gte, inArray, lt, lte, sql, max as sqlMax } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { DeviceId, Langi, SokiVisit, UserLogin } from 'shared/api';
import { howMillisecondsInDay, howMillisecondsInHour } from 'shared/const/ms';
import { IndexAccessScopeRules, UserAccessRole } from 'shared/model/index/access-rights';
import {
  DashMessageKind,
  DashMessageUser,
  noOnlineSample,
  VisitsDashboard,
  VisitsDashboardMessagesArgs,
  VisitsDashboardOnlineHours,
} from 'shared/model/index/visitsDashboard';
import { declension, emptyFunc } from 'shared/utils';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { mapObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
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

const makeOnlineHoursArray = () => Array<number>(hoursInDay).fill(noOnlineSample);
const makeOnlineHours = (min: number[] | nil, max: number[] | nil): VisitsDashboardOnlineHours => ({
  min: min ?? makeOnlineHoursArray(),
  max: max ?? makeOnlineHoursArray(),
});

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

/** Короткая однострочная сводка сохранённого сообщения об ошибке для push: payload из backLocale заменяется читаемым Ru-текстом (`makeBackLocaleErrorDuoText`), вырезаются html/div/blockquote, отбрасывается всё после маркера аргументов, маскируются e-mail, схлопываются пробелы и текст усекается до `errorPushTextMaxLength` с многоточием. */
const takeErrorPushSummary = (message: string) => {
  const text = (makeBackLocaleErrorDuoText(message, Langi.Ru) ?? message)
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

const takeTodayVisitRows = (now: number) =>
  db
    .select({ id: visitDB.id, l: visitDB.l, deviceId: visitDB.deviceId, createdAt: visitDB.createdAt, v: visitDB.v })
    .from(visitDB)
    .where(gte(visitDB.createdAt, takeMskDayStartMs(now)));

const takeMinVersionRows = () =>
  db.select({ date: visitDayDB.date, minVersion: visitDayDB.minVersion }).from(visitDayDB).orderBy(visitDayDB.date);

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

const takeRuDate = (date: string) =>
  new Date(date).toLocaleDateString('ru-RU', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
const takeRuTime = (timeStamp: number) =>
  new Date(timeStamp + mskShiftMs).toLocaleTimeString('ru-RU', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  });

type ChartBar = { label: number | string; count: number };

const statsBorderStyle = 'border:1px solid #ddd';
const statsHeadStyle = `${statsBorderStyle};font-size:12px;color:#777`;
const statsCellStyle = `${statsBorderStyle};text-align:center`;
const takeStatsCount = (count: number, isZeroBlank = false) => (count === 0 ? (isZeroBlank ? '' : '—') : `${count}`);

const makeStatsTable = (bars: ChartBar[], isVertical = false, isZeroBlank = false) => {
  const head = (label: number | string) => `<th style="${statsHeadStyle}">${label}</th>`;
  const cell = (count: number) => `<td style="${statsCellStyle}"><b>${takeStatsCount(count, isZeroBlank)}</b></td>`;
  const rows = isVertical
    ? bars.map(({ label, count }) => `<tr>${head(label)}${cell(count)}</tr>`).join('')
    : `<tr>${bars.map(({ label }) => head(label)).join('')}</tr>` +
      `<tr>${bars.map(({ count }) => cell(count)).join('')}</tr>`;

  return `<table cellspacing="0" cellpadding="4" style="border-collapse:collapse">${rows}</table>`;
};

const makeStatsRows = (bars: ChartBar[], isZeroBlank = false) => makeStatsTable(bars, true, isZeroBlank);

const makeDayStatsHtml = async (stats: ReturnType<typeof makeDayStats>) => {
  const visitorRows = (
    await Promise.all(
      mapObjectEntries(stats.visitors, async (login, count) => {
        const name = takeUserAuthName((await takeUserTiny({ l: login }, false))?.uauth) || login;

        return `<tr><td style="${statsBorderStyle}">${escapeHtmlLazy()(name)}</td><td style="${statsCellStyle}"><b>${count}</b></td></tr>`;
      }),
    )
  ).join('');
  const anonVisitsText = `${stats.anonVisits} ${declension(stats.anonVisits, 'визит', 'визита', 'визитов')}`;
  const anonRow = `<tr><td style="${statsBorderStyle}">Анонимные</td><td style="${statsCellStyle}"><b>${stats.anonUniq} уник. / ${anonVisitsText}</b></td></tr>`;
  const visitorsTable = `<table cellspacing="0" cellpadding="4" style="border-collapse:collapse">${
    (visitorRows || `<tr><td style="${statsCellStyle}" colspan="2">—</td></tr>`) + anonRow
  }</table>`;
  const minVersionStats = (await takeMinVersionRows()).flatMap(({ date, minVersion }) =>
    minVersion === null ? [] : [{ label: date.slice(5).replace('-', '.'), count: minVersion }],
  );
  const minVersionText =
    stats.minVersion === null
      ? '—'
      : `${stats.minVersion} (отставание: ${Math.max(0, appVersionFileStore.getValue().num - stats.minVersion)}; текущая: ${appVersionFileStore.getValue().num})`;
  const versionsTable = makeStatsRows(
    objectKeys(stats.versions)
      .map(Number)
      .sort((a, b) => a - b)
      .map(label => ({ label, count: stats.versions[label] ?? 0 })),
  );
  const currentHour = new Date(Date.now() + mskShiftMs).getUTCHours();
  const hourBars = stats.hours
    .map((count, hour) => ({ label: `${hour}:00`, count }))
    .filter((_, hour) => stats.date !== takeMskDayKey(Date.now()) || hour <= currentHour);

  return (
    `<h2>Визиты за ${takeRuDate(stats.date)}</h2>` +
    `<p>Всего визитов: <b>${stats.total}</b></p>` +
    `<p>Уникальных посетителей: <b>${stats.uniq}</b></p>` +
    `<p>Минимальная версия за день: <b>${minVersionText}</b></p>` +
    `<h3>Визиты по посетителям</h3>${visitorsTable}` +
    `<h3>Визиты по часам (МСК)</h3>${makeStatsRows(hourBars, true)}` +
    `<h3>Версии</h3>${versionsTable}` +
    (minVersionStats.length < 2
      ? ''
      : `<h3>Минимальные версии по дням</h3>${makeStatsRows(minVersionStats.slice(-10))}`)
  );
};

const visitorLogLimit = 10;

const makeDayStatsText = async (stats: ReturnType<typeof makeDayStats>) => {
  const visitors = (
    await Promise.all(
      mapObjectEntries(stats.visitors, async (login, count) => ({
        name: escapeHtmlLazy()(takeUserAuthName((await takeUserTiny({ l: login }, false))?.uauth) || login),
        count: count ?? 0,
      })),
    )
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, visitorLogLimit);
  const currentVersion = appVersionFileStore.getValue().num;
  const minVersionText =
    stats.minVersion === null
      ? '—'
      : `${stats.minVersion} (отставание: ${Math.max(0, currentVersion - stats.minVersion)}; текущая: ${currentVersion})`;
  const anonVisitsText = `${stats.anonVisits} ${declension(stats.anonVisits, 'визит', 'визита', 'визитов')}`;
  const versionsText =
    objectKeys(stats.versions)
      .map(Number)
      .sort((a, b) => a - b)
      .map(version => `${version}: ${stats.versions[version]}`)
      .join(', ') || '—';

  return [
    `Визиты за ${takeRuDate(stats.date)}`,
    `Всего визитов: ${stats.total}. Уникальных посетителей: ${stats.uniq}`,
    `Минимальная версия за день: ${minVersionText}`,
    `Визиты по посетителям: ${visitors.map(({ name, count }) => `${name} — ${count}`).join(', ') || '—'}`,
    `Анонимные: ${stats.anonUniq} уник. / ${anonVisitsText}`,
    `Версии: ${versionsText}`,
  ].join('\n');
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

  if ((kind === DashMessageKind.Errors || kind === DashMessageKind.VisitError) && !isLocalhostVisit(visitInfo))
    write.then(() => sendDashErrorPush(takeErrorPushSummary(message), login)).catch(emptyFunc);

  return write;
};

const sendVisitsDigest = async (stats: ReturnType<typeof makeDayStats>) =>
  insertDashMessage(await makeDayStatsText(stats), null, DashMessageKind.Log, null);

export const sendCurrentDashReport = async (login: UserLogin) => {
  const email = (await takeUserTiny({ l: login }, false))?.uauth.email;

  if (!email) throw backLocaleError(BackLocaleKey.EmailNotLinked);

  if (backConfig.isTest) return email;

  const now = Date.now();
  const date = takeMskDayKey(now);
  const stats = makeDayStats(date, await takeTodayVisitRows(now));

  await sendEmailMessage(EmailerAuthConfigKey.Self, {
    isSameTo: true,
    to: email,
    subject: `JesmyL-отчет (промежуточный) ${takeRuDate(date)}, ${takeRuTime(now)}`,
    html: await makeDayStatsHtml(stats),
  });

  return email;
};

export const deleteOldDashMessages = () =>
  dbDelete(dashErrorDB, lt(dashErrorDB.createdAt, Date.now() - howMillisecondsInDay * 60));

export const updateVisitDayOnline = async (online: number) => {
  const now = Date.now();
  const date = takeMskDayKey(now);
  const hour = new Date(now + mskShiftMs).getUTCHours();
  const existing = (
    await db
      .select({
        maxOnline: visitDayDB.maxOnline,
        hoursOnlineMin: visitDayDB.hoursOnlineMin,
        hoursOnlineMax: visitDayDB.hoursOnlineMax,
      })
      .from(visitDayDB)
      .where(eq(visitDayDB.date, date))
      .limit(1)
  ).at(0);

  if (!existing) {
    const hoursOnlineMin = makeOnlineHoursArray();
    const hoursOnlineMax = makeOnlineHoursArray();

    hoursOnlineMin[hour] = online;
    hoursOnlineMax[hour] = online;

    await db
      .insert(visitDayDB)
      .values({
        date,
        total: 0,
        uniq: 0,
        visitors: {},
        hours: Array<number>(hoursInDay).fill(0),
        maxOnline: online,
        hoursOnlineMin,
        hoursOnlineMax,
      })
      .onConflictDoNothing();
    return;
  }

  const hoursOnlineMin = existing.hoursOnlineMin ?? makeOnlineHoursArray();
  const hoursOnlineMax = existing.hoursOnlineMax ?? makeOnlineHoursArray();

  if (hoursOnlineMin[hour] < 0 || online < hoursOnlineMin[hour]) hoursOnlineMin[hour] = online;
  if (hoursOnlineMax[hour] < 0 || online > hoursOnlineMax[hour]) hoursOnlineMax[hour] = online;

  await dbUpdate(
    visitDayDB,
    {
      maxOnline: Math.max(existing.maxOnline, online),
      hoursOnlineMin,
      hoursOnlineMax,
    },
    eq(visitDayDB.date, date),
  );
};

export const markDashMessagesRead = async (login: UserLogin, kind: DashMessageKind) => {
  if (!dashMessageKinds.some(readKind => readKind === kind)) throw backLocaleError(BackLocaleKey.DashMessageKindInvalid);

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

    const existingOnlineByDate = new Map(
      (
        await db
          .select({
            date: visitDayDB.date,
            maxOnline: visitDayDB.maxOnline,
            hoursOnlineMin: visitDayDB.hoursOnlineMin,
            hoursOnlineMax: visitDayDB.hoursOnlineMax,
          })
          .from(visitDayDB)
          .where(inArray(visitDayDB.date, [...rowsByDate.keys()]))
      ).map(row => [row.date, row] as const),
    );

    for (const [date, dateRows] of rowsByDate) {
      const { anonVisits: _anonVisits, anonUniq: _anonUniq, ...dayStats } = makeDayStats(date, dateRows);
      const existingOnline = existingOnlineByDate.get(date);

      await dbUpsert(
        visitDayDB,
        {
          ...dayStats,
          maxOnline: existingOnline?.maxOnline ?? 0,
          hoursOnlineMin: existingOnline?.hoursOnlineMin ?? null,
          hoursOnlineMax: existingOnline?.hoursOnlineMax ?? null,
        },
        ['date'],
      );
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
  const messageKindCondition = messageKindFilter(messagesArgs.kind);
  const isVisitErrorKind = messagesArgs.kind === DashMessageKind.VisitError;

  const [todayRows, visitRows, messageRows, reads, dayRows, onlineHoursRows] = await Promise.all([
    takeTodayVisitRows(now),
    isVisitErrorKind
      ? db
          .select({ id: visitDB.id, l: visitDB.l, url: visitDB.url, v: visitDB.v, createdAt: visitDB.createdAt })
          .from(visitDB)
          .where(messagesArgs.beforeId === null ? undefined : lt(visitDB.id, sql`${messagesArgs.beforeId}`))
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
    db
      .select({ hoursOnlineMin: visitDayDB.hoursOnlineMin, hoursOnlineMax: visitDayDB.hoursOnlineMax })
      .from(visitDayDB)
      .where(eq(visitDayDB.date, takeMskDayKey(now)))
      .limit(1),
  ]);

  const onlineHoursRow = onlineHoursRows.at(0);

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
    onlineHours: makeOnlineHours(onlineHoursRow?.hoursOnlineMin, onlineHoursRow?.hoursOnlineMax),
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
