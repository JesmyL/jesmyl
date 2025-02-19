import { LazyIcon } from '#shared/ui/icon';
import { SendableField } from '#shared/ui/sendable/SendableField';
import { useScheduleScopePropsContext } from 'front/widgets/schedule-widget/complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from 'front/widgets/schedule-widget/invocators/invocators.methods';
import { useState } from 'react';
import { ExpandableContent } from '../../../../../../shared/ui/expand/ExpandableContent';
import { useSchWGameContext } from '../Games';
import { ScheduleWidgetTeamGameTeam } from '../Team';
import { ScheduleWidgetTeamGamePrintTeamsButton } from './PrintTeamsButton';
import { ScheduleWidgetTeamGameSetTeamsButton } from './SetTeamsButton';

export const ScheduleWidgetTeamGame = () => {
  const [isRenaming, setIsRenaming] = useState(false);
  const game = useSchWGameContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const titleNode = (
    <h3 className="flex flex-gap">
      <SendableField
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
};
