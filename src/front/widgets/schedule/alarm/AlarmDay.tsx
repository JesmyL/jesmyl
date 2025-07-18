import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { useAuth } from '$index/atoms';
import { useMemo } from 'react';
import { ScheduleWidgetTopicTitle } from '../complect/TopicTitle';
import { ScheduleWidgetDay, ScheduleWidgetDayProps } from '../days/Day';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';
import { schUsersSokiInvocatorClient } from '../invocators/invocators.methods';

export function ScheduleAlarmDay(props: ScheduleWidgetDayProps) {
  const auth = useAuth();
  const scheduleScopeProps = useMemo(() => ({ schw: props.schedule.w }), [props.schedule.w]);

  return (
    <ScheduleWidgetContextWrapper
      schedule={props.schedule}
      scheduleScopeProps={scheduleScopeProps}
    >
      <h3>
        <ScheduleWidgetTopicTitle
          titleBox={props.schedule}
          altTitle="Мероприятие"
          topicBox={props.schedule}
        />
      </h3>
      {auth.login && !props.schedule.ctrl.users.some(user => user.login === auth.login) && (
        <SendButton
          title="Хочу комментить события"
          className="margin-giant-gap-t"
          onSend={() =>
            schUsersSokiInvocatorClient.addMe({
              props: scheduleScopeProps,
              place: 'по кнопке "Хочу комментить события" в отдельном дне',
            })
          }
        />
      )}
      <ScheduleWidgetDay
        day={props.day}
        dayi={props.dayi}
        schedule={props.schedule}
        scheduleScopeProps={scheduleScopeProps}
        isForceOpen={props.isForceOpen}
      />
    </ScheduleWidgetContextWrapper>
  );
}
