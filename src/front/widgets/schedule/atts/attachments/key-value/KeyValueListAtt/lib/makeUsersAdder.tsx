import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
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
  exclusiveUsers: IScheduleWidgetUser[],
) => {
  return exclusiveUsers.map(user =>
    customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckUsers) ? (
      <div
        key={user.mi}
        className="flex gap-2"
      >
        <LazyIcon icon="CheckmarkSquare02" />
        {user.fio || user.nick}
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
        {user.fio || user.nick}
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
