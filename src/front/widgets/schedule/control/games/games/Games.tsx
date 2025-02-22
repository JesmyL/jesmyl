import { contextCreator } from '#shared/lib/contextCreator';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { IScheduleWidgetTeamGame } from 'shared/api';
import { ScheduleWidgetSortCriterias } from '../criterias/SortCriterias';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetTeamGameList } from './GameList';

export const [SchWGameContext, useSchWGameContext] = contextCreator<IScheduleWidgetTeamGame>(null!);

export function ScheduleWidgetTeamGames() {
  const rights = useScheduleWidgetRightsContext();
  const [teamsExpandNode, isTeamsExpand] = useIsExpand(
    false,
    <>Командные игры</>,
    isExpand => isExpand && <ScheduleWidgetShareButtons />,
  );

  return (
    <>
      <h3>{teamsExpandNode}</h3>
      {isTeamsExpand && (
        <>
          {rights.isCanRedact && <ScheduleWidgetSortCriterias />}
          <ScheduleWidgetTeamGameList />
        </>
      )}
    </>
  );
}
