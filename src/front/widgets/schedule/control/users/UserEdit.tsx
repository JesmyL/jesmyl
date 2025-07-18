import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useScheduleUserScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schUsersSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import {
  IScheduleWidgetUser,
  IScheduleWidgetWid,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { ScheduleWidgetRightControlList } from '../RightControlList';

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
        onSend={value => schUsersSokiInvocatorClient.setUserFio({ props: scheduleUserScopeProps, fio: value })}
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
          onSend={value => schUsersSokiInvocatorClient.setUserRights({ props: scheduleUserScopeProps, R: value })}
        />
      )}
    </>
  );
}
