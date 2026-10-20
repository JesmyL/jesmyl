import { translateBase } from '#basis/locale';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetTeamGame } from './game/Game';
import { ScheduleGameContext } from './lib/contexts';

export function ScheduleWidgetTeamGameList() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const [teamsListExpandNode, isTeamsListExpand] = useIsExpand(
    false,
    <h4>{translateBase(BaseLocaleKey.Games)}</h4>,
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact &&
      !rights.schedule.games?.list.some(team => !team.title) && (
        <TheIconSendButton
          icon="PlusSign"
          prefix={translateBase(BaseLocaleKey.ScheduleGameLower)}
          confirm={translateBase(BaseLocaleKey.ScheduleAddGameConfirm)}
          onSend={() => schGamesTsjrpcClient.addGame({ props: scheduleScopeProps })}
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
              <ScheduleGameContext
                key={game.mi}
                value={game}
              >
                <ScheduleWidgetTeamGame />
              </ScheduleGameContext>
            );
          })}
        </>
      )}
    </>
  );
}
