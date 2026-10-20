import { translateBase } from '#basis/locale';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';

import { TheButton } from '#shared/ui/TheButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { Atom, atom } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetTeamGameSetTeamsScreen } from './SetTeamsScreen';

let isOpenFullContentAtom: Atom<boolean>;

export function ScheduleWidgetTeamGameSetTeamsButton() {
  isOpenFullContentAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();
  const criterias = rights.schedule.games?.criterias;

  return (
    <>
      <TheButton
        disabled={!criterias?.length}
        onClick={isOpenFullContentAtom.do.toggle}
      >
        {translateBase(BaseLocaleKey.ScheduleFormTeams)}
      </TheButton>

      <FullContent openAtom={isOpenFullContentAtom}>
        <ScheduleWidgetTeamGameSetTeamsScreen />
      </FullContent>
    </>
  );
}
