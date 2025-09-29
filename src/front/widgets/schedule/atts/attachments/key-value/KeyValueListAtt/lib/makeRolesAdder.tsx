import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleWidgetRoleFace } from '#widgets/schedule/control/roles/RoleFace';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights } from '#widgets/schedule/useScheduleWidget';
import { IScheduleWidgetRole, ScheduleDayEventAttachmentScopeProps } from 'shared/api';

export const scheduleWidgetKeyValueListAttMakeRolesAdder = (
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
  exclusiveRoles: IScheduleWidgetRole[],
  rights: ScheduleWidgetRights,
) => {
  return exclusiveRoles.map(role => (
    <div
      key={role.mi}
      className="flex gap-2 my-2"
    >
      <ScheduleWidgetRoleFace
        role={role}
        schedule={rights.schedule}
      />
      <TheIconSendButton
        icon="PlusSign"
        onSend={() =>
          schDayEventsTsjrpcClient.putKeyValueAttachment({
            props: dayEventAttScopeProps,
            key: role.mi,
            value: '+',
          })
        }
      />
    </div>
  ));
};
