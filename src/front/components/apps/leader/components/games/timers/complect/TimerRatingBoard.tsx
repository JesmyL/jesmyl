import { useEffect, useState } from 'react';
import CopyTextButton from '../../../../../../../complect/CopyTextButton';
import EvaSendButton from '../../../../../../../complect/sends/eva-send-button/EvaSendButton';
import IconButton from '../../../../../../../complect/the-icon/IconButton';
import { IconArrowDown02StrokeRounded } from '../../../../../../../complect/the-icon/icons/arrow-down-02';
import { IconArrowUp02StrokeRounded } from '../../../../../../../complect/the-icon/icons/arrow-up-02';
import { IconViewStrokeRounded } from '../../../../../../../complect/the-icon/icons/view';
import { IconViewOffSlashStrokeRounded } from '../../../../../../../complect/the-icon/icons/view-off-slash';
import { TeamGameImportable } from '../../../../Leader.model';
import { LeaderCleans } from '../../../LeaderCleans';
import { GameTimerImportable, GameTimerSortDirection } from '../GameTimer.model';
import TimerScreen from './TimerScreen';

export default function TimerRatingBoard({
  timer,
  game,
  withoutControls,
}: {
  timer: GameTimerImportable;
  game: TeamGameImportable;
  withoutControls?: boolean;
}) {
  const [sortDirection, setSortDirection] = useState<GameTimerSortDirection>();
  const [hiddenTeams, setHiddenTeams] = useState<number[]>([]);
  const rating = LeaderCleans.rateSortedTimerTeams(timer, game, true, sortDirection);
  let teamPosition = 0;

  useEffect(() => {
    setSortDirection(LeaderCleans.getTimerConfigurableField('sort', timer, game));
  }, [game.timerFields?.sort, timer.sort]);

  return (
    <>
      {rating.length > 0 && (
        <div className="TimerResults">
          {withoutControls || (
            <CopyTextButton
              message="Рейтинг команд скопированы"
              className="text-bold margin-gap-b"
              description="Рейтинг"
              text={() => {
                let teamPosition = 0;

                const list = rating
                  .map(({ team, start, finish }) => {
                    if (!team || hiddenTeams.includes(team.w)) return '';
                    teamPosition++;
                    return `${teamPosition} ${team.name} ${LeaderCleans.getTimePeriodAsString(start, finish)}`;
                  })
                  .filter(it => it)
                  .join('\n');

                return `${timer.name}\n\n${list}`;
              }}
            />
          )}
          <div className="flex flex-gap">
            {withoutControls || (
              <EvaSendButton
                Icon={sortDirection ? IconArrowUp02StrokeRounded : IconArrowDown02StrokeRounded}
                onSend={() => {
                  const val = +!sortDirection;
                  setSortDirection(val);
                  return LeaderCleans.setTimerResultsSortDirection(game.w, timer.w, val);
                }}
                onFailure={error => error}
              />
            )}
            <div>
              {rating.map(({ team, start, finish }, bagi) => {
                if (!team || !finish) return null;
                const isHidden = hiddenTeams.includes(team.w);
                if (!isHidden) ++teamPosition;

                return (
                  <div
                    key={bagi}
                    className={'flex flex-gap' + (isHidden ? ' text-strike ' : '')}
                  >
                    {isHidden ? <div className="width-1em" /> : <div className="width-1em">{teamPosition}</div>}
                    <div>{team.name}</div>
                    <TimerScreen
                      className="color--3"
                      start={start}
                      pause={finish}
                    />
                    {withoutControls || (
                      <IconButton
                        Icon={isHidden ? IconViewStrokeRounded : IconViewOffSlashStrokeRounded}
                        onClick={() =>
                          setHiddenTeams(list =>
                            isHidden ? list.filter(teamw => teamw !== team.w) : [...list, team.w],
                          )
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
