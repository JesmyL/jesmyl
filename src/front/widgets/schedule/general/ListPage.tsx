import { useAppNameContext } from '#basis/lib/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth, useIndexSchedules } from 'front/components/index/atoms';
import { useConnectionState } from 'front/components/index/useConnectionState';
import { schLinkAction } from '../links';
import { ScheduleCreateWidgetButton } from './CreateButton';

export const ScheduleWidgetListPage = () => {
  const schedules = useIndexSchedules();
  const connectionNode = useConnectionState();
  const auth = useAuth();
  const navigate = useNavigate();
  const appName = useAppNameContext();

  schLinkAction.useOnAction(({ props }) => {
    if (props.inviteSch && schedules?.some(sch => sch.w === props.inviteSch)) {
      navigate({
        to: '/!other/$appName/schs',
        params: { appName },
        search: { schw: props.inviteSch },
      });
    }
  });

  return (
    <PageContainerConfigurer
      className="ScheduleWidgetPage ScheduleWidgetListPage"
      headTitle="Мероприятия"
      head={<span className="flex flex-gap margin-gap">{connectionNode}</span>}
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
          {auth && auth.level > 29 && <ScheduleCreateWidgetButton />}
        </>
      }
    />
  );
};
