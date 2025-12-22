import { metronomeIsOpenAtom } from '#widgets/metronome';
import { CmComTool } from '../ComTool';

export const CmComToolHideMetronome = () => {
  return (
    <CmComTool
      title="Метроном"
      icon="DashboardSpeed01"
      onClick={() => metronomeIsOpenAtom.set(true)}
    />
  );
};
