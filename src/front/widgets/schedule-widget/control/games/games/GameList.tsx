import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { useScheduleScopePropsContext } from 'front/widgets/schedule-widget/complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from 'front/widgets/schedule-widget/invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { SchWGameContext } from './Games';
import { ScheduleWidgetTeamGame } from './game/Game';

export const ScheduleWidgetTeamGameList = () => {
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
};
