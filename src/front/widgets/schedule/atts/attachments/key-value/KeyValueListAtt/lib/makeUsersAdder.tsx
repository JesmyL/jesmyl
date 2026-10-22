import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights, takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import {
  customAttUseRights,
  CustomAttUseRights,
  CustomAttUseTaleId,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomized,
} from 'shared/api';

export const scheduleWidgetKeyValueListAttMakeUsersAdder = (
  att: ScheduleWidgetAppAttCustomized,
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
  rights: ScheduleWidgetRights,
  exclusiveUsers: IScheduleWidgetUser[],
) => {
  return exclusiveUsers.map(user =>
    customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckUsers) ? (
      <div
        key={user.mi}
        className="flex gap-2"
      >
        <LazyIcon icon="CheckmarkSquare02" />
        {takeScheduleWidgetUserName(rights, user)}
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: false,
              value: user.mi + CustomAttUseTaleId.Users,
            })
          }
        />
      </div>
    ) : (
      <div
        key={user.mi}
        className="flex gap-2"
      >
        {takeScheduleWidgetUserName(rights, user)}
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: user.mi + CustomAttUseTaleId.Users,
              value: '+',
            })
          }
        />
      </div>
    ),
  );
};
