import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { schLinkAction } from '../../../07-basis/lib/consts/schedule/link-actions';
import useConnectionState from '../../../07-basis/lib/hooks/+app/useConnectionState';
import { useAuth, useIndexSchedules } from '../../../components/index/atoms';
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
