import {
  backLocaleError,
  backLocalePayload,
  localizeBackLocalePayloads,
  localizeChangesMessageHtml,
  translateBackTexts,
} from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import {
  appVersionFileStore,
  appVersionReleasesFileStore,
  dashReportRecipientsFileStorage,
} from 'back/apps/index/file-stores';
import { sendSchedulePush } from 'back/apps/index/schedules/app-inform/web-push';
import { takeAllUsersTiny, takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { dashErrorDB, dashReadDB, visitDayDB, visitDB } from 'back/drizzle.schema';
import { db, dbDelete, dbUpdate, dbUpsert } from 'back/drizzle/drizzle.db';
import { emailerConfigFileStorage } from 'back/sides/emailer/file-stores';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { and, count, desc, eq, gt, gte, inArray, lt, lte, sql, max as sqlMax } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { DeviceId, Langi, SokiVisit, UserLogin } from 'shared/api';
import { takeLangSystemCode } from 'shared/const/+locale';
import { howMillisecondsInDay, howMillisecondsInHour } from 'shared/const/ms';
import {
  DashCounters,
  DashMessageKind,
  DashMessageUser,
  dashMessageSectionSeparator,
  DashMessagesPage,
  noOnlineSample,
  VisitsDashboard,
  VisitsDashboardMessagesArgs,
  VisitsDashboardOnlineHours,
} from 'shared/model/index/visitsDashboard';
import { emptyFunc } from 'shared/utils';
import { mapObjectEntries, objectKeys, objectLength, objectValues } from 'shared/utils/object.utils';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { makeDiffSectionHtml } from 'shared/utils/textDiff';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { takeErrorPushSummary } from './errorPush';
import { onDashMessageStoredEvent, onVisitStoredEvent } from './events';
import { makeDashMessageForViewer } from './messageLocalization';

const mskShiftMs = 3 * howMillisecondsInHour;
const hoursInDay = 24;
const messagesPageSize = 20;
const errorPushUrl = '/!other/index/actions/dash';
const localhostUrlReg = makeRegExp('/^[^?]+?\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}:\\d{3,5}/');
const dashMessageKinds = [
  DashMessageKind.Support,
  DashMessageKind.Log,
  DashMessageKind.Errors,
  DashMessageKind.Changes,
  DashMessageKind.VisitError,
] as const;
const emptyDashUser: DashMessageUser = { fio: null, nick: null, email: null };
const changesEmailSubjectDateOptions = {
  day: '2-digit',
  year: 'numeric',
  month: '2-digit',
  weekday: 'short',
} as const;

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

const sendDashErrorPush = async (message: string, login: UserLogin | nil) => {
  const author = await takeUserInfo(login ?? null);
  const userIds = (await takeAllUsersTiny()).filter(user => user.r === 'TOP').map(user => user.id);

  if (userIds.length === 0) return;

  await sendSchedulePush(userIds, langi => ({
    title: `${translateBackTexts(langi, BackLocaleKey.DashErrorPushTitle)} - ${
      author.fio ||
      author.nick ||
      author.email ||
      translateBackTexts(langi, BackLocaleKey.DashErrorPushSystemAuthor)
    }`,
    body: takeErrorPushSummary(message, langi),
    url: errorPushUrl,
    tag: 'dash-error',
  }));
};

type VisitRow = { id: number; l: UserLogin | null; deviceId: DeviceId | null; createdAt: number; v: number };

/** Возвращает набор логинов пользователей с ролью TOP: их визиты не попадают в статистику и дайджесты дашборда. */
const takeTopLogins = async () =>
  new Set((await takeAllUsersTiny()).filter(user => user.r === 'TOP').map(user => user.l));

const takeTodayVisitRows = async (now: number) => {
  // Сегодняшние визиты читаются параллельно со списком TOP-логинов; затем строки TOP-пользователей отсеиваются в памяти, чтобы не попасть в статистику.
  const [rows, topLogins] = await Promise.all([
    db
      .select({ id: visitDB.id, l: visitDB.l, deviceId: visitDB.deviceId, createdAt: visitDB.createdAt, v: visitDB.v })
      .from(visitDB)
      .where(gte(visitDB.createdAt, takeMskDayStartMs(now))),
    takeTopLogins(),
  ]);

  return rows.filter(({ l }) => !l || !topLogins.has(l));
};

const takeMinVersionRows = () =>
  db.select({ date: visitDayDB.date, minVersion: visitDayDB.minVersion }).from(visitDayDB).orderBy(desc(visitDayDB.date));

type DayStats = {
  date: string;
  total: number;
  uniq: number;
  visitors: PRecord<UserLogin, number>;
  hours: number[];
  versions: PRecord<number, number>;
  minVersion: number | null;
  anonVisits: number;
  anonUniq: number;
};

const makeDayStats = (date: string, rows: VisitRow[]): DayStats => {
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

/** Пересобирает статистику дня из сохранённой строки visitDayDB в форме `makeDayStats`: анонимные визиты восстанавливаются как разница между общими значениями дня и суммами по авторизованным посетителям. */
const makeDayStatsFromRow = (row: typeof visitDayDB.$inferSelect): ReturnType<typeof makeDayStats> => ({
  date: row.date,
  total: row.total,
  uniq: row.uniq,
  visitors: row.visitors,
  hours: row.hours,
  versions: row.versions,
  minVersion: row.minVersion,
  anonVisits: row.total - objectValues(row.visitors).reduce<number>((sum, count) => sum + (count ?? 0), 0),
  anonUniq: row.uniq - objectLength(row.visitors),
});

const takeLocalizedDate = (date: string, langi = Langi.Ru) =>
  new Date(date).toLocaleDateString(takeLangSystemCode(langi), {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
const takeLocalizedTime = (timeStamp: number, langi = Langi.Ru) =>
  new Date(timeStamp + mskShiftMs).toLocaleTimeString(takeLangSystemCode(langi), {
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

const makeThreeColumnStatsTable = (headCells: string[], rows: { label: string; cells: string[] }[]) =>
  `<table cellspacing="0" cellpadding="4" style="border-collapse:collapse">${
    `<tr>${headCells.map(label => `<th style="${statsHeadStyle}">${label}</th>`).join('')}</tr>` +
    rows
      .map(
        ({ label, cells }) =>
          `<tr><th style="${statsHeadStyle}">${label}</th>${cells.map(cell => `<td style="${statsCellStyle}">${cell}</td>`).join('')}</tr>`,
      )
      .join('')
  }</table>`;

/** Онлайн по часам: за каждый час — минимальный и максимальный одновременно учтённый онлайн; -1 — замера не было, ячейка пустая. */
const makeOnlineHoursTable = async (stats: ReturnType<typeof makeDayStats>, langi: Langi, currentHour: number) => {
  const row = (
    await db
      .select({ hoursOnlineMin: visitDayDB.hoursOnlineMin, hoursOnlineMax: visitDayDB.hoursOnlineMax })
      .from(visitDayDB)
      .where(eq(visitDayDB.date, stats.date))
      .limit(1)
  ).at(0);
  const { min, max } = makeOnlineHours(row?.hoursOnlineMin, row?.hoursOnlineMax);
  const isToday = stats.date === takeMskDayKey(Date.now());

  return makeThreeColumnStatsTable(
    [
      translateBackTexts(langi, BackLocaleKey.VisitReportOnlineTime),
      translateBackTexts(langi, BackLocaleKey.VisitReportOnlineMin),
      translateBackTexts(langi, BackLocaleKey.VisitReportOnlineMax),
    ],
    min.flatMap((minValue, hour) =>
      isToday && hour > currentHour
        ? []
        : [
            {
              label: `${hour}:00`,
              cells: [
                minValue === noOnlineSample ? '' : `${minValue}`,
                max[hour] === noOnlineSample ? '' : `${max[hour]}`,
              ],
            },
          ],
    ),
  );
};

const makeDayStatsHtml = async (stats: ReturnType<typeof makeDayStats>, langi = Langi.Ru) => {
  const visitorRows = (
    await Promise.all(
      mapObjectEntries(stats.visitors, async (login, count) => {
        const name = takeUserAuthName((await takeUserTiny({ l: login }, false))?.uauth) || login;

        return `<tr><td style="${statsBorderStyle}">${escapeHtmlLazy()(name)}</td><td style="${statsCellStyle}"><b>${count}</b></td></tr>`;
      }),
    )
  ).join('');
  const anonVisitsText = translateBackTexts(langi, BackLocaleKey.VisitVisitCount, { n: stats.anonVisits });
  const anonRow = `<tr><td style="${statsBorderStyle}">${translateBackTexts(langi, BackLocaleKey.VisitReportAnonymous)}</td><td style="${statsCellStyle}"><b>${translateBackTexts(langi, BackLocaleKey.VisitReportUniqVisits, { u: stats.anonUniq, v: anonVisitsText })}</b></td></tr>`;
  const visitorsTable = `<table cellspacing="0" cellpadding="4" style="border-collapse:collapse">${
    (visitorRows || `<tr><td style="${statsCellStyle}" colspan="2">—</td></tr>`) + anonRow
  }</table>`;
  const releases = appVersionReleasesFileStore.getValue();
  const minVersionStats = (await takeMinVersionRows()).flatMap(({ date, minVersion }) =>
    minVersion === null
      ? []
      : [
          {
            label: date.slice(5).replace('-', '.'),
            cells: [`${minVersion}`, `${releases[date] ?? '—'}`],
          },
        ],
  );
  const minVersionText =
    stats.minVersion === null
      ? '—'
      : translateBackTexts(langi, BackLocaleKey.VisitReportMinVersionDiff, {
          m: stats.minVersion,
          l: Math.max(0, appVersionFileStore.getValue().num - stats.minVersion),
          c: appVersionFileStore.getValue().num,
        });
  const versionsTable = makeStatsRows(
    objectKeys(stats.versions)
      .map(Number)
      .sort((a, b) => b - a)
      .map(label => ({ label, count: stats.versions[label] ?? 0 })),
  );
  const currentHour = new Date(Date.now() + mskShiftMs).getUTCHours();
  const hourBars = stats.hours
    .map((count, hour) => ({ label: `${hour}:00`, count }))
    .filter((_, hour) => stats.date !== takeMskDayKey(Date.now()) || hour <= currentHour);

  return (
    `<h2>${translateBackTexts(langi, BackLocaleKey.VisitReportTitle, { d: takeLocalizedDate(stats.date, langi) })}</h2>` +
    `<p>${translateBackTexts(langi, BackLocaleKey.VisitReportTotal, { n: `<b>${stats.total}</b>` })}</p>` +
    `<p>${translateBackTexts(langi, BackLocaleKey.VisitReportUniq, { n: `<b>${stats.uniq}</b>` })}</p>` +
    `<p>${translateBackTexts(langi, BackLocaleKey.VisitReportMinVersion, { v: `<b>${minVersionText}</b>` })}</p>` +
    `<h3>${translateBackTexts(langi, BackLocaleKey.VisitReportByVisitors)}</h3>${visitorsTable}` +
    `<h3>${translateBackTexts(langi, BackLocaleKey.VisitReportByHours)}</h3>${makeStatsRows(hourBars, true)}` +
    `<h3>${translateBackTexts(langi, BackLocaleKey.VisitReportOnlineByHours)}</h3>` +
    (await makeOnlineHoursTable(stats, langi, currentHour)) +
    `<h3>${translateBackTexts(langi, BackLocaleKey.VisitReportVersions, { v: appVersionFileStore.getValue().num })}</h3>${versionsTable}` +
    (minVersionStats.length < 2
      ? ''
      : `<h3>${translateBackTexts(langi, BackLocaleKey.VisitReportMinVersionsByDays)}</h3>${makeThreeColumnStatsTable(
          [
            translateBackTexts(langi, BackLocaleKey.VisitReportDate),
            translateBackTexts(langi, BackLocaleKey.VisitReportMinVersionColumn),
            translateBackTexts(langi, BackLocaleKey.VisitReportActualVersion),
          ],
          minVersionStats.slice(0, 10),
        )}`)
  );
};

const visitorLogLimit = 10;

type DayStatsLogVisitor = { name: string; count: number };

const makeDayStatsText = (
  stats: ReturnType<typeof makeDayStats>,
  visitors: DayStatsLogVisitor[],
  langi: Langi,
) => {
  const currentVersion = appVersionFileStore.getValue().num;
  const minVersionText =
    stats.minVersion === null
      ? '—'
      : translateBackTexts(langi, BackLocaleKey.VisitReportMinVersionDiff, {
          m: stats.minVersion,
          l: Math.max(0, currentVersion - stats.minVersion),
          c: currentVersion,
        });
  const anonVisitsText = translateBackTexts(langi, BackLocaleKey.VisitVisitCount, { n: stats.anonVisits });
  const versionsText =
    objectKeys(stats.versions)
      .map(Number)
      .sort((a, b) => b - a)
      .map(version => `${version}: ${stats.versions[version]}`)
      .join(', ') || '—';

  return [
    translateBackTexts(langi, BackLocaleKey.VisitReportTitle, { d: takeLocalizedDate(stats.date, langi) }),
    `${translateBackTexts(langi, BackLocaleKey.VisitReportTotal, { n: stats.total })}. ${translateBackTexts(langi, BackLocaleKey.VisitReportUniq, { n: stats.uniq })}`,
    translateBackTexts(langi, BackLocaleKey.VisitReportMinVersion, { v: minVersionText }),
    `${translateBackTexts(langi, BackLocaleKey.VisitReportByVisitors)}: ${visitors.map(({ name, count }) => `${name} — ${count}`).join(', ') || '—'}`,
    `${translateBackTexts(langi, BackLocaleKey.VisitReportAnonymous)}: ${translateBackTexts(langi, BackLocaleKey.VisitReportUniqVisits, { u: stats.anonUniq, v: anonVisitsText })}`,
    `${translateBackTexts(langi, BackLocaleKey.VisitReportVersions, { v: currentVersion })}: ${versionsText}`,
  ].join('\n');
};

const makeDayStatsLogPayload = async (stats: ReturnType<typeof makeDayStats>) => {
  const visitors = (
    await Promise.all(
      mapObjectEntries(stats.visitors, async (login, count) => ({
        name: takeUserAuthName((await takeUserTiny({ l: login }, false))?.uauth) || login,
        count: count ?? 0,
      })),
    )
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, visitorLogLimit);

  return backLocalePayload(langi => makeDayStatsText(stats, visitors, langi));
};

/** Вставляет визит и сразу рассылает сохранённый ряд в live-канал дашборда: визиты TOP-пользователей пропускаются, `returning` отдаёт ровно те поля, что рендерит вкладка VisitError, а личность пользователя подтягивается через `takeUserInfo` (при сбое — пустой `emptyDashUser`). */
export const insertVisit = (login: UserLogin | nil, visitInfo: SokiVisit) =>
  // Сначала проверяется роль: визиты пользователей с ролью TOP не логируются, чтобы не попадать в статистику и дайджесты.
  (login ? takeUserTiny({ l: login }, false) : Promise.resolve(null)).then(user => {
    if (user?.r === 'TOP') return;

    return db
      .insert(visitDB)
      .values({
        l: login ?? null,
        deviceId: visitInfo.deviceId || null,
        url: visitInfo.urls[0] ?? '',
        agent: visitInfo.agent,
        v: visitInfo.version,
      })
      .returning({ id: visitDB.id, l: visitDB.l, url: visitDB.url, v: visitDB.v, createdAt: visitDB.createdAt })
      .then(async ([row]) => {
        if (!row) return;

        onVisitStoredEvent.invoke({
          id: row.id,
          createdAt: row.createdAt,
          v: row.v,
          url: row.url,
          user: await takeUserInfo(row.l).catch(() => emptyDashUser),
        });
      });
  });

export const insertDashMessage = (
  message: string,
  visitInfo: SokiVisit | nil,
  kind: DashMessageKind,
  login: UserLogin | nil,
) => {
  // Drizzle builders execute on every `then`/`catch`, so the insert runs through a single promise chain.
  return db
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
    })
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
    .then(() =>
      (kind === DashMessageKind.Errors || kind === DashMessageKind.VisitError) && !isLocalhostVisit(visitInfo)
        ? sendDashErrorPush(message, login)
        : undefined,
    )
    .catch(emptyFunc);
};

const sendVisitsDigest = async (stats: ReturnType<typeof makeDayStats>) => {
  await insertDashMessage(await makeDayStatsLogPayload(stats), null, DashMessageKind.Log, null);

  await Promise.all(
    mapObjectEntries(dashReportRecipientsFileStorage.getValue(), async (email, langi) => {
      await sendEmailMessage(EmailerAuthConfigKey.Self, {
        to: email,
        subject: translateBackTexts(langi, BackLocaleKey.VisitDigestEmailSubject, {
          d: takeLocalizedDate(stats.date, langi),
        }),
        html: await makeDayStatsHtml(stats, langi),
      }).catch(emptyFunc);
    }),
  );
};

/** Отправляет дайджест по сохранённой статистике дня из visitDayDB: дни без реальных визитов (total = 0) пропускаются. */
const sendVisitsDigestFromDayDB = async (date: string) => {
  const dayRow = (await db.select().from(visitDayDB).where(eq(visitDayDB.date, date)).limit(1)).at(0);

  if (dayRow && dayRow.total > 0) await sendVisitsDigest(makeDayStatsFromRow(dayRow));
};

export const sendCurrentDashReport = async () => {
  const recipients = dashReportRecipientsFileStorage.getValue();

  if (!objectLength(recipients)) throw backLocaleError(BackLocaleKey.DashReportNoRecipients);

  const now = Date.now();
  const date = takeMskDayKey(now);
  const stats = makeDayStats(date, await takeTodayVisitRows(now));
  const sent: string[] = [];
  const failed: string[] = [];

  (
    await Promise.all(
      mapObjectEntries(recipients, async (email, langi) => {
        try {
          await sendEmailMessage(EmailerAuthConfigKey.Self, {
            to: email,
            subject: translateBackTexts(langi, BackLocaleKey.VisitReportEmailSubject, {
              d: takeLocalizedDate(date, langi),
              t: takeLocalizedTime(now, langi),
            }),
            html: await makeDayStatsHtml(stats, langi),
          });

          return { email, isSent: true };
        } catch {
          return { email, isSent: false };
        }
      }),
    )
  ).forEach(({ email, isSent }) => (isSent ? sent : failed).push(email));

  return { sent, failed };
};

/**
 * Changes are mirrored to the self mailbox that the visits report is sent from (`isSameTo`) and to every configured dash report recipient.
 * Новый конверт `{t,d}` разбирается типизированно: заголовок локализуется и экранируется, готовый HTML диффа идёт в `<pre>`; tsjrpc-сообщения идут прежним секционным путём.
 */
export const sendChangesEmail = async (messageText: string, langi = Langi.Ru) => {
  const subject = `SYSTEM: ${new Date().toLocaleDateString(takeLangSystemCode(langi), changesEmailSubjectDateOptions)} (Changes)`;
  const selfEmail = emailerConfigFileStorage.getValue()[EmailerAuthConfigKey.Self]?.user?.toLowerCase();

  // Готовый HTML письма: новый конверт обрабатывается целиком, остальные сообщения — по секциям, чтобы суффикс авторизации/визита не склеивался с payload'ом.
  const makeHtml = (targetLangi = Langi.Ru) => {
    const changesHtml = localizeChangesMessageHtml(messageText, targetLangi);
    if (changesHtml !== null) return changesHtml;

    // tsjrpc/legacy-сообщения: payload'ы локализуются по секциям, а старая дифф-секция `{"was":...}` размечается `makeDiffSectionHtml`.
    const localized = messageText
      .split(dashMessageSectionSeparator)
      .map(section => localizeBackLocalePayloads(section, targetLangi))
      .join(dashMessageSectionSeparator);

    return makeDiffSectionHtml(localized, true) ?? localized;
  };

  await Promise.all([
    sendEmailMessage(EmailerAuthConfigKey.Self, {
      isSameTo: true,
      subject,
      html: makeHtml(langi),
    }),
    ...mapObjectEntries(dashReportRecipientsFileStorage.getValue(), (email, recipientLangi) =>
      email.toLowerCase() === selfEmail
        ? null
        : sendEmailMessage(EmailerAuthConfigKey.Self, {
            to: email,
            subject,
            html: makeHtml(recipientLangi),
          }).catch(emptyFunc),
    ),
  ]);
};

export const deleteOldDashMessages = () =>
  dbDelete(dashErrorDB, lt(dashErrorDB.createdAt, Date.now() - howMillisecondsInDay * 7));

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

  // Максимум по сообщениям вида читается всегда: он же служит маркером прочтения для вкладок со списком сообщений.
  const [maxMessageRow] = await db
    .select({ max: sqlMax(dashErrorDB.createdAt) })
    .from(dashErrorDB)
    .where(messageKindFilter(kind));
  // Вкладка VisitError показывает визиты из visitDB, поэтому для неё берётся ещё и максимум по визитам.
  const maxVisitRow =
    kind === DashMessageKind.VisitError
      ? (await db.select({ max: sqlMax(visitDB.createdAt) }).from(visitDB)).at(0)
      : null;
  // Итоговый маркер — самый поздний элемент вида; если данных нет ни там, ни там, отметка ставится на текущее время.
  const lastItemAt = Math.max(maxMessageRow?.max ?? 0, maxVisitRow?.max ?? 0);
  const lastReadAt = lastItemAt > 0 ? lastItemAt : Date.now();
  const reads = { ...(await takeDashReads(login)), [kind]: lastReadAt };

  await dbUpsert(dashReadDB, { l: login, reads }, ['l']);

  return reads;
};

let isFlushing = false;

export const flushVisits = async (isNeedSendDigest: boolean) => {
  if (isFlushing) return;

  isFlushing = true;

  try {
    // Завершённые ряды и набор TOP-логинов читаются параллельно; TOP-строки не участвуют в агрегации, но удаляются вместе с остальными завершёнными рядами.
    const [rows, topLogins] = await Promise.all([
      db
        .select({ id: visitDB.id, l: visitDB.l, deviceId: visitDB.deviceId, createdAt: visitDB.createdAt, v: visitDB.v })
        .from(visitDB)
        .orderBy(visitDB.id),
      takeTopLogins(),
    ]);

    const finishedRows = rows.filter(it => it.createdAt < takeMskDayStartMs(Date.now()));

    // Если завершённых рядов нет, но нужен дайджест (ночной запуск), он строится из сохранённой статистики вчерашнего дня: стартовый flushVisits(false) мог уже слить и удалить эти ряды.
    if (finishedRows.length === 0) {
      if (isNeedSendDigest) await sendVisitsDigestFromDayDB(takeMskDayKey(Date.now() - howMillisecondsInDay));
      return;
    }

    const lastId = finishedRows.at(-1)!.id;
    const rowsByDate = new Map<string, VisitRow[]>();

    // В агрегацию попадают только строки без TOP-логина; анонимные визиты остаются всегда.
    finishedRows.forEach(row => {
      if (row.l && topLogins.has(row.l)) return;

      const date = takeMskDayKey(row.createdAt);
      const dateRows = rowsByDate.get(date);

      if (dateRows) dateRows.push(row);
      else rowsByDate.set(date, [row]);
    });

    // Онлайн-данные запрашиваются только для дат, где остались учитываемые ряды.
    const existingOnlineByDate = new Map(
      (
        rowsByDate.size === 0
          ? []
          : await db
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

    // Дайджест строится по вчерашним рядам, пока они есть в visitDB; если стартовый flushVisits(false) уже слил и удалил их, берётся сохранённая статистика дня из visitDayDB и дайджест отправляется по ней (только для реального дня с визитами).
    if (isNeedSendDigest) {
      const finishedDate = takeMskDayKey(Date.now() - howMillisecondsInDay);
      const yesterdayRows = rowsByDate.get(finishedDate);

      if (yesterdayRows) await sendVisitsDigest(makeDayStats(finishedDate, yesterdayRows));
      else await sendVisitsDigestFromDayDB(finishedDate);
    }

    await dbDelete(visitDB, lte(visitDB.id, lastId));
  } finally {
    isFlushing = false;
  }
};

export const takeVisitsDashboard = async (online: {
  count: number;
  logins: UserLogin[];
  anon: number;
}): Promise<VisitsDashboard> => {
  const now = Date.now();

  const [todayRows, dayRows, onlineHoursRows] = await Promise.all([
    takeTodayVisitRows(now),
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
  };
};

export const takeDashMessages = async (
  { kind, beforeId }: VisitsDashboardMessagesArgs,
  langi = Langi.Ru,
): Promise<DashMessagesPage> => {
  const messageKindCondition = messageKindFilter(kind);
  const isVisitErrorKind = kind === DashMessageKind.VisitError;

  const [visitRows, messageRows] = await Promise.all([
    isVisitErrorKind
      ? db
          .select({ id: visitDB.id, l: visitDB.l, url: visitDB.url, v: visitDB.v, createdAt: visitDB.createdAt })
          .from(visitDB)
          .where(beforeId === null ? undefined : lt(visitDB.id, sql`${beforeId}`))
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
            beforeId === null
              ? messageKindCondition
              : and(messageKindCondition, lt(dashErrorDB.id, sql`${beforeId}`)),
          )
          .orderBy(desc(dashErrorDB.id))
          .limit(messagesPageSize + 1),
  ]);

  const visits = await Promise.all(
    visitRows.slice(0, messagesPageSize).map(async visit => ({
      id: visit.id,
      createdAt: visit.createdAt,
      v: visit.v,
      url: visit.url,
      user: await takeUserInfo(visit.l),
    })),
  );

  const pageRows = messageRows.slice(0, messagesPageSize);
  const messages = await Promise.all(
    pageRows.map(async message => ({
      id: message.id,
      kind: message.kind,
      m: makeDashMessageForViewer(message.m, message.kind, langi),
      visit: message.visit,
      createdAt: message.createdAt,
      user: await takeUserInfo(message.l),
      isSystem: !message.l,
    })),
  );

  const hasMore = (isVisitErrorKind ? visitRows : messageRows).length > messagesPageSize;

  return { messages, visits, hasMore };
};

export const takeDashCounters = async (login: UserLogin): Promise<DashCounters> => {
  const reads = await takeDashReads(login);
  const unreadCounts: PRecord<DashMessageKind, number> = {};

  await Promise.all(
    dashMessageKinds.map(async kind => {
      // Вкладка VisitError показывает визиты из visitDB, поэтому её счётчик считается по visitDB, а остальные виды — по сообщениям dashErrorDB.
      const [countRow] =
        kind === DashMessageKind.VisitError
          ? await db
              .select({ count: count() })
              .from(visitDB)
              .where(gt(visitDB.createdAt, reads[kind] ?? 0))
          : await db
              .select({ count: count() })
              .from(dashErrorDB)
              .where(and(messageKindFilter(kind), gt(dashErrorDB.createdAt, reads[kind] ?? 0)));

      unreadCounts[kind] = countRow?.count ?? 0;
    }),
  );

  return { messageReads: reads, unreadCounts };
};
