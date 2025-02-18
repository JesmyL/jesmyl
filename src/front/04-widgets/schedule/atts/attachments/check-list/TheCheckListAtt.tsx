import { schDayEventsSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import StrongEditableField from '#widgets/schedule/strong-control/field/StrongEditableField';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import { ScheduleChListAtt } from './checkListAtt';

export default function ScheduleCheckListAtt({
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
            <StrongEditableField
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
}
