import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { mylib } from '#shared/lib/my-lib';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom, useAtomValue } from 'atomaric';
import { useMemo, useState } from 'react';
import { IScheduleWidgetTeamCriteria, IScheduleWidgetUser, ScheduleGameCriteriaScopeProps } from 'shared/api';
import { isNIs } from 'shared/utils';
import { ScheduleWidgetRemovableUserFace } from '../RemovableUserFace';
import { checkIsUserPhotoable } from '../utils';
import { ScheduleWidgetTeamsCriteriaSorterScreen } from './sort/SorterScreen';

interface Props {
  criteriai: number;
  criteria: IScheduleWidgetTeamCriteria;
}

const itemIt = <Item,>({ item }: { item: Item }) => item;
const termAtom = atom('');
const isOpenAtom = atom(false);

export function ScheduleWidgetSortCriteria({ criteria, criteriai }: Props) {
  const term = useAtomValue(termAtom);
  const rights = useScheduleWidgetRightsContext();
  const [isRenaming, setIsRenaming] = useState(false);
  const [insertUser, setInsertUser] = useState<IScheduleWidgetUser | null>(null);
  const scheduleScopeProps = useScheduleScopePropsContext();
  const criteriaScopeProps: ScheduleGameCriteriaScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, criteriai }),
    [criteriai, scheduleScopeProps],
  );

  const [usersForSort, uncriteriedUsers, sortedUsers] = useMemo(() => {
    const uncriteriedUsers: IScheduleWidgetUser[] = [];
    const sortedUsers: IScheduleWidgetUser[] = [];
    const usersForSort: IScheduleWidgetUser[] = [];

    rights.schedule.ctrl.users.forEach(user => {
      if (!checkIsUserPhotoable(user)) return;

      usersForSort.push(user);

      if (criteria.sorts[user.mi] === undefined) {
        uncriteriedUsers.push(user);
        return;
      }

      sortedUsers.push(user);
    });

    return [usersForSort, uncriteriedUsers, sortedUsers.sort((a, b) => criteria.sorts[a.mi] - criteria.sorts[b.mi])];
  }, [criteria.sorts, rights.schedule.ctrl.users]);

  const filteredUsers: IScheduleWidgetUser[] = useMemo(
    () => (!term ? sortedUsers : mylib.searchRate(sortedUsers, term, ['fio']).map(itemIt)),
    [sortedUsers, term],
  );
  const filteredUncriteriedUsers: IScheduleWidgetUser[] = useMemo(
    () => (!term ? uncriteriedUsers : mylib.searchRate(uncriteriedUsers, term, ['fio']).map(itemIt)),
    [uncriteriedUsers, term],
  );

  return (
    <>
      <ExpandableContent
        title={
          <div className="flex gap-2">
            <StrongEditableField
              value={criteria.title}
              placeholder="Новый критерий"
              isRedact={isRenaming}
              onSend={value =>
                schGamesTsjrpcClient.setCriteriaTitle({
                  props: criteriaScopeProps,
                  value,
                  prevTitle: criteria.title,
                })
              }
            />
            <LazyIcon
              icon="PencilEdit01"
              onClick={() => setIsRenaming(isNIs)}
            />
          </div>
        }
      >
        <DebouncedSearchInput
          className="debounced-searcher round-styled"
          placeholder="Фильтр по имени"
          termAtom={termAtom}
        />
        {!sortedUsers.length || (
          <>
            <h5>Отсортированные участники ({sortedUsers.length} чел)</h5>

            {filteredUsers.map(user => {
              return (
                <ScheduleWidgetRemovableUserFace
                  key={user.mi}
                  user={user}
                  buttons={
                    <LazyIcon
                      className="pointer"
                      icon="SortingAZ01"
                      onClick={() => {
                        isOpenAtom.set(true);
                        setInsertUser(user);
                      }}
                    />
                  }
                />
              );
            })}
          </>
        )}
        {!uncriteriedUsers.length || (
          <>
            <h5>Неопределённые участники ({uncriteriedUsers.length} чел)</h5>
            {filteredUncriteriedUsers.map(user => (
              <ScheduleWidgetRemovableUserFace
                key={user.mi}
                user={user}
              />
            ))}
            <TheButton onClick={isOpenAtom.do.toggle}>Распределить</TheButton>
          </>
        )}

        <FullContent openAtom={isOpenAtom}>
          <ScheduleWidgetTeamsCriteriaSorterScreen
            openAtom={isOpenAtom}
            criteria={criteria}
            criteriaScopeProps={criteriaScopeProps}
            uncriteriedUsers={uncriteriedUsers}
            usersForSort={usersForSort}
            singleInsertUser={insertUser}
          />
        </FullContent>
      </ExpandableContent>
    </>
  );
}
