import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth, useIndexSchedules } from '../../../components/index/molecules';
import useConnectionState from '../../../components/index/useConnectionState';
import PhaseContainerConfigurer from '../../phase-container/PhaseContainerConfigurer';
import IconButton from '../../the-icon/IconButton';
import { IconCalendar03StrokeRounded } from '../../the-icon/icons/calendar-03';
import { schLinkAction } from '../links';
import ScheduleCreateWidgetButton from './CreateButton';
import ScheduleWidgetPage from './Page';

export default function ScheduleWidgetListPage() {
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
  const navigate = useNavigate();

  schLinkAction.useOnAction(({ props }) => {
    if (props.inviteSch && schedules.list.some(sch => sch.w === props.inviteSch)) {
      navigate('' + props.inviteSch);
    }
  });

  return (
    <PhaseContainerConfigurer
      className="ScheduleWidgetPage ScheduleWidgetListPage"
      headTitle="Мероприятия"
      head={<span className="flex flex-gap margin-gap">{connectionNode}</span>}
      content={
        <>
          {schedules.list.map(schedule => {
            if (!schedule.start) return null;
            return (
              <Link
                key={schedule.w}
                to={'' + schedule.w}
              >
                <IconButton
                  Icon={IconCalendar03StrokeRounded}
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
          {auth && auth.level > 29 && <ScheduleCreateWidgetButton appName="index" />}
        </>
      }
    />
  );
};
