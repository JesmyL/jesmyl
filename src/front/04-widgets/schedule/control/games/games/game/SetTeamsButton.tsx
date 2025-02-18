import { FullScreenContent } from '#shared/ui/fullscreen-content';
import TheButton from 'front/08-shared/ui/TheButton';
import { useState } from 'react';
import { useScheduleWidgetRightsContext } from '../../../../useScheduleWidget';
import ScheduleWidgetTeamGameSetTeamsScreen from './SetTeamsScreen';

export default function ScheduleWidgetTeamGameSetTeamsButton() {
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
        <FullScreenContent onClose={setIsOpen}>
          <ScheduleWidgetTeamGameSetTeamsScreen />
        </FullScreenContent>
      )}
    </>
  );
}
