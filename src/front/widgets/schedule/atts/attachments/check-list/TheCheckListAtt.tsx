import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleChListAtt } from './checkListAtt';

export function ScheduleCheckListAtt({
  value,
  isRedact,
  scheduleDayEventAttachmentScopeProps,
}: {
  value: ScheduleChListAtt;
  isRedact: boolean;
  scheduleDayEventAttachmentScopeProps: ScheduleDayEventAttachmentScopeProps;
}) {
  return (
    <>
      {value.list.map(([isDone, title, itemMi]) => {
        if (!isRedact && !title) return null;

        return (
          <div
            key={itemMi}
            className="flex gap-2 w-full mb-5"
          >
            <TheIconSendButton
              className={'self-start relative z-15 text-x3 ' + (isDone ? 'opacity-50' : '')}
              icon={isDone ? 'CheckmarkSquare02' : 'Square'}
              onSend={() =>
                schDayEventsTsjrpcClient.updateCheckListAttachmentValue({
                  props: scheduleDayEventAttachmentScopeProps,
                  itemMi,
                  key: isDone ? 0 : 1,
                  value: null,
                })
              }
            />
            <StrongEditableField
              className="w-full"
              value={title}
              isRedact={isRedact}
              textClassName={'mood-for-2 relative z-5 text-x3 ' + (isDone ? 'opacity-50' : '')}
              onSend={async value =>
                schDayEventsTsjrpcClient.updateCheckListAttachmentValue({
                  props: scheduleDayEventAttachmentScopeProps,
                  itemMi,
                  key: null,
                  value,
                })
              }
            />
          </div>
        );
      })}
      {isRedact && (
        <TheIconSendButton
          icon="PlusSign"
          prefix={translateBase(BaseLocaleKey.SchedulePoint)}
          disabled={value.list.some(li => !li[1])}
          disabledReason={translateBase(BaseLocaleKey.ScheduleHasEmptyPoints)}
          onSend={() =>
            schDayEventsTsjrpcClient.updateCheckListAttachmentValue({
              props: scheduleDayEventAttachmentScopeProps,
              itemMi: null,
              key: 0,
              value: '',
            })
          }
        />
      )}
    </>
  );
}
