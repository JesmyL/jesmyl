import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import { emptyArray } from 'shared/utils';
import styled, { css } from 'styled-components';
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

export default function ScheduleWidgetTeamsCriteriaSorterScreenHistory({
  addInHistoryRef,
  setEnd,
  setSortedUsers,
  setStart,
  setCorrect,
  end,
  start,
  sortedUsers,
}: Props) {
  const [history, setHistory] = useState<HistoryItem[]>(emptyArray);
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

  return (
    <StyledHistory
      className="flex flex-gap between half-width"
      $historyLength={history.length}
      $point={point}
    >
      <StyledUndo
        icon="LinkBackward"
        className="pointer"
        onClick={() => {
          const newPoint = point === null ? history.length - 1 : point - 1;
          setPoint(newPoint);
          setItem(newPoint);

          if (point !== null) return;
          setHistory([...history, { start, end, users: sortedUsers }]);
        }}
      />
      <StyledRedo
        icon="LinkForward"
        className="pointer"
        onClick={() => {
          const newPoint = point === null ? history.length - 1 : point + 1;
          setPoint(newPoint);
          setItem(newPoint);
        }}
      />
    </StyledHistory>
  );
}

const navCss = css`
  scale: 2;
`;

const StyledUndo = styled(LazyIcon)<{ icon: 'LinkBackward' }>`
  ${navCss}
`;

const StyledRedo = styled(LazyIcon)<{ icon: 'LinkForward' }>`
  ${navCss}
`;

const disabledButtonCss = css`
  opacity: 0.4;
  pointer-events: none;
`;

const StyledHistory = styled.div<{ $historyLength: number; $point: number | null }>`
  ${props => {
    return !props.$historyLength
      ? css`
          ${StyledUndo}, ${StyledRedo} {
            ${disabledButtonCss}
          }
        `
      : props.$point === null || props.$historyLength - 1 <= props.$point
        ? css`
            ${StyledRedo} {
              ${disabledButtonCss}
            }
          `
        : props.$point === 0
          ? css`
              ${StyledUndo} {
                ${disabledButtonCss}
              }
            `
          : css``;
  }}
`;
