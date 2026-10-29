import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase, translateEditorBase } from '#basis/locale';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { indexDashMessageVersionAtom, indexVisitsOnlineAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { useEffect, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import {
  DashMessage,
  DashMessageKind,
  DashMessageUser,
  VisitsDashboard,
  VisitsDashboardDayStat,
} from 'shared/model/index/visitsDashboard';
import { twMerge } from 'tailwind-merge';

const messageTabs = [
  { kind: DashMessageKind.VisitError, title: EditorLocaleKey.VisitsVisitErrors },
  { kind: DashMessageKind.Errors, title: EditorLocaleKey.VisitsErrors },
  { kind: DashMessageKind.Support, title: EditorLocaleKey.VisitsSupport },
  { kind: DashMessageKind.Log, title: EditorLocaleKey.VisitsLog },
] as const;

const messageSummaryMaxLength = 80;
const htmlTagsReg = makeRegExp('/<[^>]*>/g');
const whitespaceReg = makeRegExp('/\\s+/g');

const unreadBadgeClassName: Partial<Record<DashMessageKind, string>> = {
  [DashMessageKind.VisitError]: 'bg-red-500/15 text-red-500',
  [DashMessageKind.Errors]: 'bg-red-500/15 text-red-500',
  [DashMessageKind.Log]: 'bg-blue-500/15 text-blue-500',
  [DashMessageKind.Support]: 'bg-orange-500/15 text-orange-500',
};

const enum VisitsHistoryPeriod {
  Day,
  Week,
  Month,
  Year,
}

const historyPeriodOptions = [
  { period: VisitsHistoryPeriod.Day, title: EditorLocaleKey.VisitsPeriodDay },
  { period: VisitsHistoryPeriod.Week, title: EditorLocaleKey.VisitsPeriodWeek },
  { period: VisitsHistoryPeriod.Month, title: EditorLocaleKey.VisitsPeriodMonth },
  { period: VisitsHistoryPeriod.Year, title: EditorLocaleKey.VisitsPeriodYear },
] as const;

const historyDayMs = 86_400_000;
const historyWeekMs = historyDayMs * 7;

type VisitsHistoryBucket = { label: string; count: number };

const takeHistoryBucket = (date: string, period: VisitsHistoryPeriod) => {
  if (period === VisitsHistoryPeriod.Week) {
    const weekStart = Math.floor(Date.parse(`${date}T00:00:00Z`) / historyWeekMs) * historyWeekMs;

    return { key: `${weekStart}`, label: new Date(weekStart).toISOString().slice(5, 10) };
  }

  if (period === VisitsHistoryPeriod.Month) return { key: date.slice(0, 7), label: date.slice(0, 7) };
  if (period === VisitsHistoryPeriod.Year) return { key: date.slice(0, 4), label: date.slice(0, 4) };

  return { key: date, label: date.slice(5) };
};

const makeHistoryBuckets = (
  dayStats: VisitsDashboardDayStat[],
  period: VisitsHistoryPeriod,
): VisitsHistoryBucket[] => {
  const buckets = new Map<string, VisitsHistoryBucket>();

  dayStats.forEach(({ date, total }) => {
    const { key, label } = takeHistoryBucket(date, period);
    const bucket = buckets.get(key);

    if (bucket) bucket.count += total;
    else buckets.set(key, { label, count: total });
  });

  return [...buckets.values()];
};

const makeAverageBuckets = (
  dayStats: VisitsDashboardDayStat[],
  period: VisitsHistoryPeriod,
): VisitsHistoryBucket[] => {
  if (dayStats.length === 0) return [];

  const totalsByDate = new Map(dayStats.map(({ date, total }) => [date, total]));
  const buckets = new Map<string, { label: string; total: number; days: number }>();
  const endTime = Date.parse(`${dayStats[dayStats.length - 1].date}T00:00:00Z`);

  for (
    let time = Date.parse(`${dayStats[0].date}T00:00:00Z`);
    time <= endTime;
    time += historyDayMs
  ) {
    const date = new Date(time).toISOString().slice(0, 10);
    const { key, label } = takeHistoryBucket(date, period);
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.total += totalsByDate.get(date) ?? 0;
      bucket.days++;
    } else
      buckets.set(key, {
        label,
        total: totalsByDate.get(date) ?? 0,
        days: 1,
      });
  }

  return [...buckets.values()].map(({ label, total, days }) => ({ label, count: total / days }));
};

const takeUserName = (user: Pick<DashMessageUser, 'fio' | 'nick' | 'email'>) =>
  user.fio || user.nick || user.email || translateEditorBase(EditorLocaleKey.VisitsAnonymous);

const takeMessageUserName = (message: DashMessage) =>
  message.isSystem ? translateEditorBase(EditorLocaleKey.VisitsSystem) : takeUserName(message.user);

const takeMessageSummary = (html: string) => {
  const text = html.replace(htmlTagsReg, ' ').replace(whitespaceReg, ' ').trim();

  return text.length > messageSummaryMaxLength ? `${text.slice(0, messageSummaryMaxLength)}…` : text;
};

const hoursInDay = 24;
const chartBarWidth = 8;
const chartBarGap = 4;
const chartSlotWidth = chartBarWidth + chartBarGap;
const chartWidth = hoursInDay * chartSlotWidth;
const chartHeight = 100;
const historyBarWidth = 10;
const historyBarGap = 4;
const historySlotWidth = historyBarWidth + historyBarGap;
const historyChartHeight = 100;

const takeHourLabel = (hour: number) => `${`${hour}`.padStart(2, '0')}:00`;

const ChartTooltip = ({ leftPercent, text }: { leftPercent: number; text: string }) => (
  <div
    className="pointer-events-none absolute top-1 z-10 max-w-60 -translate-x-1/2 rounded-lg border border-x2/60 bg-x1/95 px-2 py-1 text-[10px] text-x3 shadow-md"
    style={{ left: `${Math.min(92, Math.max(8, leftPercent))}%` }}
  >
    {text}
  </div>
);

const useCloseChartTooltip = (close: () => void) => {
  useEffect(
    () =>
      hookEffectPipe()
        .pipe(
          addEventListenerPipe(document, 'click', close),
          addEventListenerPipe(document, 'keydown', event => {
            if (event.key === 'Escape') close();
          }),
        )
        .effect(),
    [close],
  );
};

const VisitsHoursChart = ({ hours }: { hours: number[] }) => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const max = Math.max(...hours, 1);
  const mid = Math.round(max / 2);

  useCloseChartTooltip(() => setSelectedHour(null));

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 gap-1">
        <div className="flex h-32 w-6 shrink-0 flex-col justify-between text-right text-[10px] text-x4/70 sm:h-40">
          <span>{max}</span>
          <span>{mid}</span>
          <span>0</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 6}`}
              preserveAspectRatio="none"
              className="h-32 w-full rounded-lg bg-x2/40 sm:h-40"
            >
              {[0, chartHeight / 2, chartHeight].map(y => (
                <line
                  key={y}
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  className="stroke-x4/20"
                  strokeWidth={1}
                />
              ))}
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={chartHeight}
                className="stroke-x4/40"
                strokeWidth={1}
              />
              {Array.from({ length: hoursInDay }, (_, hour) => {
                const count = hours[hour] ?? 0;
                const height = (count / max) * chartHeight;

                return (
                  <rect
                    key={hour}
                    x={hour * chartSlotWidth + chartBarGap / 2}
                    y={chartHeight - height}
                    width={chartBarWidth}
                    height={height}
                    className="pointer fill-chart-2/45"
                    onClick={event => {
                      event.stopPropagation();
                      setSelectedHour(selectedHour === hour ? null : hour);
                    }}
                  >
                    <title>{count}</title>
                  </rect>
                );
              })}
              {Array.from({ length: hoursInDay }, (_, hour) =>
                hour % 3 === 0 || hour === 23 ? (
                  <line
                    key={`tick-${hour}`}
                    x1={hour * chartSlotWidth + chartSlotWidth / 2}
                    y1={chartHeight}
                    x2={hour * chartSlotWidth + chartSlotWidth / 2}
                    y2={chartHeight + 5}
                    className="stroke-x4/40"
                    strokeWidth={1}
                  />
                ) : null,
              )}
            </svg>
            {selectedHour === null || (
              <ChartTooltip
                leftPercent={((selectedHour * chartSlotWidth + chartSlotWidth / 2) / chartWidth) * 100}
                text={translateEditorBase(EditorLocaleKey.VisitsHourPeriod, {
                  f: takeHourLabel(selectedHour),
                  t: takeHourLabel(selectedHour === hoursInDay - 1 ? hoursInDay : selectedHour + 1),
                  c: hours[selectedHour] ?? 0,
                })}
              />
            )}
          </div>
          <div className="mt-1 grid grid-cols-[repeat(24,minmax(0,1fr))] text-[10px] text-x4/70">
            {Array.from({ length: hoursInDay }, (_, hour) => {
              const isLabeled = hour % 3 === 0 || hour === 23;
              const isDenseLabel = hour % 6 === 0 || hour === 23;

              return (
                <span
                  key={hour}
                  className={twMerge(
                    'text-center',
                    !isLabeled ? 'invisible' : isDenseLabel ? undefined : 'max-sm:hidden',
                  )}
                >
                  {isLabeled ? `${hour}`.padStart(2, '0') : ''}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const VisitsBucketsChart = ({
  buckets,
  makeInfo,
}: {
  buckets: VisitsHistoryBucket[];
  makeInfo: (bucket: VisitsHistoryBucket) => string;
}) => {
  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);
  const max = Math.max(...buckets.map(bucket => bucket.count), 1);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 12));
  const chartWidth = Math.max(buckets.length * historySlotWidth, 240);
  const bucketSlotWidth = chartWidth / Math.max(buckets.length, 1);
  const selectedBucketInfo = selectedBucket === null ? null : buckets[selectedBucket];
  const selectedBucketLeftPercent =
    selectedBucket === null ? 0 : ((selectedBucket + 0.5) / Math.max(buckets.length, 1)) * 100;

  useCloseChartTooltip(() => setSelectedBucket(null));

  return (
    <div className="min-w-0">
      <div className="max-w-full overflow-x-auto">
        <div
          className="mx-auto"
          style={{ width: `${chartWidth}px` }}
        >
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${historyChartHeight + 6}`}
              preserveAspectRatio="none"
              className="h-32 w-full rounded-lg bg-x2/40 sm:h-40"
            >
              {buckets.map((bucket, index) => {
                const height = (bucket.count / max) * historyChartHeight;

                return (
                  <rect
                    key={`${bucket.label}-${index}`}
                    x={index * bucketSlotWidth + (bucketSlotWidth - historyBarWidth) / 2}
                    y={historyChartHeight - height}
                    width={historyBarWidth}
                    height={height}
                    className="pointer fill-chart-2/45"
                    onClick={event => {
                      event.stopPropagation();
                      setSelectedBucket(selectedBucket === index ? null : index);
                    }}
                  >
                    <title>{bucket.count}</title>
                  </rect>
                );
              })}
              <line
                x1={0}
                y1={historyChartHeight}
                x2={chartWidth}
                y2={historyChartHeight}
                className="stroke-x4/40"
                strokeWidth={1}
              />
            </svg>
            {!selectedBucketInfo || (
              <ChartTooltip
                leftPercent={selectedBucketLeftPercent}
                text={makeInfo(selectedBucketInfo)}
              />
            )}
          </div>
          <div
            className="mt-1 grid text-[10px] text-x4/70"
            style={{ gridTemplateColumns: `repeat(${Math.max(buckets.length, 1)}, minmax(0, 1fr))` }}
          >
            {buckets.map((bucket, index) => (
              <span
                key={`${bucket.label}-${index}`}
                className={twMerge('truncate text-center', index % labelStep && 'invisible')}
              >
                {bucket.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardMessages = () => {
  const [activeKind, setActiveKind] = useState<DashMessageKind>(DashMessageKind.Errors);
  const [openMessageIds, setOpenMessageIds] = useState<Set<number>>(() => new Set());
  const queryClient = useQueryClient();
  const dashMessageVersion = useAtomValue(indexDashMessageVersionAtom);

  const messagesQuery = useInfiniteQuery({
    queryKey: ['visitsDashboardMessages', activeKind],
    queryFn: ({ pageParam }) =>
      indexTsjrpcClientMethods.getVisitsDashboard_v1({
        messages: { kind: activeKind, beforeId: pageParam || null },
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.messagesHasMore ? (lastPage.messages.at(-1)?.id ?? 0) : undefined,
    refetchInterval: 15_000,
    staleTime: 0,
  });

  const firstPage = messagesQuery.data?.pages[0];
  const messages = messagesQuery.data ? messagesQuery.data.pages.flatMap(page => page.messages) : [];
  const messageReads = firstPage?.messageReads ?? {};
  const unreadCounts = firstPage?.unreadCounts ?? {};

  useEffect(() => {
    if (!dashMessageVersion) return;

    queryClient.invalidateQueries({ queryKey: ['visitsDashboardMessages'] });
  }, [dashMessageVersion, queryClient]);

  const markAllRead = async (kind: DashMessageKind) => {
    await indexTsjrpcClientMethods.markDashMessagesRead_v1({ kind });
    await messagesQuery.refetch();
  };

  const toggleMessage = (messageId: number) => {
    setOpenMessageIds(ids => {
      const next = new Set(ids);

      if (next.has(messageId)) next.delete(messageId);
      else next.add(messageId);

      return next;
    });
  };

  return (
    <section className="min-w-0 max-w-full rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {messageTabs.map(tab => {
          const unreadCount = unreadCounts[tab.kind] ?? 0;

          return (
            <button
              key={tab.kind}
              className={twMerge(
                'pointer flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-x4 hover:text-x3',
                activeKind === tab.kind && 'bg-x2 text-x3',
              )}
              onClick={() => setActiveKind(tab.kind)}
            >
              {translateEditorBase(tab.title)}
              {!unreadCount || (
                <span
                  className={twMerge(
                    'rounded-full px-1.5 text-[10px]',
                    unreadBadgeClassName[tab.kind] ?? 'bg-chart-2/15 text-chart-2',
                  )}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
        <button
          className="pointer rounded-lg px-2 py-1 text-xs text-x4 hover:text-x3"
          onClick={() => markAllRead(activeKind)}
        >
          {translateEditorBase(EditorLocaleKey.VisitsMarkAllRead)}
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
      ) : (
        <div className="flex min-w-0 max-h-96 w-full flex-col gap-2 overflow-y-auto">
          {messages.map(message => {
            const isUnread = message.createdAt > (messageReads[activeKind] ?? 0);
            const isOpen = openMessageIds.has(message.id);

            return (
              <article
                key={message.id}
                className={twMerge(
                  'relative w-full max-w-full min-w-0 rounded-xl border p-2',
                  isUnread ? 'border-chart-2/20 bg-chart-2/10' : 'border-x2/50 bg-x2/20',
                )}
              >
                {!isUnread || (
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-chart-2/70" />
                )}
                <button
                  className="pointer flex w-full min-w-0 flex-col gap-1 text-left"
                  onClick={() => toggleMessage(message.id)}
                >
                  <span className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                    <span className="shrink-0 text-x4/80">
                      {new Date(message.createdAt).toLocaleString('ru', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                    <span className="min-w-0 truncate font-medium text-x3">{takeMessageUserName(message)}</span>
                  </span>
                  <span className="min-w-0 max-w-full truncate text-xs text-x4">{takeMessageSummary(message.m)}</span>
                </button>
                {!isOpen || (
                  <div className="mt-2 w-full min-w-0 max-w-full overflow-x-auto border-t border-x2/50 pt-2">
                    <div
                      className="w-full min-w-0 max-w-full whitespace-pre-line break-words text-xs leading-relaxed text-x4 [overflow-wrap:anywhere] [&_a]:text-x7/80 [&_a]:underline [&_b]:text-x3 [&_blockquote]:border-l-2 [&_blockquote]:border-x2 [&_blockquote]:pl-2 [&_code]:text-x4 [&_p]:my-1"
                      dangerouslySetInnerHTML={{ __html: message.m }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {!messagesQuery.hasNextPage || (
        <button
          className="pointer mx-auto mt-2 block rounded-lg bg-x2/60 px-3 py-1 text-xs text-x4 hover:text-x3 disabled:opacity-50"
          disabled={messagesQuery.isFetchingNextPage}
          onClick={() => messagesQuery.fetchNextPage()}
        >
          {translateEditorBase(EditorLocaleKey.VisitsOlderMessages)}
        </button>
      )}
    </section>
  );
};

const DashboardContent = ({ dashboard }: { dashboard: VisitsDashboard }) => {
  const online = useAtomValue(indexVisitsOnlineAtom) ?? dashboard.online;
  const [isOnlineOpen, setIsOnlineOpen] = useState(false);
  const [isVisitorsOpen, setIsVisitorsOpen] = useState(false);
  const [historyPeriod, setHistoryPeriod] = useState<VisitsHistoryPeriod>(VisitsHistoryPeriod.Day);
  const [averagePeriod, setAveragePeriod] = useState<VisitsHistoryPeriod>(VisitsHistoryPeriod.Week);
  const historyBuckets = makeHistoryBuckets(dashboard.dayStats, historyPeriod);
  const averageBuckets = makeAverageBuckets(dashboard.dayStats, averagePeriod);

  return (
    <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-3 pt-2 sm:gap-4">
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-3">
        <div
          className="pointer min-w-0 rounded-2xl border border-x2/60 bg-x1/60 p-3"
          onClick={() => setIsOnlineOpen(isOpen => !isOpen)}
        >
          <div className="text-xs text-x4">{translateEditorBase(EditorLocaleKey.VisitsOnline)}</div>
          <div className="text-2xl font-semibold text-x3 sm:text-3xl">{online}</div>
          {!isOnlineOpen || (
            <div className="mt-2 flex w-full min-w-0 max-h-48 flex-col gap-1 overflow-y-auto border-t border-x2/50 pt-2">
              {dashboard.onlineUsers.length === 0 && !dashboard.onlineAnon ? (
                <div className="text-xs text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
              ) : (
                <>
                  {dashboard.onlineUsers.map((user, useri) => (
                    <div
                      key={useri}
                      className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-1 even:bg-x2/40"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-x3">{takeUserName(user)}</span>
                    </div>
                  ))}
                  {!dashboard.onlineAnon || (
                    <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-1 even:bg-x2/40">
                      <span className="min-w-0 flex-1 truncate text-sm text-x3">
                        {translateEditorBase(EditorLocaleKey.VisitsAnonymous)}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-chart-2/80">{dashboard.onlineAnon}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-2xl border border-x2/60 bg-x1/60 p-3">
          <div className="text-xs text-x4">{translateEditorBase(EditorLocaleKey.VisitsToday)}</div>
          <div className="text-2xl font-semibold text-x3 sm:text-3xl">{dashboard.today}</div>
        </div>

        <div
          className="pointer min-w-0 rounded-2xl border border-x2/60 bg-x1/60 p-3"
          onClick={() => setIsVisitorsOpen(isOpen => !isOpen)}
        >
          <div className="text-xs text-x4">{translateEditorBase(EditorLocaleKey.VisitsUnique)}</div>
          <div className="text-2xl font-semibold text-x3 sm:text-3xl">{dashboard.uniq}</div>
          {!isVisitorsOpen || (
            <div className="mt-2 flex w-full min-w-0 max-h-48 flex-col gap-1 overflow-y-auto border-t border-x2/50 pt-2">
              {dashboard.visitors.length === 0 && !dashboard.anonVisits ? (
                <div className="text-xs text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
              ) : (
                <>
                  {dashboard.visitors.map((visitor, visitori) => (
                    <div
                      key={visitori}
                      className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-1 even:bg-x2/40"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-x3">{takeUserName(visitor)}</span>
                      <span className="shrink-0 text-xs font-semibold text-chart-2/80">{visitor.count}</span>
                    </div>
                  ))}
                  {!dashboard.anonVisits || (
                    <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-1 even:bg-x2/40">
                      <span className="min-w-0 flex-1 truncate text-sm text-x3">
                        {translateEditorBase(EditorLocaleKey.VisitsAnonymous)}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-chart-2/80">
                        {translateEditorBase(EditorLocaleKey.VisitsAnonSummary, {
                          u: dashboard.anonUniq,
                          v: dashboard.anonVisits,
                        })}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <h2 className="mb-2 text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsTodayByHour)}</h2>
        <VisitsHoursChart hours={dashboard.hours} />
      </section>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <div className="mb-2 flex flex-wrap items-center gap-1">
          <h2 className="mr-auto text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsHistory)}</h2>
          {historyPeriodOptions.map(option => (
            <button
              key={option.period}
              className={twMerge(
                'pointer rounded-lg px-2 py-1 text-xs text-x4 hover:text-x3',
                historyPeriod === option.period && 'bg-x2 text-x3',
              )}
              onClick={() => setHistoryPeriod(option.period)}
            >
              {translateEditorBase(option.title)}
            </button>
          ))}
        </div>
        {historyBuckets.length === 0 ? (
          <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
        ) : (
          <VisitsBucketsChart
            key={historyPeriod}
            buckets={historyBuckets}
            makeInfo={bucket =>
              translateEditorBase(EditorLocaleKey.VisitsHistoryCount, {
                l: bucket.label,
                c: bucket.count,
              })
            }
          />
        )}
      </section>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <div className="mb-2 flex flex-wrap items-center gap-1">
          <h2 className="mr-auto text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsAverage)}</h2>
          {historyPeriodOptions.slice(1).map(option => (
            <button
              key={option.period}
              className={twMerge(
                'pointer rounded-lg px-2 py-1 text-xs text-x4 hover:text-x3',
                averagePeriod === option.period && 'bg-x2 text-x3',
              )}
              onClick={() => setAveragePeriod(option.period)}
            >
              {translateEditorBase(option.title)}
            </button>
          ))}
        </div>
        {averageBuckets.length === 0 ? (
          <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
        ) : (
          <VisitsBucketsChart
            key={`average-${averagePeriod}`}
            buckets={averageBuckets}
            makeInfo={bucket =>
              translateEditorBase(EditorLocaleKey.VisitsAveragePeriod, {
                l: bucket.label,
                c: bucket.count.toFixed(1),
              })
            }
          />
        )}
      </section>

      <DashboardMessages />
    </div>
  );
};

const DashboardBody = () => {
  const { data } = useQuery({
    queryKey: ['visitsDashboard'],
    queryFn: () => indexTsjrpcClientMethods.getVisitsDashboard_v1({}),
    refetchInterval: 15_000,
    staleTime: 0,
  });

  useEffect(() => () => indexVisitsOnlineAtom.set(null), []);

  return (
    <PageContainerConfigurer
      className="visits-dashboard"
      headTitle={translateEditorBase(EditorLocaleKey.VisitsDashboard)}
      content={data ? <DashboardContent dashboard={data} /> : null}
    />
  );
};

export const IndexVisitsDashboardPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!checkAccess('dash', 'DASH')) return null;

  return <DashboardBody />;
};
