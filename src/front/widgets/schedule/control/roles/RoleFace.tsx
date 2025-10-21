import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { extractScheduleWidgetRoleUser } from '#widgets/schedule/useScheduleWidget';
import { useAuth } from '$index/shared/state';
import { IScheduleWidget, IScheduleWidgetRole } from 'shared/api';

export function ScheduleWidgetRoleFace({ role, schedule }: { role?: IScheduleWidgetRole; schedule: IScheduleWidget }) {
  const auth = useAuth();
  const roleUser = role && extractScheduleWidgetRoleUser(schedule, role.mi);
  if (role === undefined) return <div className="text-xKO">Неизвестная роль</div>;

  return (
    <div className={'flex gap-2' + (auth && roleUser && auth.login === roleUser.login ? ' text-x7' : ' text-x3')}>
      {role.icon ? <LazyIcon icon={role.icon} /> : <LazyIcon icon="Github" />}
      <div className="face-title">
        {role.title}
        {' - '}
        {roleUser?.fio || roleUser?.nick || <span className="text-x3 italic">Вакант</span>}
      </div>
    </div>
  );
}
