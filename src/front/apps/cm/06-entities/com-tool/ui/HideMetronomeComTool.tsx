import { metronomeIsOpenAtom } from '#widgets/metronome';
import { useAtomSet } from 'atomaric';
import { CmComTool } from '../ComTool';

export const CmComToolHideMetronome = () => {
  const setIsOpen = useAtomSet(metronomeIsOpenAtom);

  return (
    <CmComTool
      title="Метроном"
      icon="DashboardSpeed01"
      onClick={() => setIsOpen(true)}
    />
  );
};
