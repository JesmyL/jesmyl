import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useState } from 'react';
import TheButton from '../../../../../Button';
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
        <FullContent onClose={setIsOpen}>
          <ScheduleWidgetTeamGameSetTeamsScreen />
        </FullContent>
      )}
    </>
  );
}
