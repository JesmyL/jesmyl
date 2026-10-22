import { translateBase } from '#basis/locale';
import { useScheduleUserScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schUsersTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import {
  IScheduleWidgetUser,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  ScheduleWidgetWidDef,
} from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetRightControlList } from '../RightControlList';

const accessLevel = scheduleWidgetUserRights.rightLevel(ScheduleWidgetUserRoleRight.ReadTitles);

export function ScheduleWidgetUserEdit({ user }: { user: IScheduleWidgetUser }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleUserScopeProps = useScheduleUserScopePropsContext();

  if (scheduleUserScopeProps.schw === ScheduleWidgetWidDef)
    return <div className="text-xKO">{translateBase(BaseLocaleKey.ScheduleNotInContext)}</div>;

  return (
    <>
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
          onSend={value => schUsersTsjrpcClient.setUserRights({ props: scheduleUserScopeProps, R: value })}
        />
      )}
    </>
  );
}
