import { useAppNameContext } from '#basis/lib/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useIndexSchedules } from '$index/atoms';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { useConnectionState } from '$index/useConnectionState';
import { Link, useNavigate } from '@tanstack/react-router';
import { schLinkAction } from '../links';
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
        search: { schw: props.inviteSch },
      });

      return true;
    }

    return false;
  });

  return (
    <PageContainerConfigurer
      className="ScheduleWidgetPage ScheduleWidgetListPage"
      headTitle="Мероприятия"
      head={<span className="flex gap-2 m-2">{connectionNode}</span>}
      content={
        <>
          {schedules
            ?.sort((a, b) => b.start - a.start)
            .map(schedule => {
              if (!schedule.start) return null;

              return (
                <Link
                  key={schedule.w}
                  to="/!other/$appName/schs"
                  params={{ appName }}
                  search={{ schw: schedule.w }}
                  className="pointer grid grid-rows-2 grid-cols-13 gap-x-1 py-2 border-[#aaa7]! border-b-[.5px]!"
                >
                  <div className="row-span-2 flex center">
                    <LazyIcon icon="Calendar03" />
                  </div>

                  <div className="col-span-12 font-bold">
                    {schedule.title}
                    {schedule.topic ? `: ${schedule.topic}` : ''}
                  </div>

                  <div className="col-span-12 text-xs">
                    {new Date(schedule.start).toLocaleDateString('ru', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </Link>
              );
            })}
          {checkAccess('sch', 'SCH', 'C') && <ScheduleCreateWidgetButton />}
        </>
      }
    />
  );
};
