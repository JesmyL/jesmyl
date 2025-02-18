import { cmIDB } from '#basis/lib/idb/cm';
import { ComTool } from '../ComTool';

export const HideMetronomeTool = () => {
  const [isMetronomeHide, setIsMetronomeHide] = cmIDB.use.metronome();

  return (
    <ComTool
      title="Метроном"
      icon="DashboardSpeed01"
      iconKind={isMetronomeHide ? 'StrokeRounded' : 'SolidRounded'}
      onClick={() => setIsMetronomeHide(prev => ({ ...prev, isHide: !prev.isHide }))}
    />
  );
};
