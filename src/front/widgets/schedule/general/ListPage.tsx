import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { useConnectionState } from '#basis/lib/useConnectionState';
import { languageSystemCode, translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useIndexSchedules } from '$index/shared/state';
import { Link, useNavigate } from '@tanstack/react-router';
import { IScheduleWidget, takeScheduleNearestStartMs } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { schLinkAction } from '../links';
import { makeScheduleTimeLeftLabel } from '../makeScheduleTimeLeftLabel';
import { ScheduleCreateWidgetButton } from './CreateButton';

export const ScheduleWidgetListPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();

  const schedules = useIndexSchedules();
  const connectionNode = useConnectionState();
  const navigate = useNavigate();
  const appName = useAppNameContext();

  schLinkAction.useOnAction(({ props }) => {
    if (props.inviteSch) {
      navigate({
        to: '/!other/$appName/schs',
        params: { appName },
        search: { schw: props.inviteSch, ...(props.inviteHash ? { inviteHash: props.inviteHash } : null) },
      });

      return true;
    }

    return false;
  });

  const now = Date.now();
  const takeNearestStart = (schedule: IScheduleWidget) => takeScheduleNearestStartMs(schedule, now);
  const futureSchedules = schedules
    ?.filter(schedule => !schedule.isPaused && schedule.start && takeNearestStart(schedule) >= now)
    .sort((a, b) => takeNearestStart(a) - takeNearestStart(b));
  const pastSchedules = schedules
    ?.filter(schedule => !schedule.isPaused && schedule.start && takeNearestStart(schedule) < now)
    .sort((a, b) => b.start - a.start);
  const pausedSchedules = schedules?.filter(schedule => schedule.isPaused);

  const makeScheduleNodes = (list?: IScheduleWidget[], icon: KnownStameskaIconName = 'Calendar03') =>
    list?.map(schedule => {
      const start = takeNearestStart(schedule);
      const dateLabel = makeDateLabel(start, languageSystemCode);
      const timeLeftLabel = start > now ? makeScheduleTimeLeftLabel(start, now, languageSystemCode) : null;

      return (
        <Link
          key={schedule.w}
          to="/!other/$appName/schs"
          params={{ appName }}
          search={{ schw: schedule.w }}
          className="pointer grid grid-rows-2 grid-cols-13 gap-x-1 py-2 border-[#aaa7]! border-b-[.5px]!"
        >
          <div className="row-span-2 flex center">
            <LazyIcon icon={icon} />
          </div>

          <div className="col-span-12 font-bold">
            {schedule.title}
            {schedule.topic ? `: ${schedule.topic}` : ''}
          </div>

          <div className="col-span-12 text-xs">
            {timeLeftLabel !== dateLabel && dateLabel}
            {!timeLeftLabel || <div>{timeLeftLabel}</div>}
          </div>
        </Link>
      );
    });

  return (
    <PageContainerConfigurer
      className="ScheduleWidgetPage ScheduleWidgetListPage"
      headTitle={translateBase(BaseLocaleKey.ScheduleEventPlural)}
      head={<span className="flex gap-2 m-2">{connectionNode}</span>}
      content={
        <>
          {makeScheduleNodes(futureSchedules)}
          {!pastSchedules?.length || (
            <>
              <hr />
              <div className="text-xs text-x3 italic mt-2">{translateBase(BaseLocaleKey.SchedulePassedPlural)}</div>
              {makeScheduleNodes(pastSchedules)}
            </>
          )}
          {checkAccess('sch', 'SCH', 'C') && <ScheduleCreateWidgetButton />}
          {!pausedSchedules?.length || (
            <>
              <hr />
              <div className="text-xs text-x3 italic mt-2">{translateBase(BaseLocaleKey.SchedulePausedPlural)}</div>
              <div className="text-x3">{makeScheduleNodes(pausedSchedules, 'Pause')}</div>
            </>
          )}
        </>
      }
    />
  );
};
