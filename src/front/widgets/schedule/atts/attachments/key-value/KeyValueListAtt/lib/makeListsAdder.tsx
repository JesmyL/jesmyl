import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleWidgetListUnitFace } from '#widgets/schedule/lists/UnitFace';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { CustomAttUseTaleId, IScheduleWidgetListUnit, ScheduleDayEventAttachmentScopeProps } from 'shared/api';

export const scheduleWidgetKeyValueListAttMakeListsAdder = (
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
  exclusiveLists: IScheduleWidgetListUnit[],
) => {
  return exclusiveLists.map(unit => (
    <ScheduleWidgetListUnitFace
      key={unit.mi}
      unit={unit}
      postfix={
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: unit.mi + CustomAttUseTaleId.Lists,
              value: '+',
            })
          }
        />
      }
    />
  ));
};
