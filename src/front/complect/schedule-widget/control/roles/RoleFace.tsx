import { IScheduleWidget, IScheduleWidgetRole } from 'shared/api';
import { useAuth } from '../../../../components/index/atoms';
import { LazyIcon } from '../../../the-icon/LazyIcon';
import { extractScheduleWidgetRoleUser } from '../../useScheduleWidget';

export default function ScheduleWidgetRoleFace({
  role,
  schedule,
}: {
  role?: IScheduleWidgetRole;
  schedule: IScheduleWidget;
}) {
  const auth = useAuth();
  const roleUser = role && extractScheduleWidgetRoleUser(schedule, role.mi);
  if (role === undefined) return <div className="color--ko">Неизвестная роль</div>;

  return (
    <div className={'flex flex-gap' + (auth && roleUser && auth.login === roleUser.login ? ' color--7' : ' color--3')}>
      {role.icon ? <LazyIcon icon={role.icon} /> : <LazyIcon icon="Github" />}
      <div className="face-title">
        {role.title}
        {' - '}
        {roleUser?.fio || roleUser?.nick || <span className="color--3 text-italic">Вакант</span>}
      </div>
    </div>
  );
}
