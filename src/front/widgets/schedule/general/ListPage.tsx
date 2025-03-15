import { useAppNameContext } from '#basis/lib/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
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
          {schedules?.map(schedule => {
            if (!schedule.start) return null;
            return (
              <Link
                key={schedule.w}
                to="/!other/$appName/schs"
                params={{ appName }}
                search={{ schw: schedule.w }}
              >
                <TheIconButton
                  icon="Calendar03"
                  className="margin-gap-v"
                  postfix={
                    <>
                      {schedule.title}
                      {schedule.topic ? `: ${schedule.topic}` : ''}
                    </>
                  }
                />
              </Link>
            );
          })}
          {auth && auth.level > 29 && <ScheduleCreateWidgetButton />}
        </>
      }
    />
  );
};
