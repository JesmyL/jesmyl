import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { TheButton } from '#shared/ui/TheButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { atom } from 'atomaric';
import { ScheduleWidgetTeamGameSetTeamsScreen } from './SetTeamsScreen';

const isOpenFullContentAtom = atom(false);

export function ScheduleWidgetTeamGameSetTeamsButton() {
  const rights = useScheduleWidgetRightsContext();
  const criterias = rights.schedule.games?.criterias;

  return (
    <>
      <TheButton
        disabled={!criterias?.length}
        onClick={isOpenFullContentAtom.do.toggle}
      >
        Сформировать команды
      </TheButton>

      <FullContent openAtom={isOpenFullContentAtom}>
        <ScheduleWidgetTeamGameSetTeamsScreen />
      </FullContent>
    </>
  );
}
