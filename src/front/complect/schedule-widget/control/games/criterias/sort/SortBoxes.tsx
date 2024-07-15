import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IScheduleWidgetUserMi } from '../../../../../../models';
import IconButton from '../../../../../the-icon/IconButton';
import { IconCheckmarkBadge01StrokeRounded } from '../../../../../the-icon/icons/checkmark-badge-01';
import { IconMessageQuestionStrokeRounded } from '../../../../../the-icon/icons/message-question';
import { IScheduleWidgetUser } from '../../../../ScheduleWidget.model';
import { useScheduleWidgetRightsContext } from '../../../../useScheduleWidget';
import ScheduleWidgetTeamsCriteriaSorterScreenHistory from './History';
import { ScheduleWidgetTeamsCriteriaSorterScreenSortBoxPhoto } from './SortBoxPhoto';
import { HistoryAdder } from './model';

interface Props {
  uncriteriedUsers: IScheduleWidgetUser[];
  usersForSort: IScheduleWidgetUser[];
  stopOnSingleInsert: () => void;
  singleInsertUser?: IScheduleWidgetUser;
  sortedUsers: IScheduleWidgetUser[];
  setSortedUsers: (users: IScheduleWidgetUser[]) => void;

  setStart: (start: number) => void;
  setEnd: (end: number) => void;

  start: number;
  end: number;
}

const func = () => {};

export const ScheduleWidgetTeamsCriteriaSorterScreenSortBoxes = function SortBoxes({
  uncriteriedUsers,
  usersForSort,
  singleInsertUser,
  sortedUsers,
  setSortedUsers,
  end,
  setEnd,
  setStart,
  start,
  stopOnSingleInsert,
}: Props) {
  const rights = useScheduleWidgetRightsContext();
  const [unknownUsers, setUnknownUsers] = useState<IScheduleWidgetUserMi[]>([]);
  const [correct, setCorrect] = useState<'left' | 'right' | nil>(null);

  const insertUser = useMemo<IScheduleWidgetUser | und>(() => {
    return (
      singleInsertUser ??
      uncriteriedUsers.find(user => !unknownUsers.includes(user.mi) && !sortedUsers.some(({ mi }) => mi === user.mi))
    );
  }, [sortedUsers, singleInsertUser, uncriteriedUsers, unknownUsers]);

  useEffect(() => {
    if (rights.schedule.games?.strikedUsers == null) return;
    const users = rights.schedule.games.strikedUsers;

    setUnknownUsers(prev => [...prev, ...users]);
  }, [rights.schedule.games]);

  const middle = Math.floor((start + end) / 2);
  const currUser: IScheduleWidgetUser | und = sortedUsers[middle];

  const addInHistoryRef = useRef<HistoryAdder>(func);

  if (insertUser == null || currUser == null) return <>Участники распределены</>;

  const onCurrUserClick = () => {
    addInHistoryRef.current(start, end, sortedUsers, 'left');

    if (start > end) {
      const users = [...sortedUsers];
      users.splice(end, 0, insertUser);

      setStart(0);
      setEnd(users.length - 1);
      setSortedUsers(users);
      stopOnSingleInsert();

      return;
    }

    if (middle === 0 || start === end) {
      const users = [...sortedUsers];
      users.splice(start, 0, insertUser);

      setStart(0);
      setEnd(users.length - 1);
      setSortedUsers(users);
      stopOnSingleInsert();

      return;
    }

    setEnd(middle - 1);
  };

  const onInsertUserClick = () => {
    addInHistoryRef.current(start, end, sortedUsers, 'right');

    if (start > end) {
      console.error(start, end);
      const users = [...sortedUsers];
      users.splice(start, 0, insertUser);

      setStart(0);
      setEnd(users.length - 1);
      setSortedUsers(users);
      stopOnSingleInsert();

      return;
    }

    if (start === end) {
      const users = [...sortedUsers];
      users.splice(start + 1, 0, insertUser);

      setStart(0);
      setEnd(users.length - 1);
      setSortedUsers(users);
      stopOnSingleInsert();

      return;
    }

    if (middle + 1 === start) setSortedUsers([...sortedUsers]);

    setStart(middle + 1);
  };

  return (
    <>
      <ScheduleWidgetTeamsCriteriaSorterScreenHistory
        addInHistoryRef={addInHistoryRef}
        setSortedUsers={setSortedUsers}
        setEnd={setEnd}
        setStart={setStart}
        setCorrect={setCorrect}
        start={start}
        end={end}
        sortedUsers={sortedUsers}
      />
      <div className="flex center column flex-gap full-width">
        <div className="flex around full-width">
          <IconButton
            Icon={IconMessageQuestionStrokeRounded}
            onClick={() => {
              const nextUser = usersForSort[usersForSort.findIndex(user => user.mi === currUser.mi) + 1];

              setSortedUsers(nextUser ? [nextUser] : []);
            }}
            confirm={`${currUser.fio} - неизвестный участник?`}
            className={sortedUsers.length > 1 ? 'fade-00' : undefined}
          />
          Выбери кто сильней
          <IconButton
            Icon={IconMessageQuestionStrokeRounded}
            onClick={() => setUnknownUsers([...unknownUsers, insertUser.mi])}
            confirm={`${insertUser.fio} - неизвестный участник?`}
          />
        </div>

        <StyledUserNames className="full-width">
          <span>{currUser.fio}</span>
          <span>{insertUser.fio}</span>
        </StyledUserNames>

        <div className="flex around full-width">
          <ScheduleWidgetTeamsCriteriaSorterScreenSortBoxPhoto
            onClick={onCurrUserClick}
            user={currUser}
          />

          <ScheduleWidgetTeamsCriteriaSorterScreenSortBoxPhoto
            onClick={onInsertUserClick}
            user={insertUser}
          />
        </div>
        <div className="flex around full-width color--ok">
          <IconCheckmarkBadge01StrokeRounded className={correct === 'left' ? undefined : 'fade-00'} />
          <IconCheckmarkBadge01StrokeRounded className={correct === 'right' ? undefined : 'fade-00'} />
        </div>
      </div>
    </>
  );
};

const StyledUserNames = styled.div`
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 1fr 1fr;

  > * {
    grid-area: left;
    text-align: center;

    + * {
      grid-area: right;
    }
  }
`;
