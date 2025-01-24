import SendButton from 'front/complect/sends/send-button/SendButton';
import { Route, Routes } from 'react-router-dom';
import { useAuth, useIndexSchedules } from '../../../components/index/atoms';
import useConnectionState from '../../../components/index/useConnectionState';
import PhaseContainerConfigurer from '../../phase-container/PhaseContainerConfigurer';
import ScheduleWidget from '../ScheduleWidget';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schUsersSokiInvocatorClient } from '../invocators/invocators.methods';
import { useCschw, useFixActualSchw } from '../useSch';
import { ScheduleWidgetAttRoutes } from './AttRoutes';

export default function ScheduleWidgetPage() {
  const schedules = useIndexSchedules();
  const schw = useCschw();
  const schedule = schedules?.find(({ w }) => w === schw);
  const connectionNode = useConnectionState();
  const auth = useAuth();
  const scheduleScopeProps = useScheduleScopePropsContext();

  useFixActualSchw(schw);

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="ScheduleWidgetPage"
            headTitle={schedule?.title ?? 'Мероприятие'}
            head={<span className="flex flex-gap margin-gap">{connectionNode}</span>}
            content={
              schedule ? (
                schedule.start === 0 ? (
                  schedule.ctrl.users.some(user => user.login === auth.login) ? (
                    <>Заявка отправлена</>
                  ) : (
                    <SendButton
                      title="Буду участвовать"
                      onSend={() => schUsersSokiInvocatorClient.addMe(null, scheduleScopeProps, 'по ссылке')}
                    />
                  )
                ) : (
                  <ScheduleWidget schedule={schedule} />
                )
              ) : (
                <div className="flex center color--ko">Мероприятие не найдено</div>
              )
            }
          />
        }
      />

      <Route
        path="*"
        element={<ScheduleWidgetAttRoutes />}
      />
    </Routes>
  );
}
