import useIsExpand from 'front/08-shared/ui/expand/useIsExpand';
import { ReactNode } from 'react';
import { IScheduleWidgetUser, scheduleWidgetUserRights } from 'shared/api';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import { ScheduleWidgetUser } from './User';

export default function ScheduleWidgetUserList({
  asUserPlusPrefix,
  filter,
  title = <>Участники</>,
  titlePostfix,
  isInitExpand,
}: {
  asUserPlusPrefix?: (userNode: ReactNode, user: IScheduleWidgetUser, balance: number) => ReactNode;
  filter?: (user: IScheduleWidgetUser, useri: number, usera: IScheduleWidgetUser[]) => boolean;
  title?: ReactNode;
  titlePostfix?: ReactNode | ((isExpand: boolean) => ReactNode);
  isInitExpand?: boolean;
}) {
  const rights = useScheduleWidgetRightsContext();
  const [expandNode, isExpand] = useIsExpand(isInitExpand ?? false, title, titlePostfix);

  const users = (
    filter === undefined ? [...rights.schedule.ctrl.users] : [...rights.schedule.ctrl.users].filter(filter)
  )
    .map(user => {
      return {
        user,
        balance: scheduleWidgetUserRights.rightsBalance(user.R),
        _: (user.fio === undefined ? '' : '' + user.fio) + user.nick,
      };
    })
    .sort((a, b) => {
      return a.balance < b.balance ? 1 : a.balance > b.balance ? -1 : a._ < b._ ? -1 : 1;
    });

  return (
    <>
      <div className="margin-gap-v">{expandNode}</div>
      {isExpand && (
        <div className="margin-big-gap-v margin-gap-l">
          {users.length ? (
            users.map(({ user, balance }) => {
              return (
                <ScheduleWidgetUser
                  key={user.mi}
                  user={user}
                  balance={balance}
                  asUserPlusPrefix={asUserPlusPrefix}
                />
              );
            })
          ) : (
            <div className="text-italic color--7">Список пуст</div>
          )}
        </div>
      )}
    </>
  );
}
