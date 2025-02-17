import StrongEditableField from '#widgets/schedule/strong-control/field/StrongEditableField';
import {
  IScheduleWidgetUser,
  IScheduleWidgetWid,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { useScheduleUserScopePropsContext } from '../../complect/scope-contexts/scope-props-contexts';
import { schUsersSokiInvocatorClient } from '../../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetRightControlList from '../RightControlList';

const accessLevel = scheduleWidgetUserRights.rightLevel(ScheduleWidgetUserRoleRight.ReadTitles);

export function ScheduleWidgetUserEdit({ user }: { user: IScheduleWidgetUser }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleUserScopeProps = useScheduleUserScopePropsContext();

  if (scheduleUserScopeProps.schw === IScheduleWidgetWid.def) return <div className="color--ko">Не в контексте</div>;

  return (
    <>
      <StrongEditableField
        isRedact
        setSelfRedact
        title="Имя"
        icon="User"
        value={user.fio || user.nick}
        onSend={value => schUsersSokiInvocatorClient.setUserFio(null, scheduleUserScopeProps, value)}
      />
      {rights.myUser && (
        <ScheduleWidgetRightControlList
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
          onSend={value => schUsersSokiInvocatorClient.setUserRights(null, scheduleUserScopeProps, value)}
        />
      )}
      {!user.login && (
        <div className="user-select margin-giant-gap-t">
          {/* {makeAppActionLink('index', 'swInvite', packScheduleWidgetInviteLink(rights.schedule.w, user.mi))} */}
        </div>
      )}
    </>
  );
}
