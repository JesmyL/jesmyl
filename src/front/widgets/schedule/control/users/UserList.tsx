import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ReactNode } from 'react';
import { IScheduleWidgetUser, scheduleWidgetUserRights } from 'shared/api';
import { ScheduleWidgetUser } from './User';

export function ScheduleWidgetUserList({
  asUserPlusPrefix,
  filter,
  title,
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
  const [expandNode, isExpand] = useIsExpand(isInitExpand ?? false, title ?? <>Участники</>, titlePostfix);

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
      <div className="my-2">{expandNode}</div>
      {isExpand && (
        <div className="my-5 ml-2">
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
            <div className="italic text-x7">Список пуст</div>
          )}
        </div>
      )}
    </>
  );
}
