import { Atom } from '#shared/lib/atom';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { schGamesSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useCallback, useState } from 'react';
import {
  IScheduleWidgetTeamCriteria,
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  ScheduleGameCriteriaScopeProps,
} from 'shared/api';
import { ScheduleWidgetTeamsCriteriaSorterScreenSortBoxes } from './SortBoxes';

interface Props {
  openAtom: Atom<boolean>;
  criteria: IScheduleWidgetTeamCriteria;
  uncriteriedUsers: IScheduleWidgetUser[];
  usersForSort: IScheduleWidgetUser[];
  singleInsertUser?: IScheduleWidgetUser | nil;
  criteriaScopeProps: ScheduleGameCriteriaScopeProps;
}

export function ScheduleWidgetTeamsCriteriaSorterScreen({
  criteria,
  uncriteriedUsers,
  usersForSort,
  singleInsertUser,
  criteriaScopeProps,
  openAtom,
}: Props) {
  const [sortedUsers, setSortedUsers] = useState(() => {
    const users = [...usersForSort]
      .filter(
        user => criteria.sorts[user.mi] !== undefined && (singleInsertUser == null || singleInsertUser.mi !== user.mi),
      )
      .sort((a, b) => criteria.sorts[a.mi] - criteria.sorts[b.mi]);

    if (users.length) return users;

    return [usersForSort[0]];
  });

  const [isStop, setIsStop] = useState(false);

  const stopOnSingleInsert = useCallback(() => {
    if (singleInsertUser == null) return;
    setIsStop(true);
  }, [singleInsertUser]);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(sortedUsers.length - 1);

  return (
    <div className="flex between column full-height">
      {singleInsertUser ? (
        <h3>Переопределение участника ({criteria.title})</h3>
      ) : (
        <h3>
          Распределение участноков ({criteria.title}) {sortedUsers.length}/{usersForSort.length}
        </h3>
      )}
      {isStop ? (
        <span>Участник определён</span>
      ) : (
        <ScheduleWidgetTeamsCriteriaSorterScreenSortBoxes
          singleInsertUser={singleInsertUser}
          uncriteriedUsers={uncriteriedUsers}
          usersForSort={usersForSort}
          sortedUsers={sortedUsers}
          setSortedUsers={setSortedUsers}
          setEnd={setEnd}
          setStart={setStart}
          end={end}
          start={start}
          stopOnSingleInsert={stopOnSingleInsert}
        />
      )}
      <div className="full-width flex center">
        <SendButton
          title="Отправить"
          onSuccess={openAtom.reset}
          onSend={() => {
            const value = {} as Record<IScheduleWidgetUserMi, number>;

            sortedUsers.forEach((user, useri) => {
              if (criteria.sorts[user.mi] === useri) return;
              value[user.mi] = useri;
            });

            return schGamesSokiInvocatorClient.setSortedDict({
              props: criteriaScopeProps,
              value,
              criteriaTitle: criteria.title,
            });
          }}
        />
      </div>
    </div>
  );
}
