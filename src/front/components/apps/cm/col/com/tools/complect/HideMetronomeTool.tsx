import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import {
  IconDashboardSpeed01SolidRounded,
  IconDashboardSpeed01StrokeRounded,
} from '../../../../../../../complect/the-icon/icons/dashboard-speed-01';
import { ComTool } from '../ComTool';

export const HideMetronomeTool = () => {
  const [isMetronomeHide, setIsMetronomeHide] = cmIDB.use.metronome();

  return (
    <ComTool
      title="Метроном"
      Icon={isMetronomeHide ? IconDashboardSpeed01StrokeRounded : IconDashboardSpeed01SolidRounded}
      onClick={() => setIsMetronomeHide(prev => ({ ...prev, isHide: !prev.isHide }))}
    />
  );
};
