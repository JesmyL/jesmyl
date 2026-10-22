import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useMemo, useState } from 'react';
import { IScheduleWidgetTeamCriteria, IScheduleWidgetUser, ScheduleGameCriteriaScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { isNIs } from 'shared/utils';
import { searchRate } from 'shared/utils/searchRate';
import { ScheduleWidgetRemovableUserFace } from '../RemovableUserFace';
import { checkIsUserPhotoable } from '../utils';
import { ScheduleWidgetTeamsCriteriaSorterScreen } from './sort/SorterScreen';

interface Props {
  criteriai: number;
  criteria: IScheduleWidgetTeamCriteria;
}

let termAtom: Atom<string>;
let isOpenAtom: Atom<boolean>;

export function ScheduleWidgetSortCriteria({ criteria, criteriai }: Props) {
  termAtom ??= atom('');
  isOpenAtom ??= atom(false);

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

  const filteredUsers: IScheduleWidgetUser[] = useMemo(() => {
    if (!term) return sortedUsers;

    return searchRate(
      sortedUsers.map(user => ({ user, title: takeScheduleWidgetUserName(rights, user) })),
      term,
      ['title'],
    ).map(box => box.item.user);
  }, [rights, sortedUsers, term]);
  const filteredUncriteriedUsers: IScheduleWidgetUser[] = useMemo(() => {
    if (!term) return uncriteriedUsers;

    return searchRate(
      uncriteriedUsers.map(user => ({ user, title: takeScheduleWidgetUserName(rights, user) })),
      term,
      ['title'],
    ).map(box => box.item.user);
  }, [rights, uncriteriedUsers, term]);

  return (
    <>
      <ExpandableContent
        title={
          <div className="flex gap-2">
            <StrongEditableField
              value={criteria.title}
              placeholder={translateBase(BaseLocaleKey.ScheduleNewCriteria)}
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
          placeholder={translateBase(BaseLocaleKey.ScheduleFilterByName)}
          termAtom={termAtom}
        />
        {!sortedUsers.length || (
          <>
            <h5>{translateBase(BaseLocaleKey.ScheduleSortedMembers, { n: sortedUsers.length })}</h5>

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
            <h5>{translateBase(BaseLocaleKey.ScheduleUndefinedMembers, { n: uncriteriedUsers.length })}</h5>
            {filteredUncriteriedUsers.map(user => (
              <ScheduleWidgetRemovableUserFace
                key={user.mi}
                user={user}
              />
            ))}
            <TheButton onClick={isOpenAtom.do.toggle}>
              {translateBase(BaseLocaleKey.ScheduleDistribute)}
            </TheButton>
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
