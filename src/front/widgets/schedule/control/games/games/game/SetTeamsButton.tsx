import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { TheButton } from '#shared/ui/TheButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { useState } from 'react';
import { ScheduleWidgetTeamGameSetTeamsScreen } from './SetTeamsScreen';

export function ScheduleWidgetTeamGameSetTeamsButton() {
  const rights = useScheduleWidgetRightsContext();
  const criterias = rights.schedule.games?.criterias;
  const [isOpen, setIsOpen] = useState<unknown>(false);

  return (
    <>
      <TheButton
        disabled={!criterias?.length}
        onClick={setIsOpen}
      >
        Сформировать команды
      </TheButton>
      {isOpen && (
        <FullContent onClose={setIsOpen}>
          <ScheduleWidgetTeamGameSetTeamsScreen />
        </FullContent>
      )}
    </>
  );
}
