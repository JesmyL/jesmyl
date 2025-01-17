import { useScheduleScopePropsContext } from 'front/complect/schedule-widget/complect/scope-contexts/useScheduleScopePropsContext';
import { schSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import useIsExpand from '../../../../expand/useIsExpand';
import { IconPlusSignStrokeRounded } from '../../../../the-icon/icons/plus-sign';
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
        <EvaSendButton
          Icon={IconPlusSignStrokeRounded}
          prefix="игра"
          confirm="Добавить новую игру?"
          onSend={() => schSokiInvocatorClient.addGame(null, scheduleScopeProps)}
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
