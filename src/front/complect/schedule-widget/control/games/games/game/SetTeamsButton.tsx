import { TheButton } from '#shared/ui/Button';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useScheduleWidgetRightsContext } from 'front/complect/schedule-widget/useScheduleWidget';
import { useState } from 'react';
import { ScheduleWidgetTeamGameSetTeamsScreen } from './SetTeamsScreen';

export const ScheduleWidgetTeamGameSetTeamsButton = () => {
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
};
