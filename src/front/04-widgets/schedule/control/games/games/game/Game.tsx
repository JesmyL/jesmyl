import { schGamesSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/scope-contexts/scope-props-contexts';
import StrongEditableField from '#widgets/schedule/strong-control/field/StrongEditableField';
import { ExpandableContent } from 'front/08-shared/ui/expand/ExpandableContent';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { useSchWGameContext } from '../Games';
import ScheduleWidgetTeamGameTeam from '../Team';
import { ScheduleWidgetTeamGamePrintTeamsButton } from './PrintTeamsButton';
import ScheduleWidgetTeamGameSetTeamsButton from './SetTeamsButton';

export default function ScheduleWidgetTeamGame() {
  const [isRenaming, setIsRenaming] = useState(false);
  const game = useSchWGameContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const titleNode = (
    <h3 className="flex flex-gap">
      <StrongEditableField
        value={game.title}
        placeholder="Командная игра"
        isRedact={isRenaming}
        onSend={value =>
          schGamesSokiInvocatorClient.setTitle(null, { ...scheduleScopeProps, gameMi: game.mi }, value, game.title)
        }
      />
      <LazyIcon
        icon="PencilEdit01"
        onClick={event => {
          event.stopPropagation();
          setIsRenaming(is => !is);
        }}
      />
      {/* <ScheduleWidgetTeamGameTranslateTeamsButton /> */}
      <ScheduleWidgetTeamGamePrintTeamsButton />
    </h3>
  );

  if (!game.teams?.length) {
    return (
      <ExpandableContent title={titleNode}>
        <ScheduleWidgetTeamGameSetTeamsButton />
      </ExpandableContent>
    );
  }

  return (
    <ExpandableContent title={titleNode}>
      <div className="margin-gap-v margin-big-gap-l">
        {game.teams.map(team => {
          return (
            <ScheduleWidgetTeamGameTeam
              key={team.mi}
              team={team}
            />
          );
        })}
      </div>
    </ExpandableContent>
  );
}
