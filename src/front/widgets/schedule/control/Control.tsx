import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { languageSystemCode, translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { DatePicker } from '#shared/components/DatePicker';
import { ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TextInput } from '#shared/ui/TextInput';
import { useMemo } from 'react';
import {
  IScheduleWidgetPeriod,
  ScheduleAppInform,
  SchedulePeriodKind,
  SchedulePeriodWeekday,
  ScheduleWidgetCleans,
  scheduleAppInformValues,
  takeSchedulePeriodNextStart,
} from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { howMillisecondsInHour, howMillisecondsInMin } from 'shared/const/ms';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ScheduleWidgetCustomAttachments } from '../atts/custom/CustomAttachments';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetEventTypeList } from '../events/EventTypeList';
import { ScheduleWidgetCopy } from '../general/Copy';
import { schDaysTsjrpcClient, schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRegisterType } from './RegisterType';
import { ScheduleWidgetUsersLink } from './users/UserList';

const appInformTitle = (value: ScheduleAppInform) =>
  value === 0
    ? translateBase(BaseLocaleKey.ScheduleInformDisabled)
    : value === 1
      ? translateBase(BaseLocaleKey.ScheduleInformOnlyByStart)
      : translateBase(BaseLocaleKey.ScheduleInformBefore, { n: value });

const schedulePeriodWeekis = [1, 2, 3, 4, 5] as const;
const schedulePeriodWeekdays = [0, 1, 2, 3, 4, 5, 6] as const;

const takeScheduleWeekdayTitle = (weekday: SchedulePeriodWeekday) =>
  new Date(2024, 0, 7 + weekday).toLocaleDateString(languageSystemCode, { weekday: 'long' });

const takeSchedulePeriodByKind = (kind: SchedulePeriodKind, date: Date): IScheduleWidgetPeriod => {
  if (kind === SchedulePeriodKind.MonthDay) return { kind, dayi: date.getDate() };

  if (kind === SchedulePeriodKind.WeekdayOfMonth)
    return {
      kind,
      weeki: schedulePeriodWeekis[Math.min(4, Math.ceil(date.getDate() / 7) - 1)],
      dayi: schedulePeriodWeekdays[date.getDay()],
    };

  return { kind: SchedulePeriodKind.Weekly };
};

export const ScheduleWidgetControlContent = () => {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const checkAccess = useCheckUserAccessRightsInScope();

  const schedule = rights.schedule;
  const startDate = useMemo(() => new Date(schedule.start || Date.now()), [schedule.start]);
  const todayStart = useMemo(() => new Date().setHours(0, 0, 0, 0), []);
  const nextStart = useMemo(() => takeSchedulePeriodNextStart(schedule), [schedule]);
  const nextStartAtWakeUp = useMemo(() => {
    if (nextStart == null) return null;

    const wakeUpMs = ScheduleWidgetCleans.computeDayWakeUpTime(
      (schedule.withTech ? schedule.days[1] : schedule.days[0])?.wup ?? 0,
      'number',
    );

    if (!wakeUpMs) return nextStart;

    const date = new Date(nextStart);
    date.setHours(
      Math.trunc(wakeUpMs / howMillisecondsInHour),
      Math.trunc((wakeUpMs % howMillisecondsInHour) / howMillisecondsInMin),
      0,
      0,
    );

    return date.getTime();
  }, [nextStart, schedule]);

  if (!rights.isCanRedact)
    return (
      <>
        <ModalHeader>{translateBase(BaseLocaleKey.ScheduleMembers)}</ModalHeader>
        <ScheduleWidgetUsersLink />
      </>
    );

  const period = schedule.period;
  const isPeriodic = period != null && period.kind !== SchedulePeriodKind.Once;
  const monthDayPeriod = period?.kind === SchedulePeriodKind.MonthDay ? period : null;
  const weekdayPeriod = period?.kind === SchedulePeriodKind.WeekdayOfMonth ? period : null;
  const monthDayi = monthDayPeriod?.dayi ?? startDate.getDate();
  const weekdayWeeki =
    weekdayPeriod?.weeki ?? schedulePeriodWeekis[Math.min(4, Math.ceil(startDate.getDate() / 7) - 1)];
  const weekdayDayi = weekdayPeriod?.dayi ?? schedulePeriodWeekdays[startDate.getDay()];
  const pauseActionKey = schedule.isPaused ? BaseLocaleKey.ScheduleEnable : BaseLocaleKey.ScheduleDisable;

  return (
    <>
      <ModalHeader>
        {translateBase(BaseLocaleKey.Control)} <span className="text-x7">{rights.schedule.title}</span>
      </ModalHeader>

      <div>
        {isPeriodic ? (
          !nextStartAtWakeUp || (
            <div className="flex items-center gap-2 my-2">
              <LazyIcon icon="Calendar03" />
              <span>{translateBase(BaseLocaleKey.ScheduleNearest)}:</span>
              <span className="font-bold">{makeDateLabel(nextStartAtWakeUp, languageSystemCode)}</span>
            </div>
          )
        ) : (
          <div className="flex items-center gap-2 my-2">
            <LazyIcon icon="Calendar03" />
            <span>{translateBase(BaseLocaleKey.ScheduleStart)}</span>
            <DatePicker
              initValue={schedule.start || null}
              disabled={[date => date.getTime() < todayStart]}
              onSelect={date => {
                if (!date) return null;

                if (schedule.start) {
                  const prevStart = new Date(schedule.start);
                  date.setHours(
                    prevStart.getHours(),
                    prevStart.getMinutes(),
                    prevStart.getSeconds(),
                    prevStart.getMilliseconds(),
                  );
                }

                return schGeneralTsjrpcClient.setStartTime({ props: scheduleScopeProps, value: date.getTime() });
              }}
            />
          </div>
        )}
        <Dropdown
          id={period?.kind ?? null}
          items={[
            {
              id: SchedulePeriodKind.Weekly,
              title: translateBase(BaseLocaleKey.SchedulePeriodEachWeekday, {
                d: takeScheduleWeekdayTitle(schedulePeriodWeekdays[startDate.getDay()]),
              }),
            },
            {
              id: SchedulePeriodKind.MonthDay,
              title: translateBase(BaseLocaleKey.SchedulePeriodMonthDay, { d: monthDayi }),
            },
            {
              id: SchedulePeriodKind.WeekdayOfMonth,
              title: translateBase(BaseLocaleKey.SchedulePeriodWeekdayOfMonth, {
                n: weekdayWeeki,
                d: takeScheduleWeekdayTitle(weekdayDayi),
              }),
            },
          ]}
          nullTitle={translateBase(BaseLocaleKey.ScheduleInformDisabled)}
          label={translateBase(BaseLocaleKey.SchedulePeriodicity)}
          onSelectId={kind =>
            schGeneralTsjrpcClient.setSchedulePeriod({
              props: scheduleScopeProps,
              period: kind == null ? null : takeSchedulePeriodByKind(kind, startDate),
            })
          }
        />
        {!monthDayPeriod || (
          <TextInput
            type="number"
            min={1}
            max={31}
            defaultValue={`${monthDayPeriod.dayi}`}
            className="my-2 w-20"
            onChanged={value => {
              const dayi = Math.trunc(+value);
              if (dayi < 1 || dayi > 31) return;

              return schGeneralTsjrpcClient.setSchedulePeriod({
                props: scheduleScopeProps,
                period: { kind: SchedulePeriodKind.MonthDay, dayi },
              });
            }}
          />
        )}
        {!weekdayPeriod || (
          <div className="flex gap-2 my-2">
            <Dropdown
              id={weekdayPeriod.weeki}
              items={schedulePeriodWeekis.map(weeki => ({ id: weeki, title: `${weeki}` }))}
              onSelectId={weeki =>
                schGeneralTsjrpcClient.setSchedulePeriod({
                  props: scheduleScopeProps,
                  period: { ...weekdayPeriod, weeki },
                })
              }
            />
            <Dropdown
              id={weekdayPeriod.dayi}
              items={schedulePeriodWeekdays.map(dayi => ({ id: dayi, title: takeScheduleWeekdayTitle(dayi) }))}
              onSelectId={dayi =>
                schGeneralTsjrpcClient.setSchedulePeriod({
                  props: scheduleScopeProps,
                  period: { ...weekdayPeriod, dayi },
                })
              }
            />
          </div>
        )}
        <StrongEditableField
          fieldKey="title"
          value={schedule}
          isRedact
          icon="SchoolReportCard"
          title={translateBase(BaseLocaleKey.ScheduleHeader)}
          onSend={value => schGeneralTsjrpcClient.rename({ props: scheduleScopeProps, value })}
        />
        <StrongEditableField
          fieldKey="topic"
          value={schedule}
          isRedact
          icon="Bookmark03"
          title={translateBase(BaseLocaleKey.ScheduleTopic)}
          onSend={value => schGeneralTsjrpcClient.setTopic({ props: scheduleScopeProps, value })}
        />
        <StrongEditableField
          fieldKey="dsc"
          value={schedule}
          isRedact
          multiline
          textClassName=" "
          icon="File02"
          title={translateBase(BaseLocaleKey.Description)}
          onSend={value => schGeneralTsjrpcClient.setDescription({ props: scheduleScopeProps, value })}
        />
        <ScheduleWidgetEventTypeList
          postfix={
            <>
              {translateBase(BaseLocaleKey.ScheduleEventTemplates)} <LazyIcon icon="ArrowRight01" />
            </>
          }
          icon="Shapes"
          schedule={schedule}
        />
        <ScheduleWidgetCustomAttachments tatts={schedule.tatts} />
        {!schedule.days.length && !schedule.tatts.length && !schedule.types.length && (
          <ScheduleWidgetCopy schw={schedule.w} />
        )}
        {!schedule.start || !rights.isCanAddDays || (
          <TheIconSendButton
            icon="PlusSign"
            postfix={translateBase(BaseLocaleKey.ScheduleAddDay)}
            confirm={translateBase(BaseLocaleKey.ScheduleAddDayConfirm)}
            className="my-2"
            onSend={() => schDaysTsjrpcClient.addDay({ props: scheduleScopeProps })}
          />
        )}
      </div>

      <div>
        <ScheduleWidgetUsersLink />
        <ScheduleWidgetRegisterType />
        {rights.isCanTotalRedact && (
          <>
            <TheIconSendButton
              icon={schedule.isPaused ? 'Play' : 'Pause'}
              postfix={translateBase(pauseActionKey)}
              confirm={translateBase(pauseActionKey)}
              className="mb-2"
              onSend={() =>
                schGeneralTsjrpcClient.setPaused({
                  props: scheduleScopeProps,
                  value: schedule.isPaused ? undefined : 1,
                })
              }
            />
            <TheIconSendButton
              icon={rights.schedule.withTech ? 'CheckmarkSquare02' : 'Square'}
              postfix={translateBase(BaseLocaleKey.ScheduleFirstIsTechDay)}
              confirm={
                rights.schedule.withTech
                  ? translateBase(BaseLocaleKey.ScheduleMakeFirstDayUsual)
                  : translateBase(BaseLocaleKey.ScheduleFirstDayPrep)
              }
              className="mb-2"
              onSend={() =>
                schGeneralTsjrpcClient.setFirstDayAsTech({
                  props: scheduleScopeProps,
                  value: rights.schedule.withTech ? undefined : 1,
                })
              }
            />
            <Dropdown
              id={schedule.appInform ?? 1}
              items={scheduleAppInformValues.map(value => ({ id: value, title: appInformTitle(value) }))}
              onSelectId={value => schGeneralTsjrpcClient.setAppInform({ props: scheduleScopeProps, value })}
              triggerNode={isLoading => (
                <TheIconButton
                  className="pointer mb-2"
                  icon={schedule.appInform === 0 ? 'NotificationOff01' : 'Notification01'}
                  isLoading={isLoading}
                  postfix={
                    <>
                      {appInformTitle(schedule.appInform ?? 1)}
                      <LazyIcon icon="ArrowDown01" />
                    </>
                  }
                />
              )}
            />
          </>
        )}
      </div>

      {checkAccess('sch', 'SCH', 'D') && (
        <TheIconSendButton
          className="text-xKO"
          icon="Delete02"
          confirm={translateBase(BaseLocaleKey.ScheduleRemoveConfirm)}
          postfix={translateBase(BaseLocaleKey.ScheduleRemove)}
          onSend={() => schGeneralTsjrpcClient.remove({ props: scheduleScopeProps })}
        />
      )}
    </>
  );
};
