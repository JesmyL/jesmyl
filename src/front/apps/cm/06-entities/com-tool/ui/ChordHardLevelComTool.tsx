import { cmComChordHardLevelAtom } from '$cm/entities/index';
import { useAtom } from 'atomaric';
import { CmComTool } from '../ComTool';

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

export const CmComToolChordHardLevel = () => {
  const [hardLevel, setHardLevel] = useAtom(cmComChordHardLevelAtom);

  return (
    <CmComTool
      title={`Уровень сложности аккорда - ${hardLevel}`}
      icon={changesDict[hardLevel].icon}
      onClick={() => setHardLevel(changesDict[hardLevel].next)}
    />
  );
};
