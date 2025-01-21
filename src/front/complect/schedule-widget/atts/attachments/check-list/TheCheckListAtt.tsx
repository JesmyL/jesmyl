import { schDayEventsSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { ScheduleDayEventAttachmentScopeProps } from 'shared/api';
import { IconCheckmarkSquare02StrokeRounded } from '../../../../../complect/the-icon/icons/checkmark-square-02';
import { IconPlusSignStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign';
import { IconSquareStrokeRounded } from '../../../../../complect/the-icon/icons/square';
import StrongEditableField from '../../../../strong-control/field/StrongEditableField';
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
            <EvaSendButton
              className={'self-start relative z-index:15 color--3 ' + (isDone ? 'fade-05' : '')}
              Icon={isDone ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
              onSend={async () =>
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
        <EvaSendButton
          Icon={IconPlusSignStrokeRounded}
          prefix="Пункт"
          disabled={value.list.some(li => !li[1])}
          disabledReason="Есть пустые пункты"
          onSend={async () =>
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
