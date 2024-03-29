import EvaButton from '../../../../../../../complect/eva-icon/EvaButton';
import { TeamGameImportable } from '../../../../Leader.model';
import { LeaderCleans } from '../../../LeaderCleans';
import { GameTeamImportable } from '../../teams/GameTeams.model';
import { GameTimerImportable } from '../GameTimer.model';

export default function TimerControlBoardCellItemStopButton({
  team,
  rowi,
  onTeamwSelect,
  timer,
  onPauseForRow,
  game,
}: {
  timer: GameTimerImportable;
  game: TeamGameImportable;
  team: GameTeamImportable;
  rowi: number;
  onTeamwSelect: (teamw: number | null) => void;
  onPauseForRow: (teamw: number, value?: number) => void;
}) {
  return (
    <>
      {!timer.finishes?.[team.w] ? (
        <EvaButton
          name="pause-circle-outline"
          className="finish-button"
          disabled={!LeaderCleans.getTimerStartTs(timer, game, rowi)}
          onClick={event => {
            event.stopPropagation();
            onTeamwSelect(null);
            if (!LeaderCleans.getTimerStartTs(timer, game, rowi) || timer.finishes?.[team.w]) return;
            onPauseForRow(team.w);
          }}
        />
      ) : (
        <EvaButton
          name="trash-2-outline"
          className="reset-button"
          confirm="Сбросить результат"
          onClick={event => {
            event.stopPropagation();
            onTeamwSelect(null);
            onPauseForRow(team.w, 0);
          }}
        />
      )}
    </>
  );
}
