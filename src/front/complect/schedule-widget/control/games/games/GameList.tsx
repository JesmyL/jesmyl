import { useScheduleScopePropsContext } from 'front/complect/schedule-widget/complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import useIsExpand from '../../../../expand/useIsExpand';
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
