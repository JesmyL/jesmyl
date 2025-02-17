import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import useIsExpand from '../../../../../07-shared/ui/expand/useIsExpand';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { SchWGameContext } from './Games';
import ScheduleWidgetTeamGame from './game/Game';

export default function ScheduleWidgetTeamGameList() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const [teamsListExpandNode, isTeamsListExpand] = useIsExpand(
    false,
    <h4>Игры</h4>,
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact &&
      !rights.schedule.games?.list.some(team => !team.title) && (
        <TheIconSendButton
          icon="PlusSign"
          prefix="игра"
          confirm="Добавить новую игру?"
          onSend={() => schGamesSokiInvocatorClient.addGame(null, scheduleScopeProps)}
        />
      ),
  );

  return (
    <>
      {teamsListExpandNode}
      {isTeamsListExpand && (
        <>
          {rights.schedule.games?.list.map(game => {
            return (
              <SchWGameContext.Provider
                key={game.mi}
                value={game}
              >
                <ScheduleWidgetTeamGame />
              </SchWGameContext.Provider>
            );
          })}
        </>
      )}
    </>
  );
}
