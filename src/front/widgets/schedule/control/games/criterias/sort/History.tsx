import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import { HistoryAdder } from './model';

interface Props {
  start: number;
  end: number;
  addInHistoryRef: { current: HistoryAdder };
  setStart: (start: number) => void;
  setEnd: (end: number) => void;
  setCorrect: (correct: 'left' | 'right' | nil) => void;
  setSortedUsers: (users: IScheduleWidgetUser[]) => void;
  sortedUsers: IScheduleWidgetUser[];
}

interface HistoryItem {
  start: number;
  end: number;
  users: IScheduleWidgetUser[];
  correct?: 'left' | 'right';
}

export function ScheduleWidgetTeamsCriteriaSorterScreenHistory({
  addInHistoryRef,
  setEnd,
  setSortedUsers,
  setStart,
  setCorrect,
  end,
  start,
  sortedUsers,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [point, setPoint] = useState<number | null>(null);

  addInHistoryRef.current = (start, end, users, correct) => {
    if (point !== null) {
      setPoint(null);

      if (point < history.length) {
        const item = history[point];

        if (item.correct === correct && item.start === start && item.end === end) {
          const nextPoint = point + 1;

          if (history[nextPoint] != null) {
            const { end, start, users, correct } = history[nextPoint];

            setStart(start);
            setEnd(end);
            setSortedUsers(users);
            setCorrect(correct);
          }

          setPoint(nextPoint);
          return;
        }
      }
    }

    setCorrect(null);

    setHistory([...(point === null ? history : history.slice(0, point)), { end, start, users, correct }]);
  };

  const setItem = (point: number) => {
    if (history[point] == null) return;

    const { end, start, users, correct } = history[point];

    setStart(start);
    setEnd(end);
    setSortedUsers(users);
    setCorrect(correct);
  };

  const isRedoDisabled = !history.length || point === null || history.length - 1 <= point;
  const isUndoDisabled = !history.length || (!isRedoDisabled && point === 0);
  const navClassName = 'pointer scale-200';

  return (
    <div className="flex gap-2 between w-[50%]">
      <LazyIcon
        icon="LinkBackward"
        className={navClassName + (isUndoDisabled ? ' opacity-40 pointer-events-none' : '')}
        onClick={() => {
          const newPoint = point === null ? history.length - 1 : point - 1;
          setPoint(newPoint);
          setItem(newPoint);

          if (point !== null) return;
          setHistory([...history, { start, end, users: sortedUsers }]);
        }}
      />
      <LazyIcon
        icon="LinkForward"
        className={navClassName + (isRedoDisabled ? ' opacity-40 pointer-events-none' : '')}
        onClick={() => {
          const newPoint = point === null ? history.length - 1 : point + 1;
          setPoint(newPoint);
          setItem(newPoint);
        }}
      />
    </div>
  );
}
