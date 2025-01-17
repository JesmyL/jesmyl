import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { ScheduleDayEventAttImagineScopeProps } from 'shared/api';
import { IconCheckmarkSquare02StrokeRounded } from '../../../../../complect/the-icon/icons/checkmark-square-02';
import { IconPlusSignStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign';
import { IconSquareStrokeRounded } from '../../../../../complect/the-icon/icons/square';
import StrongEditableField from '../../../../strong-control/field/StrongEditableField';
import { ScheduleChListAtt } from './checkListAtt';

export default function ScheduleCheckListAtt({
  value,
  scope,
  isRedact,
}: {
  value: ScheduleChListAtt;
  scope: ScheduleDayEventAttImagineScopeProps;
  isRedact: boolean;
}) {
  // const attScope = scope + ' checkList';

  return (
    <>
      {value.list.map(([isDone, title], itemMi) => {
        if (!isRedact && !title) return null;
        // const itemScope = takeStrongScopeMaker(attScope, ' itemMi/', itemMi);
        return (
          <div
            key={itemMi}
            className="flex flex-gap full-width margin-big-gap-b"
          >
            <EvaSendButton
              // scope={itemScope}
              // fieldName="check"
              // fieldValue={isDone ? 0 : 1}
              className={'self-start relative z-index:15 color--3 ' + (isDone ? 'fade-05' : '')}
              // cud="U"
              // isCanSend={!!scope}
              Icon={isDone ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
              onSend={async () => {}}
            />
            <StrongEditableField
              // scope={itemScope}
              // fieldName="title"
              className="full-width"
              value={title}
              isRedact={isRedact}
              textClassName={'mood-for-2 relative z-index:5 color--3 ' + (isDone ? 'fade-05' : '')}
              onSend={async () => {}}
            />
          </div>
        );
      })}
      {isRedact && !value.list.some(li => !li[1]) && (
        <EvaSendButton
          // scope={attScope}
          // fieldName=""
          Icon={IconPlusSignStrokeRounded}
          prefix="Пункт"
          onSend={async () => {}}
        />
      )}
    </>
  );
}
