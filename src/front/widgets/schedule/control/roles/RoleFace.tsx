import { translateBase } from '#basis/locale';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { extractScheduleWidgetRoleUser } from '#widgets/schedule/useScheduleWidget';
import { useAuth, useUserInfoDict } from '$index/shared/state';
import { IScheduleWidget, IScheduleWidgetRole } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { takeUserAuthName } from 'shared/utils/user.utils';

export function ScheduleWidgetRoleFace({ role, schedule }: { role?: IScheduleWidgetRole; schedule: IScheduleWidget }) {
  const auth = useAuth();
  const { byId, byLogin } = useUserInfoDict();
  const roleUser = role && extractScheduleWidgetRoleUser(schedule, role.mi);
  const myUserId = auth.login ? byLogin.get(auth.login)?.id : null;
  if (role === undefined)
    return <div className="text-xKO">{translateBase(BaseLocaleKey.ScheduleUnknownRole)}</div>;

  const roleUserAuth = roleUser ? byId.get(roleUser.id)?.uauth : null;
  const roleUserName =
    roleUserAuth?.fio && roleUserAuth.nick && roleUserAuth.fio !== roleUserAuth.nick
      ? `${roleUserAuth.fio} (${roleUserAuth.nick})`
      : takeUserAuthName(roleUserAuth);

  return (
    <div className={'flex gap-2' + (roleUser && myUserId === roleUser.id ? ' text-x7' : ' text-x3')}>
      {role.icon ? <LazyIcon icon={role.icon} /> : <LazyIcon icon="Github" />}
      <div className="face-title">
        {role.title}
        {' - '}
        {roleUserName || <span className="text-x3 italic">{translateBase(BaseLocaleKey.ScheduleVacant)}</span>}
      </div>
    </div>
  );
}
