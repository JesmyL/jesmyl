import { cmChordHardLevelAtom } from '$cm/atoms';
import { useAtom } from 'atomaric';
import { ComTool } from '../ComTool';

const changesDict = {
  1: {
    next: 2,
    icon: 'BatteryLow',
  },
  2: {
    next: 3,
    icon: 'BatteryMedium01',
  },
  3: {
    next: 1,
    icon: 'BatteryFull',
  },
} as const;

export const ChordHardLevelComTool = () => {
  const [hardLevel, setHardLevel] = useAtom(cmChordHardLevelAtom);

  return (
    <ComTool
      title={`Уровень сложности аккорда - ${hardLevel}`}
      icon={changesDict[hardLevel].icon}
      onClick={() => setHardLevel(changesDict[hardLevel].next)}
    />
  );
};
