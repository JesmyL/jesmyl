import {
  IScheduleWidgetUser,
  packScheduleWidgetInviteLink,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { makeAppActionLink } from '../../../../app/AppServiceActions';
import { IconUserStrokeRounded } from '../../../../complect/the-icon/icons/user';
import { StrongComponentProps } from '../../../strong-control/Strong.model';
import StrongEditableField from '../../../strong-control/field/StrongEditableField';
import { takeStrongScopeMaker, useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetRightControlList from '../RightControlList';

const accessLevel = scheduleWidgetUserRights.rightLevel(ScheduleWidgetUserRoleRight.ReadTitles);

export function ScheduleWidgetUserEdit({
  scope,
  user,
  onUpdate,
}: StrongComponentProps & {
  user: IScheduleWidgetUser;
  onUpdate?: <User extends IScheduleWidgetUser, Key extends keyof User>(key: Key, value: User[Key]) => void;
}) {
  const rights = useScheduleWidgetRightsContext();
  const userScope = takeStrongScopeMaker(scope, ' userMi/', user.mi);

  return (
    <>
      <StrongEditableField
        scope={userScope}
        fieldName="fio"
        isRedact
        setSelfRedact
        title="Имя"
        Icon={IconUserStrokeRounded}
        value={user.fio || user.nick}
        onUpdate={onUpdate && (value => onUpdate('fio', value))}
      />
      {rights.myUser && (
        <ScheduleWidgetRightControlList
          scope={userScope}
          fieldName="R"
          rightCtrl={scheduleWidgetUserRights}
          R={user.R}
          isHidden={
            rights.isCanTotalRedact ? undefined : type => accessLevel < scheduleWidgetUserRights.rightLevel(type.id)
          }
          isCantEdit={
            !rights.isCanRedactUsers ||
            rights.myUser.mi === user.mi ||
            (!rights.isCanTotalRedact &&
              scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.TotalRedact))
          }
          onUpdate={onUpdate && (value => onUpdate('R', value))}
        />
      )}
      {!user.login && (
        <div className="user-select margin-giant-gap-t">
          {makeAppActionLink('index', 'swInvite', packScheduleWidgetInviteLink(rights.schedule.w, user.mi))}
        </div>
      )}
    </>
  );
}
