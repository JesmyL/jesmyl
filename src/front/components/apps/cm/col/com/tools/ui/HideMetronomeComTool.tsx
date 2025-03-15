import { useAtomSet } from '#shared/lib/atoms';
import { metronomeIsOpenAtom } from '#widgets/metronome';
import { ComTool } from '../ComTool';

export const HideMetronomeComTool = () => {
  const setIsOpen = useAtomSet(metronomeIsOpenAtom);

  return (
    <ComTool
      title="Метроном"
      icon="DashboardSpeed01"
      onClick={() => setIsOpen(true)}
    />
  );
};
