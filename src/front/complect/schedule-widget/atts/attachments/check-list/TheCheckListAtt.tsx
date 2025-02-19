import { SendableField } from '#shared/ui/sendable/SendableField';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { schDayEventsSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import { ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import { ScheduleChListAtt } from './checkListAtt';

type Props = {
  value: ScheduleChListAtt;
  isRedact: boolean;
  scheduleDayEventAttachmentScopeProps: ScheduleDayEventAttachmentScopeProps;
};

export const ScheduleCheckListAtt = ({ value, isRedact, scheduleDayEventAttachmentScopeProps }: Props) => {
  return (
    <>
      {value.list.map(([isDone, title, itemMi]) => {
        if (!isRedact && !title) return null;

        return (
          <div
            key={itemMi}
            className="flex flex-gap full-width margin-big-gap-b"
          >
            <TheIconSendButton
              className={'self-start relative z-index:15 color--3 ' + (isDone ? 'fade-05' : '')}
              icon={isDone ? 'CheckmarkSquare02' : 'Square'}
              onSend={() =>
                schDayEventsSokiInvocatorClient.updateCheckListAttachmentValue(
                  null,
                  scheduleDayEventAttachmentScopeProps,
                  itemMi,
                  isDone ? 0 : 1,
                  null,
                )
              }
            />
            <SendableField
              className="full-width"
              value={title}
              isRedact={isRedact}
              textClassName={'mood-for-2 relative z-index:5 color--3 ' + (isDone ? 'fade-05' : '')}
              onSend={async value =>
                schDayEventsSokiInvocatorClient.updateCheckListAttachmentValue(
                  null,
                  scheduleDayEventAttachmentScopeProps,
                  itemMi,
                  null,
                  value,
                )
              }
            />
          </div>
        );
      })}
      {isRedact && (
        <TheIconSendButton
          icon="PlusSign"
          prefix="Пункт"
          disabled={value.list.some(li => !li[1])}
          disabledReason="Есть пустые пункты"
          onSend={() =>
            schDayEventsSokiInvocatorClient.updateCheckListAttachmentValue(
              null,
              scheduleDayEventAttachmentScopeProps,
              null,
              0,
              '',
            )
          }
        />
      )}
    </>
  );
};
