import { translateBase } from '#basis/locale';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { useAuth, useUserInfoDict } from '$index/shared/state';
import { useMemo } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetTopicTitle } from '../complect/TopicTitle';
import { ScheduleWidgetDay, ScheduleWidgetDayProps } from '../days/Day';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';
import { schUsersTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

export function ScheduleAlarmDay(props: ScheduleWidgetDayProps) {
  const auth = useAuth();
  const { byLogin } = useUserInfoDict();
  const scheduleScopeProps = useMemo(() => ({ schw: props.schedule.w }), [props.schedule.w]);
  const myUserId = auth.login ? byLogin.get(auth.login)?.id : null;

  return (
    <ScheduleWidgetContextWrapper
      schedule={props.schedule}
      scheduleScopeProps={scheduleScopeProps}
    >
      <h3>
        <ScheduleWidgetTopicTitle
          titleBox={props.schedule}
          altTitle={translateBase(BaseLocaleKey.ScheduleEvent)}
          topicBox={props.schedule}
        />
      </h3>
      {auth.login && !props.schedule.ctrl.users.some(user => user.id === myUserId) && (
        <SendButton
          title={translateBase(BaseLocaleKey.ScheduleWantCommentEvents)}
          className="mt-10"
          onSend={() =>
            schUsersTsjrpcClient.addMe({
              props: scheduleScopeProps,
              place: translateBase(BaseLocaleKey.ScheduleByDayCommentButton),
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
