import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import {
  currentLangiAtom,
  languageSystemCode,
  translateBase,
  translateDynamic,
  translateEditorBase,
} from '#basis/locale';
import {
  makeBackLocaleErrorMessageDuoText,
  makeBackLocaleErrorMessageRuText,
  makeBackLocaleErrorMessageText,
} from '#basis/locale/backLocaleError';
import { otherFooterIconAtom, otherFooterIconNamesAtom } from '#basis/state/otherFooterIconAtom';
import { Button } from '#shared/components/ui/button';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { soki } from '#shared/soki';
import { TextInput } from '#shared/ui/TextInput';
import IconConfigurator from '#shared/ui/configurators/Icon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { makeToastKOMoodConfig, makeToastOKMoodConfig, useConfirm } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexDashMessageVersionAtom, indexVisitsOnlineAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { langCodeDict } from 'shared/const/+locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import {
  DashMessage,
  DashMessageKind,
  DashMessageUser,
  VisitsDashboard,
  VisitsDashboardDayStat,
  noOnlineSample,
} from 'shared/model/index/visitsDashboard';
import { extractNumber } from 'shared/utils';
import { mapObjectEntries, objectLength } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { StameskaIconName } from 'stameska-icon/pack';
import { twMerge } from 'tailwind-merge';

const messageTabs = [
  { kind: DashMessageKind.VisitError, title: EditorLocaleKey.VisitsVisitErrors },
  { kind: DashMessageKind.Errors, title: EditorLocaleKey.VisitsErrors },
  { kind: DashMessageKind.Changes, title: EditorLocaleKey.VisitsChanges },
  { kind: DashMessageKind.Support, title: EditorLocaleKey.VisitsSupport },
  { kind: DashMessageKind.Log, title: EditorLocaleKey.VisitsLog },
] as const;

const messageSummaryMaxLength = 80;
const htmlTagsReg = makeRegExp('/<[^>]*>/g');
const whitespaceReg = makeRegExp('/\\s+/g');
const takeLangiTitle = (langi: Langi) => translateDynamic(langi)(it => it[DynLocaleKey.Lang][langi]);

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

const makeHistoryBuckets = (dayStats: VisitsDashboardDayStat[], period: VisitsHistoryPeriod): VisitsHistoryBucket[] => {
  const buckets = new Map<string, VisitsHistoryBucket>();

  dayStats.forEach(({ date, total }) => {
    const { key, label } = takeHistoryBucket(date, period);
    const bucket = buckets.get(key);

    if (bucket) bucket.count += total;
    else buckets.set(key, { label, count: total });
  });

  return [...buckets.values()];
};

const makeAverageBuckets = (dayStats: VisitsDashboardDayStat[], period: VisitsHistoryPeriod): VisitsHistoryBucket[] => {
  if (dayStats.length === 0) return [];

  const totalsByDate = new Map(dayStats.map(({ date, total }) => [date, total]));
  const buckets = new Map<string, { label: string; total: number; days: number }>();
  const endTime = Date.parse(`${dayStats[dayStats.length - 1].date}T00:00:00Z`);

  for (let time = Date.parse(`${dayStats[0].date}T00:00:00Z`); time <= endTime; time += historyDayMs) {
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

const uniqById = <T extends { id: number }>(items: T[]) => [...new Map(items.map(item => [item.id, item])).values()];

type VisitsVersionRow = { version: string; count: number };

const makeVersionRows = (versionsList: PRecord<number, number>[]): VisitsVersionRow[] => {
  const counts: PRecord<number, number> = {};

  versionsList.forEach(versions =>
    mapObjectEntries(versions, (version, count) => {
      const num = Number(version);
      counts[num] = (counts[num] ?? 0) + (count ?? 0);
    }),
  );

  return mapObjectEntries(counts, (version, count) => ({ version, count: count ?? 0 })).sort(
    (a, b) => Number(a.version) - Number(b.version),
  );
};

const hoursInDay = 24;
const chartPlotHeight = 100;
const axisTickTargetCount = 5;
const hourSlotWidth = 12;
const historySlotWidth = 14;
const chartLabelFontSize = 10;
/** Upper-bound advance of a label glyph (digits, dashes, colons) in em. */
const chartLabelGlyphRatio = 0.62;
/** Kept in sync with the `-rotate-[35deg]` class of the label row. */
const chartLabelTiltCosine = Math.cos((35 * Math.PI) / 180);

// Labels are right-anchored at their slot center and tilted leftwards, so the
// horizontal projection of the first one has to fit inside the chart box.
const takeChartLabelInset = (label: string | nil, slotCenter: number) =>
  label
    ? Math.max(
        0,
        Math.ceil(label.length * chartLabelFontSize * chartLabelGlyphRatio * chartLabelTiltCosine - slotCenter / 2 + 1),
      )
    : 0;

const takeHourLabel = (hour: number) => `${`${hour}`.padStart(2, '0')}:00`;

const makeHourBarLabels = (hour: number) => {
  const from = takeHourLabel(hour);
  const to = takeHourLabel(hour === hoursInDay - 1 ? hoursInDay : hour + 1);

  return {
    label: hour % 3 === 0 || hour === hoursInDay - 1 ? `${hour}`.padStart(2, '0') : '',
    fullLabel: `${from}–${to}`,
    from,
    to,
  };
};

const makeCountAxis = (maxCount: number) => {
  const roughStep = Math.max(1, maxCount / axisTickTargetCount);
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const step = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;
  const max = Math.max(step, Math.ceil(maxCount / step) * step);

  return { max, ticks: Array.from({ length: Math.round(max / step) + 1 }, (_, index) => index * step) };
};

type VisitsBar = {
  label: string;
  fullLabel?: string;
  count: number;
  minCount?: number;
  maxCount?: number;
  info: string;
};

const ChartTooltip = ({ text }: { text: string }) => (
  <div className="pointer-events-none absolute top-1 left-1/2 z-10 max-w-60 -translate-x-1/2 rounded-lg border border-x2/60 bg-x1/95 px-2 py-1 text-[10px] text-x3 shadow-md">
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

const VisitsBarsChart = ({
  bars,
  slotWidth,
  minWidth = 240,
  labelStep = 1,
}: {
  bars: VisitsBar[];
  slotWidth: number;
  minWidth?: number;
  labelStep?: number;
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);
  const multiTouchRef = useRef(false);
  const plotWidth = Math.max(bars.length * slotWidth, minWidth);
  const slotCenter = plotWidth / Math.max(bars.length, 1);
  const firstShownLabel = bars.find((bar, index) => index % labelStep === 0 && bar.label.length > 0)?.label;
  const labelInset = takeChartLabelInset(firstShownLabel, slotCenter);
  const chartWidth = plotWidth + labelInset;
  const barWidth = slotWidth - 4;
  const maxCount = Math.max(...bars.map(bar => bar.maxCount ?? bar.count), 1);
  const { max, ticks } = makeCountAxis(maxCount);
  const shownIndices = hoverIndices.length ? hoverIndices : selectedIndices;
  const shownBars = shownIndices.map(index => bars[index]);
  const shownSum = shownBars.reduce((sum, bar) => sum + bar.count, 0);
  const tooltipText =
    shownBars.length > 1
      ? `${shownBars.map(bar => bar.fullLabel || bar.label).join(' + ')} — ${Number.isInteger(shownSum) ? shownSum : shownSum.toFixed(1)}`
      : shownBars[0]?.info;

  useCloseChartTooltip(() => setSelectedIndices([]));

  const hoverBarAtTouch = (event: React.TouchEvent<SVGSVGElement>) => {
    event.stopPropagation();

    if (!bars.length) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const takeIndexAt = (clientX: number) =>
      Math.min(
        Math.max(Math.floor((((clientX - rect.left) / rect.width) * chartWidth - labelInset) / slotCenter), 0),
        bars.length - 1,
      );
    const indices = Array.from(event.touches, touch => takeIndexAt(touch.clientX));

    setHoverIndices([...new Set(indices)]);
  };

  return (
    <div className="flex min-w-0 gap-1">
      <div className="relative h-32 w-6 shrink-0 text-right text-[10px] text-x4/70 sm:h-40">
        {ticks.map(tick => (
          <span
            key={tick}
            className="absolute right-0 -translate-y-1/2"
            style={{ top: `${(1 - tick / max) * 100}%` }}
          >
            {tick}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-x-auto">
        <div
          className="mx-auto"
          style={{ width: `${chartWidth}px` }}
        >
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartPlotHeight}`}
              preserveAspectRatio="none"
              className="h-32 w-full touch-none rounded-lg bg-x2/40 sm:h-40"
              onTouchStart={event => {
                multiTouchRef.current = event.touches.length > 1;
                hoverBarAtTouch(event);
              }}
              onTouchMove={hoverBarAtTouch}
              onTouchEnd={event => {
                event.stopPropagation();

                if (hoverIndices.length > 1) {
                  setSelectedIndices(hoverIndices);
                  multiTouchRef.current = false;
                }

                setHoverIndices([]);
              }}
            >
              <line
                x1={labelInset + 0.5}
                y1={0}
                x2={labelInset + 0.5}
                y2={chartPlotHeight}
                className="stroke-x4/40"
                strokeWidth={1}
              />
              {ticks.map(tick => {
                const y = chartPlotHeight - (tick / max) * chartPlotHeight;

                return (
                  <line
                    key={tick}
                    x1={labelInset}
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    className={tick ? 'stroke-x4/20' : 'stroke-x4/40'}
                    strokeWidth={1}
                  />
                );
              })}
              {bars.map((bar, index) => {
                const barCount = bar.maxCount ?? bar.count;
                const height = (barCount / max) * chartPlotHeight;
                const x = labelInset + (index + 0.5) * slotCenter - barWidth / 2;
                const extensionClassName = hoverIndices.includes(index)
                  ? 'pointer fill-chart-2/25'
                  : selectedIndices.includes(index)
                    ? 'pointer fill-chart-2/20'
                    : 'pointer fill-chart-2/10';
                const onClick = (event: React.MouseEvent) => {
                  event.stopPropagation();

                  if (multiTouchRef.current) {
                    multiTouchRef.current = false;

                    return;
                  }

                  setSelectedIndices(indices =>
                    indices.includes(index)
                      ? indices.filter(selectedIndex => selectedIndex !== index)
                      : [...indices, index],
                  );
                };

                return (
                  <g
                    key={index}
                    onMouseEnter={() => setHoverIndices([index])}
                    onMouseLeave={() => setHoverIndices([])}
                  >
                    <title>{barCount}</title>
                    <rect
                      x={x}
                      y={0}
                      width={barWidth}
                      height={chartPlotHeight}
                      className={extensionClassName}
                      onClick={onClick}
                    />
                    {bar.maxCount == null ? (
                      <rect
                        x={x}
                        y={chartPlotHeight - height}
                        width={barWidth}
                        height={height}
                        className="pointer fill-chart-2/45"
                        onClick={onClick}
                      />
                    ) : (
                      <>
                        <rect
                          x={x}
                          y={chartPlotHeight - height}
                          width={barWidth}
                          height={height}
                          className="pointer fill-chart-2/70"
                          onClick={onClick}
                        />
                        <rect
                          x={x}
                          y={chartPlotHeight - ((bar.minCount ?? 0) / max) * chartPlotHeight}
                          width={barWidth}
                          height={((bar.minCount ?? 0) / max) * chartPlotHeight}
                          className="pointer fill-chart-2/30"
                          onClick={onClick}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
            {!tooltipText || <ChartTooltip text={tooltipText} />}
          </div>
          <div className="relative mt-1 h-12 text-[10px] text-x4/70">
            {bars.map((bar, index) =>
              index % labelStep || !bar.label ? null : (
                <span
                  key={index}
                  className="absolute top-0 origin-top-right -translate-x-full leading-none -rotate-[35deg] whitespace-nowrap"
                  style={{ left: `${labelInset + (index + 0.5) * slotCenter}px` }}
                >
                  {bar.label}
                </span>
              ),
            )}
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
  const langi = useAtomValue(currentLangiAtom);
  const isVisitErrorKind = activeKind === DashMessageKind.VisitError;

  const messagesQuery = useInfiniteQuery({
    queryKey: ['visitsDashboardMessages', activeKind],
    queryFn: ({ pageParam }) =>
      indexTsjrpcClientMethods.getVisitsDashboard_v1({
        messages: { kind: activeKind, beforeId: pageParam || null },
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const activeList = isVisitErrorKind ? lastPage.visits : lastPage.messages;
      const hasMore = isVisitErrorKind ? lastPage.visitsHasMore : lastPage.messagesHasMore;

      return hasMore ? activeList.at(-1)?.id : undefined;
    },
    refetchInterval: 15_000,
    staleTime: 0,
  });

  const firstPage = messagesQuery.data?.pages[0];
  const messages = uniqById(messagesQuery.data?.pages.flatMap(page => page.messages) ?? []);
  const visits = uniqById(messagesQuery.data?.pages.flatMap(page => page.visits) ?? []);
  const isEmpty = isVisitErrorKind ? visits.length === 0 : messages.length === 0;
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
              {!unreadCount || tab.kind === DashMessageKind.VisitError || (
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
        {isVisitErrorKind || (
          <button
            className="pointer rounded-lg px-2 py-1 text-xs text-x4 hover:text-x3"
            onClick={() => markAllRead(activeKind)}
          >
            {translateEditorBase(EditorLocaleKey.VisitsMarkAllRead)}
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
      ) : (
        <div className="flex min-w-0 max-h-96 w-full flex-col gap-2 overflow-y-auto">
          {isVisitErrorKind
            ? visits.map(visit => (
                <article
                  key={visit.id}
                  className="w-full max-w-full min-w-0 rounded-xl border border-x2/50 bg-x2/20 p-2"
                >
                  <span className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                    <span className="shrink-0 text-x4/80">
                      {new Date(visit.createdAt).toLocaleString(languageSystemCode, {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                    <span className="min-w-0 truncate font-medium text-x3">{takeUserName(visit.user)}</span>
                    <span className="shrink-0 text-x4/80">v{visit.v}</span>
                  </span>
                  <div className="min-w-0 max-w-full truncate text-xs text-x4">{visit.url}</div>
                </article>
              ))
            : messages.map(message => {
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
                    {!isUnread || <span className="absolute right-2 top-2 size-1.5 rounded-full bg-chart-2/70" />}
                    <button
                      className="pointer flex w-full min-w-0 flex-col gap-1 text-left"
                      onClick={() => toggleMessage(message.id)}
                    >
                      <span className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                        <span className="shrink-0 text-x4/80">
                          {new Date(message.createdAt).toLocaleString(languageSystemCode, {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                        <span className="min-w-0 truncate font-medium text-x3">{takeMessageUserName(message)}</span>
                      </span>
                      <span className="min-w-0 max-w-full truncate text-xs text-x4">
                        {takeMessageSummary(
                          activeKind === DashMessageKind.Errors
                            ? makeBackLocaleErrorMessageRuText(message.m)
                            : makeBackLocaleErrorMessageText(message.m, langi),
                        )}
                      </span>
                    </button>
                    {!isOpen || (
                      <div className="mt-2 w-full min-w-0 max-w-full overflow-x-auto border-t border-x2/50 pt-2">
                        <div
                          className="w-full min-w-0 max-w-full whitespace-pre-line break-words text-xs leading-relaxed text-x4 [overflow-wrap:anywhere] [&_a]:text-x7/80 [&_a]:underline [&_b]:text-x3 [&_blockquote]:border-l-2 [&_blockquote]:border-x2 [&_blockquote]:pl-2 [&_code]:text-x4 [&_p]:my-1"
                          dangerouslySetInnerHTML={{
                            __html:
                              activeKind === DashMessageKind.Errors
                                ? makeBackLocaleErrorMessageDuoText(message.m, langi)
                                : makeBackLocaleErrorMessageText(message.m, langi),
                          }}
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

const DashboardEmailReportButton = () => {
  const [isSending, setIsSending] = useState(false);

  const sendReport = async () => {
    setIsSending(true);

    try {
      const { sent, failed } = await indexTsjrpcClientMethods.sendDashEmailReport_v2();
      if (!failed.length) {
        toast(translateEditorBase(EditorLocaleKey.VisitsReportSent, { e: sent.join(', ') }), makeToastOKMoodConfig());
        return;
      }

      toast(
        translateEditorBase(EditorLocaleKey.VisitsReportNotSent, { e: failed.join(', ') }),
        makeToastKOMoodConfig(),
      );
    } catch (error) {
      toast('' + error, makeToastKOMoodConfig());
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      className="pointer rounded-lg border border-x2/60 bg-x1/60 px-3 py-1 text-xs text-x4 hover:text-x3 disabled:opacity-50"
      disabled={isSending}
      onClick={sendReport}
    >
      {translateEditorBase(EditorLocaleKey.VisitsSendReport)}
    </button>
  );
};

const DashboardReportRecipients = () => {
  const confirm = useConfirm();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [langi, setLangi] = useState<Langi>(() => currentLangiAtom.get());
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const recipientsQuery = useQuery({
    queryKey: ['dashReportRecipients'],
    queryFn: () => indexTsjrpcClientMethods.getDashReportRecipients(),
  });
  const recipients = recipientsQuery.data ?? {};
  const takeFreshestRecipients = () =>
    queryClient.getQueryData<PRecord<string, Langi>>(['dashReportRecipients']) ?? recipients;

  const saveRecipients = async (nextRecipients: PRecord<string, Langi>) => {
    if (isSaving) return false;

    setIsSaving(true);

    try {
      const saved = await indexTsjrpcClientMethods.setDashReportRecipients({ recipients: nextRecipients });
      queryClient.setQueryData(['dashReportRecipients'], saved);
      toast(translateEditorBase(EditorLocaleKey.VisitsRecipientsSaved), makeToastOKMoodConfig());
      return true;
    } catch (error) {
      toast('' + error, makeToastKOMoodConfig());
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const addRecipient = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    if (await saveRecipients({ ...takeFreshestRecipients(), [normalizedEmail]: langi })) setEmail('');
  };

  const removeRecipient = (targetEmail: string) => {
    const nextRecipients = { ...takeFreshestRecipients() };
    delete nextRecipients[targetEmail];
    void saveRecipients(nextRecipients);
  };

  return (
    <>
      <button
        className="pointer mr-auto rounded-lg border border-x2/60 bg-x1/60 px-3 py-1 text-xs text-x4 hover:text-x3"
        onClick={() => setIsOpen(isOpen => !isOpen)}
      >
        {translateEditorBase(EditorLocaleKey.VisitsReportRecipients)}
      </button>
      {!isOpen || (
        <section className="basis-full rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
          <div className="flex min-w-0 flex-col gap-1">
            {mapObjectEntries(recipients, (recipientEmail, recipientLangi) => (
              <div
                key={recipientEmail}
                className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1 even:bg-x2/40"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-x3">{recipientEmail}</span>
                <Dropdown
                  className="h-7 w-20 shrink-0 rounded-md border border-ring bg-x1 px-2 text-xs text-x4"
                  disabled={isSaving}
                  id={recipientLangi ?? Langi.Ru}
                  onSelectId={nextLangi => saveRecipients({ ...takeFreshestRecipients(), [recipientEmail]: nextLangi })}
                  items={mapObjectEntries(langCodeDict, langi => {
                    const langiId = extractNumber(langi);

                    return { id: langiId, title: takeLangiTitle(langiId) };
                  })}
                />
                <button
                  className="pointer shrink-0 text-xs text-x4 hover:text-x3 disabled:opacity-50"
                  disabled={isSaving}
                  onClick={async () => {
                    if (
                      await confirm(
                        translateEditorBase(EditorLocaleKey.VisitsReportRecipientRemoveConfirm, {
                          e: recipientEmail,
                        }),
                      )
                    )
                      removeRecipient(recipientEmail);
                  }}
                >
                  {translateBase(BaseLocaleKey.Delete)}
                </button>
              </div>
            ))}
            {objectLength(recipients) || (
              <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-x2/50 pt-2">
            <TextInput
              type="email"
              value={email}
              placeholder={translateBase(BaseLocaleKey.EmailLabel)}
              className="min-w-0 flex-1"
              onInput={setEmail}
              onKeyDown={event => {
                if (event.key === 'Enter') addRecipient();
              }}
            />
            <Dropdown
              className="h-9 rounded-md border border-ring bg-x1 px-2 text-sm text-x3"
              id={langi}
              onSelectId={setLangi}
              items={mapObjectEntries(langCodeDict, langi => {
                const langiId = extractNumber(langi);

                return { id: langiId, title: takeLangiTitle(langiId) };
              })}
            />
            <button
              className="pointer rounded-lg border border-x2/60 bg-x1/60 px-3 py-1 text-xs text-x4 hover:text-x3 disabled:opacity-50"
              disabled={isSaving || !email.trim()}
              onClick={addRecipient}
            >
              {translateBase(BaseLocaleKey.ToAdd)}
            </button>
          </div>
        </section>
      )}
    </>
  );
};

const fallbackOtherFooterIconNames = new Set<StameskaIconName>(['CircleArrowRight02']);

const OtherFooterIconsConfigurator = () => {
  const iconNames = useAtomValue(otherFooterIconNamesAtom);

  useEffect(() => {
    if (otherFooterIconNamesAtom.get().length) return;

    indexTsjrpcClientMethods
      .getOtherFooterIcons()
      .then(({ iconNames }) => otherFooterIconNamesAtom.set(iconNames))
      .catch(error => toast('' + error, makeToastKOMoodConfig()));
  }, []);

  const toggleIcon = async (icon: StameskaIconName) => {
    const nextIconNames = new Set(iconNames);

    if (nextIconNames.has(icon)) nextIconNames.delete(icon);
    else nextIconNames.add(icon);

    await indexTsjrpcClientMethods.updateOtherFooterIcons({ iconNames: [...nextIconNames] });
  };

  const rollIcon = async () => {
    const { icon } = await indexTsjrpcClientMethods.updateOtherFooterIcon({});

    otherFooterIconAtom.set(icon);
  };

  const otherFooterIconTitle = translateBase(BaseLocaleKey.OtherFooterIconTitle, {
    n: translateBase(BaseLocaleKey.Inoe),
  });

  return (
    <div className="flex items-center gap-2">
      <IconConfigurator
        disabledIconNames={fallbackOtherFooterIconNames}
        header={otherFooterIconTitle}
        trigger={
          <Button>
            <LazyIcon icon="CircleArrowRight02" />
            {otherFooterIconTitle}
          </Button>
        }
        selectedIconNames={new Set(iconNames)}
        onToggle={toggleIcon}
      />
      <Button
        icon="DiceFaces03"
        onClick={rollIcon}
      />
    </div>
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
  const versionRows = makeVersionRows([dashboard.versions]);
  const versionBars: VisitsBar[] = versionRows.map(row => ({
    label: row.version,
    count: row.count,
    info: `${row.version} — ${row.count}`,
  }));
  const minVersionBars: VisitsBar[] = dashboard.dayStats.flatMap(stat =>
    stat.minVersion === null
      ? []
      : [
          {
            label: stat.date.slice(5),
            count: stat.minVersion,
            info: `${stat.date} — v${stat.minVersion}`,
          },
        ],
  );
  const hourBars: VisitsBar[] = dashboard.hours.map((count, hour) => {
    const { from, to, ...labels } = makeHourBarLabels(hour);

    return {
      ...labels,
      count,
      info: translateEditorBase(EditorLocaleKey.VisitsHourPeriod, {
        f: from,
        t: to,
        c: count,
      }),
    };
  });
  const onlineHourBars: VisitsBar[] = Array.from({ length: hoursInDay }, (_, hour) => {
    const { from, to, ...labels } = makeHourBarLabels(hour);
    const maxCount = dashboard.onlineHours.max[hour] ?? noOnlineSample;
    const minCount = dashboard.onlineHours.min[hour] ?? noOnlineSample;
    const isSampled = maxCount >= 0;
    const minOnline = isSampled ? minCount : 0;
    const maxOnline = isSampled ? maxCount : 0;

    return {
      ...labels,
      count: maxOnline,
      minCount: minOnline,
      maxCount: maxOnline,
      info: translateEditorBase(EditorLocaleKey.VisitsOnlineHourPeriod, {
        f: from,
        t: to,
        n: minOnline,
        x: maxOnline,
      }),
    };
  });
  const historyBars: VisitsBar[] = historyBuckets.map(bucket => ({
    label: bucket.label,
    count: bucket.count,
    info: translateEditorBase(EditorLocaleKey.VisitsHistoryCount, { l: bucket.label, c: bucket.count }),
  }));
  const averageBars: VisitsBar[] = averageBuckets.map(bucket => ({
    label: bucket.label,
    count: bucket.count,
    info: translateEditorBase(EditorLocaleKey.VisitsAveragePeriod, { l: bucket.label, c: bucket.count.toFixed(1) }),
  }));

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
        <VisitsBarsChart
          bars={hourBars}
          slotWidth={hourSlotWidth}
        />
      </section>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <h2 className="mb-2 text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsOnlineByHour)}</h2>
        <VisitsBarsChart
          bars={onlineHourBars}
          slotWidth={hourSlotWidth}
        />
      </section>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <h2 className="mb-2 text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsVersions)}</h2>
        {versionBars.length === 0 ? (
          <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
        ) : (
          <VisitsBarsChart
            bars={versionBars}
            slotWidth={historySlotWidth}
          />
        )}
      </section>

      <section className="rounded-2xl border border-x2/60 bg-x1/50 p-2 sm:p-3">
        <h2 className="mb-2 text-sm font-medium text-x3">{translateEditorBase(EditorLocaleKey.VisitsMinVersions)}</h2>
        {minVersionBars.length === 0 ? (
          <div className="text-sm text-x4">{translateBase(BaseLocaleKey.EmptyList)}</div>
        ) : (
          <VisitsBarsChart
            bars={minVersionBars}
            slotWidth={historySlotWidth}
            labelStep={Math.max(1, Math.ceil(minVersionBars.length / 12))}
          />
        )}
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
          <VisitsBarsChart
            key={historyPeriod}
            bars={historyBars}
            slotWidth={historySlotWidth}
            labelStep={Math.max(1, Math.ceil(historyBars.length / 12))}
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
          <VisitsBarsChart
            key={`average-${averagePeriod}`}
            bars={averageBars}
            slotWidth={historySlotWidth}
            labelStep={Math.max(1, Math.ceil(averageBars.length / 12))}
          />
        )}
      </section>

      <DashboardMessages />

      <div className="flex flex-wrap items-center justify-end gap-2">
        <DashboardReportRecipients />
        <OtherFooterIconsConfigurator />
        <DashboardEmailReportButton />
      </div>
    </div>
  );
};

const DashboardBody = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['visitsDashboard'],
    queryFn: () => indexTsjrpcClientMethods.getVisitsDashboard_v1({}),
    refetchInterval: 15_000,
    staleTime: 0,
  });

  useEffect(() => {
    // A reconnect replaces the server-side watcher socket, so the dashboard re-subscribes immediately.
    return soki.listenOnConnectionOpenEvent(() => {
      void queryClient.invalidateQueries({ queryKey: ['visitsDashboard'] });
      void queryClient.invalidateQueries({ queryKey: ['visitsDashboardMessages'] });
    });
  }, [queryClient]);

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
