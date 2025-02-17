import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import StrongEditableField from '../../../../../complect/strong-control/field/StrongEditableField';
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
