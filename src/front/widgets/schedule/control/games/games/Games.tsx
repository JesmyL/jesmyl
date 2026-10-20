import { translateBase } from '#basis/locale';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetSortCriterias } from '../criterias/SortCriterias';
import { ScheduleWidgetShareButtons } from '../ShareButtons';
import { ScheduleWidgetTeamGameList } from './GameList';

export function ScheduleWidgetTeamGames() {
  const rights = useScheduleWidgetRightsContext();
  const [teamsExpandNode, isTeamsExpand] = useIsExpand(
    false,
    <>{translateBase(BaseLocaleKey.ScheduleTeamGames)}</>,
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
