import { IScheduleWidgetTeamGame } from 'shared/api';
import { contextCreator } from '../../../../../07-shared/lib/contextCreator';
import useIsExpand from '../../../../../07-shared/ui/expand/useIsExpand';
import { useScheduleWidgetRightsContext } from '../../../useScheduleWidget';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import ScheduleWidgetSortCriterias from '../criterias/SortCriterias';
import ScheduleWidgetTeamGameList from './GameList';

export const [SchWGameContext, useSchWGameContext] = contextCreator<IScheduleWidgetTeamGame>(null!);

export default function ScheduleWidgetTeamGames() {
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
