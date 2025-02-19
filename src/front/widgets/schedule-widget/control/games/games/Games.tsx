import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { IScheduleWidgetTeamGame } from 'shared/api';
import { contextCreator } from '../../../../../shared/lib/contextCreator';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetSortCriterias } from '../criterias/SortCriterias';
import { ScheduleWidgetTeamGameList } from './GameList';

export const [SchWGameContext, useSchWGameContext] = contextCreator<IScheduleWidgetTeamGame>(null!);

export const ScheduleWidgetTeamGames = () => {
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
};
