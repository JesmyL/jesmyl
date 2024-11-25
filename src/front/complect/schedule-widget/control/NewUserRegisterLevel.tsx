import { scheduleWidgetUserRights } from 'shared/api';
import { IconArrowRight01StrokeRounded } from '../../../complect/the-icon/icons/arrow-right-01';
import useModal from '../../modal/useModal';
import { StrongComponentProps } from '../../strong-control/Strong.model';
import IconButton from '../../the-icon/IconButton';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetRightControlList from './RightControlList';

export default function ScheduleWidgetNewUserRegisterLevel({ scope }: StrongComponentProps) {
  const rights = useScheduleWidgetRightsContext();

  const [newUserRightsNode, openNewUserRights] = useModal(({ body }) => {
    return (
      <>
        {body(
          <ScheduleWidgetRightControlList
            scope={scope}
            fieldName="defu"
            rightCtrl={scheduleWidgetUserRights}
            R={rights.schedule.ctrl.defu}
          />,
        )}
      </>
    );
  });

  return (
    <>
      {newUserRightsNode}
      <IconButton
        Icon={IconArrowRight01StrokeRounded}
        className="margin-big-gap-v margin-gap-l"
        prefix="Права по умолчанию"
        onClick={openNewUserRights}
      />
    </>
  );
}
