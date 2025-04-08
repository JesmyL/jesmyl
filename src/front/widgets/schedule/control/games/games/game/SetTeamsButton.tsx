import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { atom } from '#shared/lib/atom';
import { TheButton } from '#shared/ui/TheButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { ScheduleWidgetTeamGameSetTeamsScreen } from './SetTeamsScreen';

const isOpenFullContentAtom = atom(false);

export function ScheduleWidgetTeamGameSetTeamsButton() {
  const rights = useScheduleWidgetRightsContext();
  const criterias = rights.schedule.games?.criterias;

  return (
    <>
      <TheButton
        disabled={!criterias?.length}
        onClick={isOpenFullContentAtom.toggle}
      >
        Сформировать команды
      </TheButton>

      <FullContent openAtom={isOpenFullContentAtom}>
        <ScheduleWidgetTeamGameSetTeamsScreen />
      </FullContent>
    </>
  );
}
