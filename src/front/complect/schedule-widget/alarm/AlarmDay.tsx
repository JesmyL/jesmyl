import StrongButton from 'front/complect/strong-control/StrongButton';
import { useAuth } from 'front/components/index/molecules';
import ScheduleWidgetTopicTitle from '../complect/TopicTitle';
import { ScheduleWidgetDay, ScheduleWidgetDayProps } from '../days/Day';
import ScheduleWidgetContextWrapper from '../general/ContextWrapper';
import { takeScheduleStrongScopeMaker } from '../useScheduleWidget';

export default function ScheduleAlarmDay(props: OmitOwn<ScheduleWidgetDayProps, 'scope'>) {
  const scope = takeScheduleStrongScopeMaker(props.schedule.w);
  const auth = useAuth();

  return (
    <ScheduleWidgetContextWrapper schedule={props.schedule}>
      <h3>
        <ScheduleWidgetTopicTitle
          titleBox={props.schedule}
          altTitle="Мероприятие"
          topicBox={props.schedule}
        />
      </h3>
      {auth.login && !props.schedule.ctrl.users.some(user => user.login === auth.login) && (
        <StrongButton
          scope={takeScheduleStrongScopeMaker(props.schedule.w)}
          fieldName="addMeByLink"
          title="Хочу комментить события"
          className="margin-giant-gap-t"
        />
      )}
      <ScheduleWidgetDay
        day={props.day}
        dayi={props.dayi}
        schedule={props.schedule}
        scope={scope}
        isForceOpen={props.isForceOpen}
      />
    </ScheduleWidgetContextWrapper>
  );
}
