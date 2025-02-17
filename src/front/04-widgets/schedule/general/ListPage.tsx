import IconButton from '#shared/ui/the-icon/IconButton';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PhaseContainerConfigurer from '../../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { useAuth, useIndexSchedules } from '../../../components/index/atoms';
import useConnectionState from '../../../components/index/useConnectionState';
import { schLinkAction } from '../links';
import ScheduleCreateWidgetButton from './CreateButton';
import ScheduleWidgetPage from './Page';

export default function ScheduleWidgetListPage() {
  const schedules = useIndexSchedules();
  const navigate = useNavigate();

  schLinkAction.useOnAction(({ props }) => {
    if (props.inviteSch && schedules?.some(sch => sch.w === props.inviteSch)) {
      navigate('' + props.inviteSch);
    }
  });

  return (
    <Routes>
      <Route
        index
        element={<Component />}
      />

      <Route
        path=":schw/*"
        element={<ScheduleWidgetPage />}
      />
    </Routes>
  );
}

const Component = () => {
  const schedules = useIndexSchedules();
  const connectionNode = useConnectionState();
  const auth = useAuth();

  return (
    <PhaseContainerConfigurer
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
                to={'' + schedule.w}
              >
                <IconButton
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
