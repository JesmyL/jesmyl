import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { IScheduleWidgetUser, scheduleWidgetUserRights } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetUser } from './User';

export function ScheduleWidgetUsersLink() {
  const rights = useScheduleWidgetRightsContext();
  const appName = useAppNameContext();

  return (
    <Link
      to="/!other/$appName/schs/users"
      params={{ appName }}
      search={{ schw: rights.schedule.w }}
      className="flex gap-2 items-center my-3 pointer"
    >
      <span className="grid place-items-center size-9 rounded-xl bg-x4/20 text-xOK ring-1 ring-xOK/30">
        <LazyIcon icon="UserGroup" />
      </span>
      <span className="flex-1 uppercase tracking-[0.18em] text-[0.65em] text-x7">
        {translateBase(BaseLocaleKey.ScheduleMembers)}
      </span>
      <LazyIcon icon="ArrowRight01" />
    </Link>
  );
}

export function ScheduleWidgetUserList({
  asUserPlusPrefix,
  filter,
  title,
  titlePostfix,
  isInitExpand,
  withoutTitle,
}: {
  asUserPlusPrefix?: (userNode: ReactNode, user: IScheduleWidgetUser, balance: number) => ReactNode;
  filter?: (user: IScheduleWidgetUser, useri: number, usera: IScheduleWidgetUser[]) => boolean;
  title?: ReactNode;
  titlePostfix?: ReactNode | ((isExpand: boolean) => ReactNode);
  isInitExpand?: boolean;
  withoutTitle?: boolean;
}) {
  const rights = useScheduleWidgetRightsContext();
  const [expandNode, isExpand] = useIsExpand(
    isInitExpand ?? false,
    title ?? <>{translateBase(BaseLocaleKey.ScheduleMembers)}</>,
    titlePostfix,
  );

  const users = (
    filter === undefined ? [...rights.schedule.ctrl.users] : [...rights.schedule.ctrl.users].filter(filter)
  )
    .map(user => {
      return {
        user,
        balance: scheduleWidgetUserRights.rightsBalance(user.R),
        _: takeScheduleWidgetUserName(rights, user),
      };
    })
    .sort((a, b) => {
      return a.balance < b.balance ? 1 : a.balance > b.balance ? -1 : a._ < b._ ? -1 : 1;
    });

  return (
    <>
      {withoutTitle || <div className="my-2">{expandNode}</div>}
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
            <div className="italic text-x7">{translateBase(BaseLocaleKey.EmptyList)}</div>
          )}
        </div>
      )}
    </>
  );
}
